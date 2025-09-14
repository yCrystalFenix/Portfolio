import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RobloxGameConfig {
  name: string;
  placeId: number;
}

interface RobloxGameStats {
  name: string;
  visits: number;
  favorites: number;
  playing: number;
  upVotes: number;
  downVotes: number;
  likeRatio: number;
}

// Replace with your Open Cloud API key
const OPEN_CLOUD_API_KEY = 'YOUR_OPEN_CLOUD_API_KEY';

async function getUniverseId(placeId: number): Promise<number> {
  const url = `https://apis.roblox.com/universes/v1/places/${placeId}/universe`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch universe ID: ${response.status}`);
  }

  const data = await response.json();
  return data.universeId;
}

async function getGameStats(universeId: number): Promise<any> {
    const url = `https://games.roblox.com/v1/games?universeIds=${universeId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch game stats: ${response.status}`);
    }

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
        throw new Error('No game data found for this universe ID');
    }

    return data.data[0];
}

async function getVotes(universeId: number): Promise<any> {
    const url = `https://games.roblox.com/v1/games/votes?universeIds=${universeId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch votes: ${response.status}`);
    }

    const data = await response.json();
    if (!data.data || data.data.length === 0) {
        throw new Error('No vote data found for this universe ID');
    }

    return data.data[0];
}

async function getGameData(placeId: number): Promise<RobloxGameStats> {
  try {
    const universeId = await getUniverseId(placeId);
    const [stats, votes] = await Promise.all([
        getGameStats(universeId),
        getVotes(universeId)
    ]);

    const upVotes = votes.upVotes || 0;
    const downVotes = votes.downVotes || 0;
    const total = upVotes + downVotes;
    const likeRatio = total > 0 ? (upVotes / total) * 100 : 0;

    return {
      name: stats.name,
      visits: stats.visits || 0,
      favorites: stats.favoritedCount || 0,
      playing: stats.playing || 0,
      upVotes,
      downVotes,
      likeRatio: Math.round(likeRatio * 100) / 100
    };
  } catch (error) {
    console.error(`Error fetching data for place ${placeId}:`, error);
    throw error;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { games }: { games: RobloxGameConfig[] } = await req.json();

    if (!games || !Array.isArray(games)) {
      return new Response(
        JSON.stringify({ error: 'Invalid games array provided' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const promises = games.map(async (game: RobloxGameConfig) => {
      try {
        return await getGameData(game.placeId);
      } catch (error) {
        console.error(`Failed to fetch data for ${game.name}:`, error);
        return null;
      }
    });

    const gamesData = await Promise.all(promises);
    const validGames = gamesData.filter(game => game !== null) as RobloxGameStats[];

    const totals = {
      totalVisits: validGames.reduce((sum, game) => sum + game.visits, 0),
      totalFavorites: validGames.reduce((sum, game) => sum + game.favorites, 0),
      totalPlaying: validGames.reduce((sum, game) => sum + game.playing, 0),
      totalUpVotes: validGames.reduce((sum, game) => sum + game.upVotes, 0),
      totalGames: validGames.length,
      averageLikeRatio: validGames.length > 0
        ? validGames.reduce((sum, game) => sum + game.likeRatio, 0) / validGames.length
        : 0,
    };

    return new Response(
      JSON.stringify({ gamesData, totals }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('General error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
