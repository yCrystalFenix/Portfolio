import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import RobloxStats from "@/components/RobloxStats";
import Skills from "@/components/Skills";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <RobloxStats />
      <Projects />
      <Skills />
    </div>
  );
};

export default Index;
