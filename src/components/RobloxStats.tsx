import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Heart, Eye, Trophy, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { robloxApi, RobloxGameConfig, RobloxGameStats, RobloxStatsTotal } from "@/services/robloxApi";

// Add your games here - easily modular!
const GAMES_CONFIG: RobloxGameConfig[] = [
  { name: "Jump Rope", placeId: 94371891827792 },
  { name: "Find The Labubus", placeId: 111323207426362 },
  { name: "Find The Greenbeans", placeId: 123903298413050 },
];

const RobloxStats = () => {
  console.log('RobloxStats component rendering');
  const [gamesData, setGamesData] = useState<(RobloxGameStats | null)[]>([]);
  const [totals, setTotals] = useState<RobloxStatsTotal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { toast } = useToast();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  const fetchStats = async () => {
    console.log('fetchStats called');
    setLoading(true);
    setError(null);
    
    try {
      console.log('Calling robloxApi.getMultipleGamesData with config:', GAMES_CONFIG);
      const result = await robloxApi.getMultipleGamesData(GAMES_CONFIG);
      console.log('API result:', result);
      
      setGamesData(result.gamesData);
      setTotals(result.totals);
      setLastUpdated(new Date());
      
      toast({
        title: "Stats Updated",
        description: `Successfully loaded data for ${result.totals.totalGames} games`,
      });
    } catch (error) {
      console.error('Error fetching Roblox stats:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Failed to Load Stats",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect running, calling fetchStats');
    fetchStats();
  }, []);

  return (
    <section id="roblox-stats" className="py-20 px-6 border-t-4 border-border/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Live <span className="bg-gradient-primary bg-clip-text text-transparent">Game Stats</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Real-time statistics from my Roblox games powered by the official Roblox API.
          </p>
          
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-4">
            <Button 
              onClick={fetchStats} 
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh Stats'}
            </Button>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </div>
          
          {/* Debug info */}
          <div className="mt-4 text-sm text-muted-foreground">
            Component loaded • {GAMES_CONFIG.length} games configured
            {gamesData.length > 0 && ` • ${gamesData.filter(g => g !== null).length} games loaded`}
          </div>
        </div>

        {totals && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{formatNumber(totals.totalVisits)}</p>
                <p className="text-sm text-muted-foreground">Total Visits</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{formatNumber(totals.totalPlaying)}</p>
                <p className="text-sm text-muted-foreground">Currently Playing</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4 text-center">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{formatNumber(totals.totalFavorites)}</p>
                <p className="text-sm text-muted-foreground">Total Favorites</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4 text-center">
                <Heart className="h-8 w-8 text-destructive mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{formatNumber(totals.totalUpVotes)}</p>
                <p className="text-sm text-muted-foreground">Total Likes</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {GAMES_CONFIG.map((game, index) => {
            const gameData = gamesData[index];
            
            return (
              <Card 
                key={game.name}
                className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-[1.02] group"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    {game.name}
                    {gameData && <Trophy className="h-5 w-5 text-accent" />}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {gameData ? 'Live Stats' : loading ? 'Loading...' : error ? 'Failed to load' : 'No data'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {gameData ? (
                    <>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="font-semibold text-foreground">{formatNumber(gameData.visits)}</p>
                          <p className="text-muted-foreground text-xs">Visits</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="font-semibold text-foreground">{formatNumber(gameData.playing)}</p>
                          <p className="text-muted-foreground text-xs">Playing</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="font-semibold text-foreground">{formatNumber(gameData.upVotes)}</p>
                          <p className="text-muted-foreground text-xs">Likes</p>
                        </div>
                        <div className="text-center p-2 rounded-lg bg-muted/30">
                          <p className="font-semibold text-foreground">{formatNumber(gameData.favorites)}</p>
                          <p className="text-muted-foreground text-xs">Favorites</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Badge 
                          variant="secondary" 
                          className={`${gameData.playing > 100 ? 'bg-primary/20 text-primary' : 'bg-muted/50'}`}
                        >
                          {gameData.playing > 100 ? 'High Activity' : 'Active'}
                        </Badge>
                      </div>
                    </>
                  ) : loading ? (
                    <div className="text-center py-8">
                      <div className="h-6 bg-muted/30 rounded animate-pulse mb-2"></div>
                      <div className="h-4 bg-muted/20 rounded animate-pulse w-3/4 mx-auto"></div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">Unable to load game data</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Stats powered by the official Roblox API • Updated in real-time
          </p>
        </div>
      </div>
    </section>
  );
};

export default RobloxStats;
