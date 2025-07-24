import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Twitter, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "#",
      description: "Check out my open source projects"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "#",
      description: "Follow for development updates"
    },
    {
      name: "Discord",
      icon: MessageCircle,
      href: "#",
      description: "Join the game development community"
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:hello@pietro.dev",
      description: "Direct business inquiries"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="bg-gradient-primary bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to collaborate on your next Roblox project? Let's discuss how we can create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Send a Message</CardTitle>
              <CardDescription>
                Got a project idea or want to discuss collaboration? Drop me a message!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell me about your project..."
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Social Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Connect With Me</h3>
              <p className="text-muted-foreground mb-6">
                Follow my work, join the community, or reach out directly through these platforms.
              </p>
            </div>

            <div className="grid gap-4">
              {socialLinks.map((link) => (
                <Card 
                  key={link.name}
                  className="p-4 bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 hover:scale-105 group cursor-pointer"
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