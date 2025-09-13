import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import RobloxStats from "@/components/RobloxStats";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <RobloxStats />
      <Skills />
      <Contact />
    </div>
  );
};

export default Index;
