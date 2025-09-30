import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  FileCheck, 
  Lightbulb, 
  AlertTriangle, 
  BarChart3,
  Map 
} from "lucide-react";

const aiFeatures = [
  {
    icon: Bot,
    title: "EduBot - AI Assistant",
    description: "Intelligent chatbot answering queries for students, teachers, institutions, and government officials. Earn points for interactions!",
    badge: "Voice Enabled",
    gamified: true,
    points: "+50 XP per chat"
  },
  {
    icon: FileCheck,
    title: "Document Verification",
    description: "AI-powered sufficiency checker that verifies and rates uploaded documents automatically",
    badge: "Auto Validate",
    gamified: false
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "AI finds perfect schemes & scholarships for you! Get party celebrations when high-match opportunities are discovered.",
    badge: "ML Powered",
    gamified: true,
    points: "+200 XP per match"
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description: "Advanced algorithms to flag suspicious data patterns and identify fake entries",
    badge: "Real-time",
    gamified: false
  },
  {
    icon: BarChart3,
    title: "Predictive Ranking",
    description: "Forecast NIRF rankings and unlock achievements when your institution performs well",
    badge: "Forecasting",
    gamified: true,
    points: "Achievement unlocks"
  },
  {
    icon: Map,
    title: "Performance Heatmaps",
    description: "AI-generated visual trends showing performance patterns across regions and time",
    badge: "Visualization",
    gamified: false
  }
];

export const AIFeatures = () => {
  return (
    <section id="ai" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent">AI/ML Powered</Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl mb-4">
            Intelligent Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Next-generation AI capabilities that transform how education data is processed and analyzed
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((feature, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden p-6 transition-all hover:shadow-large hover:-translate-y-1 ${
                feature.gamified ? 'ring-2 ring-accent/30 hover:ring-accent/60' : ''
              }`}
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-accent opacity-10 rounded-bl-full" />
              
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">
                  {feature.badge}
                </Badge>
                {feature.gamified && (
                  <Badge className="bg-accent text-white animate-pulse">
                    🎮 Gamified
                  </Badge>
                )}
              </div>
              
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
              
              {feature.gamified && feature.points && (
                <div className="flex items-center gap-2 text-xs text-accent font-medium">
                  <span>🏆</span>
                  <span>{feature.points}</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
