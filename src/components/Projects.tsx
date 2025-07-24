import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

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
      title: "Become a Volleyball Player to Prove Mom Wrong",
      description: "Skill-based trend game incorporating real volleyball fundamentals with emotional progression and motivational storytelling elements.",
      tags: ["Skill-Based", "Sports Simulation", "Emotional Story", "Progression"],
      features: [
        "Real volleyball mechanics",
        "Skill development system",
        "Emotional progression",
        "Motivational storytelling"
      ]
    },
    {
      title: "Steal a Brainrot",
      description: "Character collector game based on humor and internet memes, featuring a sophisticated tiered rarity system and per-second economy mechanics.",
      tags: ["Character Collector", "Meme Culture", "Economy System", "Rarity Tiers"],
      features: [
        "Meme-based characters",
        "Tiered rarity system",
        "Per-second economy",
        "Humor-driven gameplay"
      ]
    },
    {
      title: "Gym Tycoon System",
      description: "Comprehensive economy system with exaggerated item pricing and exponential gain scaling, designed for idle tycoon-style gameplay mechanics.",
      tags: ["Tycoon", "Economy", "Idle Game", "Scaling System"],
      features: [
        "Exaggerated pricing model",
        "Exponential gain scaling",
        "Idle gameplay mechanics",
        "Investment strategies"
      ]
    },
    {
      title: "LineUtils",
      description: "Sophisticated Roblox module that automates queue behavior using both NPC bots and real players, providing seamless integration for any game.",
      tags: ["Module", "Automation", "Queue Management", "API"],
      features: [
        "Bot and player integration",
        "Automated queue behavior",
        "Modular architecture",
        "Easy implementation"
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
                  <Button size="sm" variant="outline" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Project
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Github className="h-4 w-4" />
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