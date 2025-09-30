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
    description: "Intelligent chatbot answering queries for students, teachers, institutions, and government officials",
    badge: "Voice Enabled"
  },
  {
    icon: FileCheck,
    title: "Document Verification",
    description: "AI-powered sufficiency checker that verifies and rates uploaded documents automatically",
    badge: "Auto Validate"
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "Personalized suggestions for schemes, scholarships, and courses based on user profiles",
    badge: "ML Powered"
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description: "Advanced algorithms to flag suspicious data patterns and identify fake entries",
    badge: "Real-time"
  },
  {
    icon: BarChart3,
    title: "Predictive Ranking",
    description: "Forecast NIRF rankings based on current institutional metrics and trends",
    badge: "Forecasting"
  },
  {
    icon: Map,
    title: "Performance Heatmaps",
    description: "AI-generated visual trends showing performance patterns across regions and time",
    badge: "Visualization"
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
              className="relative overflow-hidden p-6 transition-all hover:shadow-large hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-accent opacity-10 rounded-bl-full" />
              
              <Badge variant="secondary" className="mb-4">
                {feature.badge}
              </Badge>
              
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
