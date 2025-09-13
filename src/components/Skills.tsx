import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Lua/Luau", "JavaScript", "Java", "Python"],
      icon: "💻"
    },
    {
      title: "Game Development",
      skills: ["Roblox Studio", "Game Design", "UI Design", "Player Experience"],
      icon: "🎮"
    },
    {
      title: "System Architecture",
      skills: ["OOP in Luau", "Modular Systems", "API Design", "Data Structures", "Scalable Solutions", "Microservices", "Database Design"],
      icon: "🏗️"
    },
    {
      title: "Analytics",
      skills: ["Player Behavior Analysis", "Revenue Optimization", "Statistical Modeling", "Market Research", "A/B Testing", "Performance Metrics", "Data Visualization"],
      icon: "📊"
    },
    {
      title: "Performance",
      skills: ["Script Optimization", "Server-side Logic", "Memory Management", "Load Balancing"],
      icon: "⚡"
    },
    {
      title: "Project Management",
      skills: ["Investor Relations", "Team Leadership", "Strategic Planning", "Risk Assessment", "Portfolio Management", "Version Control", "Agile Development"],
      icon: "📋"
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical <span className="bg-gradient-primary bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for creating innovative games and robust systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title}
              className="p-6 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary" 
                    className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-gradient-card border-border/50 inline-block">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Specialized in Roblox Development
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Advanced Scripting",
                "DataStore Management",
                "GUI Design",
                "Physics Systems",
                "Networking",
                "Security",
                "Performance Optimization",
                "Discord Bot Development",
                "Minecraft Plugin Development",
                "Web Development"
              ].map((specialization) => (
                <Badge 
                  key={specialization}
                  className="bg-primary text-primary-foreground hover:shadow-glow transition-all"
                >
                  {specialization}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;