// services/robloxApi.ts - Supabase Function Version

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
  // Replace 'your-project-id' with your actual Supabase project ID
  private supabaseUrl = 'https://your-project-id.supabase.co/functions/v1/roblox-stats';
  
  // If you need authentication, add your anon key here:
  // private supabaseAnonKey = 'your-anon-key';

  async getMultipleGamesData(games: RobloxGameConfig[]): Promise<RobloxApiResponse> {
    try {
      console.log('Calling Supabase function with games:', games);

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      // Uncomment and add your anon key if authentication is required
      // headers['Authorization'] = `Bearer ${this.supabaseAnonKey}`;

      const response = await fetch(this.supabaseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ games }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Supabase function error:', response.status, errorText);
        throw new Error(`Supabase function failed: ${response.status} ${response.statusText}`);
      }

      const data: RobloxApiResponse = await response.json();
      console.log('Supabase function response:', data);
      
      return data;
    } catch (error) {
      console.error('Error calling Supabase function:', error);
      throw new Error(`Failed to fetch Roblox game data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const robloxApi = new RobloxApiService();
