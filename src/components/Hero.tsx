import { Button } from "@/components/ui/button";
import { ArrowDown, ExternalLink } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/80" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Fenix
          </h1>
          <h2 className="text-xl md:text-2xl text-muted-foreground font-medium">
            Roblox Developer, Game Designer & Investor
          </h2>
        </div>

        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:0.2s]">
          Creating innovative games that blend viral trends with technically solid mechanics. 
          Specializing in intelligent systems and high-concept Roblox experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in [animation-delay:0.4s]">
          <Button 
            size="lg" 
            className="group"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View My Projects
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="group"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ExternalLink className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            Get In Touch
          </Button>
        </div>
      </div>

      {/* Floating Blobs */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-glow" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-glow [animation-delay:1s]" />
    </section>
  );
};

export default Hero;
