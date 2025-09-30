import { Card } from "@/components/ui/card";
import { 
  GraduationCap, 
  User, 
  TrendingUp, 
  Database, 
  MapPin, 
  Brain,
  Shield,
  ArrowUpRight 
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Student Life Cycle Tracker",
    description: "Complete journey from enrollment to alumni with academic performance, projects, and placements tracking",
    color: "bg-blue-500"
  },
  {
    icon: User,
    title: "Teacher Performance Dashboard",
    description: "APAR ID-based tracking of teaching outcomes, research contributions, and training achievements",
    color: "bg-green-500"
  },
  {
    icon: TrendingUp,
    title: "Institution Ranking Analytics",
    description: "AI-powered analysis using NIRF parameters, compliance metrics, and scheme participation data",
    color: "bg-purple-500"
  },
  {
    icon: Database,
    title: "Unified Data Repository",
    description: "Aadhaar/APAR/AISHE linked database ensuring data integrity across students, teachers, and institutions",
    color: "bg-orange-500"
  },
  {
    icon: MapPin,
    title: "Scheme Mapping",
    description: "Track government scheme participation and benefit distribution with real-time monitoring",
    color: "bg-indigo-500"
  },
  {
    icon: Brain,
    title: "Predictive Analytics",
    description: "ML models forecast institution rankings, student outcomes, and scheme effectiveness",
    color: "bg-pink-500"
  },
  {
    icon: Shield,
    title: "Data Verification Engine",
    description: "Automatic validation of uploaded documents with AI-powered quality checks",
    color: "bg-teal-500"
  },
  {
    icon: ArrowUpRight,
    title: "Progression Pathway",
    description: "Track natural progression from student to higher education to employment with insights",
    color: "bg-red-500"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight lg:text-5xl mb-3 md:mb-4">
            Core Platform Modules
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Comprehensive ecosystem covering every aspect of educational data management and analytics
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group p-5 md:p-6 transition-all hover:shadow-medium hover:-translate-y-1 bg-gradient-card"
            >
              <div className={`mb-3 md:mb-4 inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-lg ${feature.color}`}>
                <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <h3 className="mb-1.5 md:mb-2 text-base md:text-lg font-semibold">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};