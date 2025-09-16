import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      name: "Discord",
      icon: MessageCircle,
      href: "https://discord.com/users/413354553568919563",
      description: "Contact me directly on Discord"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 border-t-4 border-border/30 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="bg-gradient-primary bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next Roblox project? Let's discuss how we can create something amazing together.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Social Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4 text-center">Connect With Me</h3>
              <p className="text-muted-foreground mb-6 text-center">
                Follow my work, join the community, or reach out directly through these platforms.
              </p>
            </div>

            <div className="grid gap-4">
              {socialLinks.map((link) => (
                <Card 
                  key={link.name}
                  className="p-4 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-105 group cursor-pointer"
                  onClick={() => window.open(link.href, '_blank')}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <link.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-card border-border/50">
              <h4 className="font-semibold text-foreground mb-2">Available for</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Game development collaborations</li>
                <li>• Technical consulting</li>
                <li>• System architecture design</li>
                <li>• Investment opportunities</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;