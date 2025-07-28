import { Card } from "@/components/ui/card";
import { Code, Gamepad2, TrendingUp, Zap } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Gamepad2,
      title: "Game Developer",
      description: "Creating innovative Roblox experiences that captivate players"
    },
    {
      icon: TrendingUp,
      title: "Trend Analyst",
      description: "Blending viral trends with solid game mechanics"
    },
    {
      icon: Code,
      title: "System Architect",
      description: "Building intelligent systems and automated solutions"
    },
    {
      icon: Zap,
      title: "Game Analyst",
      description: "Analyzing player behavior, monetization strategies, and engagement metrics for successful game optimization"
    },
    {
      icon: Zap,
      title: "Game Investor",
      description: "Primary focus on strategic investments in promising game projects with deep market analysis, technical evaluation, and partnership with front-page developers. Extensive network of contacts with multiple investors and industry professionals."
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm Fenix, a passionate Roblox developer, game analyst, and primarily a game investor who specializes in creating 
            high-concept games and intelligent systems. My approach combines viral trend analysis 
            with technically solid mechanics to deliver engaging player experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Bridging Creativity & Technology
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              As primarily a game investor and analyst, I understand what makes games successful 
              from both technical and business perspectives. I create innovative Roblox games, 
              Discord bots, Minecraft plugins, and websites that push boundaries across multiple platforms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              As a game analyst, I've worked on Jump Rope (which peaked at 20k CCU, has 45M visits, and generated over 3M Robux) 
              where I made significant improvements by analyzing player statistics and behavior patterns. I've also collaborated 
              with multiple YouTubers totaling over 100k subscribers, including the famous SoloTheYolo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My primary focus is strategic game investments, leveraging my extensive network of contacts with 
              investors and front-page developers. I specialize in project management, technical evaluation, 
              and identifying high-potential gaming projects across various platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.slice(0, 3).map((highlight, index) => (
              <Card 
                key={highlight.title}
                className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                <highlight.icon className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </Card>
            ))}
            {/* Game Analyst Card */}
            <Card 
              className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Zap className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-2">{highlights[3].title}</h4>
              <p className="text-sm text-muted-foreground">{highlights[3].description}</p>
            </Card>
            {/* Game Investor - Larger Card */}
            <Card 
              className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-105 sm:col-span-2"
            >
              <Zap className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold text-foreground mb-2">{highlights[4].title}</h4>
              <p className="text-sm text-muted-foreground">{highlights[4].description}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;