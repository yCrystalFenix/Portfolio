// services/robloxApi.ts - CORS Proxy Version (Quick Fix)

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

export interface RobloxApiResponse {
  gamesData: (RobloxGameStats | null)[];
  totals: RobloxStatsTotal;
}

class RobloxApiService {
  // CORS proxy to bypass browser restrictions
  private corsProxy = 'https://api.allorigins.win/get?url=';
  
  /**
   * Fetch the Universe ID from a Place ID
   */
  private async getUniverseId(placeId: number): Promise<number> {
    const robloxUrl = `https://apis.roblox.com/universes/v1/places/${placeId}/universe`;
    const url = `${this.corsProxy}${encodeURIComponent(robloxUrl)}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching universe ID: ${response.status} ${response.statusText}`);
      }
      
      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents);
      
      if (!data.universeId) {
        throw new Error('No universe ID found in response');
      }
      
      return data.universeId;
    } catch (error) {
      console.error(`Failed to get universe ID for place ${placeId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch game stats from Universe ID
   */
  private async getGameStats(universeId: number): Promise<any> {
    const robloxUrl = `https://games.roblox.com/v1/games?universeIds=${universeId}`;
    const url = `${this.corsProxy}${encodeURIComponent(robloxUrl)}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching game stats: ${response.status} ${response.statusText}`);
      }
      
      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents);
      
      if (!data.data || data.data.length === 0) {
        throw new Error('No game data found for that universe ID');
      }
      
      return data.data[0];
    } catch (error) {
      console.error(`Failed to get game stats for universe ${universeId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch like/dislike votes for Universe ID
   */
  private async getVotes(universeId: number): Promise<any> {
    const robloxUrl = `https://games.roblox.com/v1/games/votes?universeIds=${universeId}`;
    const url = `${this.corsProxy}${encodeURIComponent(robloxUrl)}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error fetching votes: ${response.status} ${response.statusText}`);
      }
      
      const proxyData = await response.json();
      const data = JSON.parse(proxyData.contents);
      
      if (!data.data || data.data.length === 0) {
        throw new Error('No vote data found for that universe ID');
      }
      
      return data.data[0];
    } catch (error) {
      console.error(`Failed to get votes for universe ${universeId}:`, error);
      throw error;
    }
  }

  /**
   * Get complete game data for a single place
   */
  private async getGameData(config: RobloxGameConfig): Promise<RobloxGameStats | null> {
    try {
      console.log(`Fetching data for ${config.name} (Place ID: ${config.placeId})`);
      
      // Step 1: Get Universe ID
      const universeId = await this.getUniverseId(config.placeId);
      console.log(`Universe ID for ${config.name}: ${universeId}`);
      
      // Step 2: Get stats and votes in parallel
      const [stats, votes] = await Promise.all([
        this.getGameStats(universeId),
        this.getVotes(universeId)
      ]);
      
      // Step 3: Calculate like ratio
      const upVotes = votes.upVotes || 0;
      const downVotes = votes.downVotes || 0;
      const total = upVotes + downVotes;
      const likeRatio = total > 0 ? (upVotes / total) * 100 : 0;
      
      const gameData: RobloxGameStats = {
        name: stats.name || config.name,
        visits: stats.visits || 0,
        favorites: stats.favoritedCount || 0,
        playing: stats.playing || 0,
        upVotes,
        downVotes,
        likeRatio: Math.round(likeRatio * 100) / 100
      };
      
      console.log(`Successfully fetched data for ${config.name}:`, gameData);
      return gameData;
      
    } catch (error) {
      console.error(`Error fetching data for ${config.name}:`, error);
      return null;
    }
  }

  /**
   * Get data for multiple games and calculate totals
   */
  async getMultipleGamesData(games: RobloxGameConfig[]): Promise<RobloxApiResponse> {
    try {
      console.log('Starting to fetch data for all games:', games);
      
      // Add delays between requests to avoid rate limiting
      const gamesData: (RobloxGameStats | null)[] = [];
      
      for (let i = 0; i < games.length; i++) {
        const gameData = await this.getGameData(games[i]);
        gamesData.push(gameData);
        
        // Add delay between requests (except for the last one)
        if (i < games.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
        }
      }
      
      // Filter out null values for totals calculation
      const validGames = gamesData.filter(game => game !== null) as RobloxGameStats[];
      
      // Calculate totals
      const averageLikeRatio = validGames.length > 0 
        ? validGames.reduce((sum, game) => sum + game.likeRatio, 0) / validGames.length 
        : 0;

      const totals: RobloxStatsTotal = {
        totalVisits: validGames.reduce((sum, game) => sum + game.visits, 0),
        totalFavorites: validGames.reduce((sum, game) => sum + game.favorites, 0),
        totalPlaying: validGames.reduce((sum, game) => sum + game.playing, 0),
        totalUpVotes: validGames.reduce((sum, game) => sum + game.upVotes, 0),
        totalGames: validGames.length,
        averageLikeRatio,
      };
      
      console.log('Final results:', { gamesData, totals });
      
      return { gamesData, totals };
      
    } catch (error) {
      console.error('Error in getMultipleGamesData:', error);
      throw new Error(`Failed to fetch Roblox game data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const robloxApi = new RobloxApiService();
