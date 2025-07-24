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
      title: "Game Investor",
      description: "Strategic investments in promising game projects"
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
            I'm Pietro, a passionate Roblox developer and programmer who specializes in creating 
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
              As both a programmer and game investor, I understand what makes games successful 
              from both technical and business perspectives. I create innovative Roblox games 
              that not only entertain but also push the boundaries of what's possible on the platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My expertise lies in developing systems that can handle complex player interactions, 
              economy balancing, and creating engaging progression mechanics that keep players 
              coming back for more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <Card 
                key={highlight.title}
                className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-105"
              >
                <highlight.icon className="h-8 w-8 text-primary mb-3" />
                <h4 className="font-semibold text-foreground mb-2">{highlight.title}</h4>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;