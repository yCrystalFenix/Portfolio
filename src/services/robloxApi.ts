export interface RobloxGameConfig {
  name: string;
  placeId: number;
}

export interface RobloxGameStats {
  name: string;
  visits: number;
  favorites: number;
  playing: number;
  upVotes: number;
  downVotes: number;
  likeRatio: number;
}

export interface RobloxStatsTotal {
  totalVisits: number;
  totalFavorites: number;
  totalPlaying: number;
  totalUpVotes: number;
  totalGames: number;
  averageLikeRatio: number;
}

class RobloxApiService {
  private async getUniverseId(placeId: number): Promise<number> {
    const url = `https://apis.roblox.com/universes/v1/places/${placeId}/universe`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch universe ID: ${response.status}`);
    }
    
    const data = await response.json();
    return data.universeId;
  }

  private async getGameStats(universeId: number): Promise<any> {
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

  private async getVotes(universeId: number): Promise<any> {
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

  async getGameData(placeId: number): Promise<RobloxGameStats> {
    try {
      const universeId = await this.getUniverseId(placeId);
      const [stats, votes] = await Promise.all([
        this.getGameStats(universeId),
        this.getVotes(universeId)
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

  async getMultipleGamesData(games: RobloxGameConfig[]): Promise<{
    gamesData: (RobloxGameStats | null)[];
    totals: RobloxStatsTotal;
  }> {
    const promises = games.map(async (game) => {
      try {
        return await this.getGameData(game.placeId);
      } catch (error) {
        console.error(`Failed to fetch data for ${game.name}:`, error);
        return null;
      }
    });

    const gamesData = await Promise.all(promises);
    const validGames = gamesData.filter(game => game !== null) as RobloxGameStats[];

    const totals: RobloxStatsTotal = {
      totalVisits: validGames.reduce((sum, game) => sum + game.visits, 0),
      totalFavorites: validGames.reduce((sum, game) => sum + game.favorites, 0),
      totalPlaying: validGames.reduce((sum, game) => sum + game.playing, 0),
      totalUpVotes: validGames.reduce((sum, game) => sum + game.upVotes, 0),
      totalGames: validGames.length,
      averageLikeRatio: validGames.length > 0 
        ? Math.round((validGames.reduce((sum, game) => sum + game.likeRatio, 0) / validGames.length) * 100) / 100
        : 0
    };

    return { gamesData, totals };
  }
}

export const robloxApi = new RobloxApiService();