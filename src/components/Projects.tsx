import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Squid Game Line",
      description: "Advanced NPC queue system featuring 49 intelligent bots with dynamic player replacement, automatic movement patterns, and progressive challenge mechanics.",
      tags: ["Queue System", "NPC AI", "Player Management", "Challenge System"],
      features: [
        "49 intelligent NPC bots",
        "Dynamic player replacement",
        "Auto-movement patterns",
        "Challenge progression system"
      ]
    },
    {
      title: "Rospike",
      description: "Fast-paced volleyball-themed Roblox game focused on skill progression and competitive gameplay. Blends real volleyball mechanics with Roblox's accessible gameplay style for both casual players and sports enthusiasts.",
      tags: ["Sports Simulation", "Skill Progression", "Competitive", "Realistic Mechanics"],
      features: [
        "Real volleyball techniques",
        "Advanced moves (float serves, jump spikes)",
        "Progressive skill unlocking", 
        "Competitive gameplay modes"
      ]
    },
    {
      title: "Game RNG",
      description: "Revolutionary luck-based experience where rarity is determined by real Roblox data rather than chance. Players spin for actual Roblox games, with rarity based on game age, visits, likes, and favorites.",
      tags: ["RNG System", "Data Integration", "Platform Meta", "Collectible"],
      features: [
        "Real Roblox game catalog integration",
        "Data-driven rarity system",
        "Platform history mechanics",
        "Creative twist on RNG genre"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-primary bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative Roblox games and systems that blend creativity with technical excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
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
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                  <Button size="sm" variant="ghost">
                    Learn More
                  </Button>
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