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
    <section id="ai" className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-4 py-1.5 text-sm">
            AI/ML Powered
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl mb-4 text-gray-900">
            Intelligent Features
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
            Next-generation AI capabilities that transform how education data is processed and analyzed
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aiFeatures.map((feature, index) => (
            <Card 
              key={index}
              className={`relative overflow-hidden p-6 transition-all hover:shadow-2xl hover:-translate-y-2 bg-white border-2 ${
                feature.gamified ? 'border-orange-200 hover:border-orange-400' : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className={`absolute top-0 right-0 h-32 w-32 ${
                feature.gamified ? 'bg-gradient-to-br from-orange-200 to-red-200' : 'bg-gradient-to-br from-blue-200 to-purple-200'
              } opacity-20 rounded-bl-full`} />
              
              <div className="flex gap-2 mb-4 relative z-10">
                <Badge className="bg-blue-100 text-blue-800 font-semibold hover:bg-blue-200 border border-blue-300">
                  {feature.badge}
                </Badge>
                {feature.gamified && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:from-orange-600 hover:to-red-600 shadow-md">
                    🎮 Gamified
                  </Badge>
                )}
              </div>
              
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${
                feature.gamified ? 'bg-gradient-to-br from-orange-100 to-red-100' : 'bg-gradient-to-br from-blue-100 to-purple-100'
              }`}>
                <feature.icon className={`h-7 w-7 ${
                  feature.gamified ? 'text-orange-600' : 'text-blue-600'
                }`} />
              </div>
              
              <h3 className="mb-2 text-xl font-bold text-gray-900">{feature.title}</h3>
              <p className="text-sm text-gray-700 mb-3 leading-relaxed font-medium">{feature.description}</p>
              
              {feature.gamified && feature.points && (
                <div className="flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200">
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
