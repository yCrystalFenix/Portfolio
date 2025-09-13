import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Jump Rope",
      description: "Highly successful competitive jump rope game that peaked at 20k concurrent players, achieved 45M visits, and generated over 3M Robux. Optimized through extensive analytics and player behavior analysis.",
      tags: ["Competitive", "Analytics-Driven", "High CCU", "Revenue Success"],
      features: [
        "Peaked at 20k concurrent players",
        "45M+ total visits",
        "3M+ Robux generated",
        "Analytics-optimized gameplay"
      ],
      link: "https://www.roblox.com/games/94371891827792/Jump-Rope-SEASON-3-SQUID-GAME"
    },
    {
      title: "Find The TNT",
      description: "Highly successful exploration and discovery game that peaked at 5k concurrent players, achieved 10M visits, and generated over 1.5M Robux. Optimized through extensive analytics and player behavior analysis.",
      tags: ["Exploration", "Analytics-Driven", "High Engagement", "Revenue Success"],
      features: [
        "Peaked at 5k concurrent players",
        "10M+ total visits",
        "1.5M+ Robux generated",
        "Analytics-optimized gameplay"
      ],
      link: null
    },
    {
      title: "Squid Game Line",
      description: "Advanced NPC queue system featuring 49 intelligent bots with dynamic player replacement, automatic movement patterns, and progressive challenge mechanics.",
      tags: ["Queue System", "NPC AI", "Player Management", "Challenge System"],
      features: [
        "49 intelligent NPC bots",
        "Dynamic player replacement",
        "Auto-movement patterns",
        "Challenge progression system"
      ],
      link: "https://www.roblox.com/games/70779161608323/Squid-Game-Line"
    },
    {
      title: "RoSpike",
      description: "Fast-paced volleyball-themed Roblox game focused on skill progression and competitive gameplay. Blends real volleyball mechanics with Roblox's accessible gameplay style for both casual players and sports enthusiasts.",
      tags: ["Sports Simulation", "Skill Progression", "Competitive", "Realistic Mechanics"],
      features: [
        "Real volleyball techniques",
        "Advanced blocking systems",
        "Progressive skill unlocking", 
        "Competitive gameplay modes"
      ],
      link: "https://www.roblox.com/games/18166367987/RoSpike-Volleyball"
    },
    {
      title: "Climb A Wall",
      description: "Challenging climbing game that tests player persistence and skill. Features dynamic wall generation, progressive difficulty, and competitive leaderboards.",
      tags: ["Climbing", "Skill-Based", "Competitive", "Progressive"],
      features: [
        "Dynamic wall generation",
        "Skill-based progression",
        "Competitive leaderboards",
        "Challenge mechanics"
      ],
      link: "https://www.roblox.com/games/16989186790/Climb-a-Wall"
    },
    {
      title: "Game RNG",
      description: "Revolutionary luck-based experience where rarity is determined by real Roblox data rather than chance. Players spin for actual Roblox games, with rarity based on game age, visits, likes, and favorites. (UI Design & Code Contributor)",
      tags: ["RNG System", "Data Integration", "Platform Meta", "UI Design"],
      features: [
        "Real Roblox game catalog integration",
        "Data-driven rarity system",
        "Custom UI design",
        "Platform history mechanics"
      ],
      link: "https://www.roblox.com/games/17084574196/Game-RNG"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 border-t-4 border-secondary/30 bg-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative Roblox games and systems that blend creativity with technical excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-[1.02] group"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-foreground">Key Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3 pt-4">
                  {project.link ? (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Project
                    </Button>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Project Unavailable (DMCA)
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;