import { Card } from "@/components/ui/card";
import { 
  Users, 
  Award, 
  TrendingUp, 
  Database, 
  Gift, 
  Brain,
  Shield,
  GitBranch 
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Life Cycle Tracker",
    description: "Complete journey from enrollment to alumni with academic performance, projects, and placements tracking"
  },
  {
    icon: Award,
    title: "Teacher Performance Dashboard",
    description: "APAR ID-based tracking of teaching outcomes, research contributions, and training achievements"
  },
  {
    icon: TrendingUp,
    title: "Institution Ranking Analytics",
    description: "AI-powered analysis using NIRF parameters, compliance metrics, and scheme participation data"
  },
  {
    icon: Database,
    title: "Unified Data Repository",
    description: "Aadhaar/APAR/AISHE linked database ensuring data integrity across students, teachers, and institutions"
  },
  {
    icon: Gift,
    title: "Scheme Mapping",
    description: "Track government scheme participation and benefit distribution with real-time monitoring"
  },
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "ML models forecast institution rankings, student outcomes, and scheme effectiveness"
  },
  {
    icon: Shield,
    title: "Data Verification Engine",
    description: "Automatic validation of uploaded documents with AI-powered quality checks"
  },
  {
    icon: GitBranch,
    title: "Progression Pathway",
    description: "Track natural progression from student to higher education to employment with insights"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl mb-4">
            Core Platform Modules
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive ecosystem covering every aspect of educational data management and analytics
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group p-6 transition-all hover:shadow-medium hover:-translate-y-1 bg-gradient-card"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-hero">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
