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
  private async callEdgeFunction(games: RobloxGameConfig[]): Promise<{
    gamesData: (RobloxGameStats | null)[];
    totals: RobloxStatsTotal;
  }> {
    const response = await fetch('/functions/v1/roblox-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ games })
    });

    if (!response.ok) {
      throw new Error(`Edge function failed: ${response.status}`);
    }

    return await response.json();
  }

  async getMultipleGamesData(games: RobloxGameConfig[]): Promise<{
    gamesData: (RobloxGameStats | null)[];
    totals: RobloxStatsTotal;
  }> {
    try {
      return await this.callEdgeFunction(games);
    } catch (error) {
      console.error('Error calling edge function:', error);
      throw error;
    }
  }
}

export const robloxApi = new RobloxApiService();