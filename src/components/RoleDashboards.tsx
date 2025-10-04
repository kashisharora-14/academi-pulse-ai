import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  UserCircle, 
  GraduationCap, 
  Building2, 
  Shield,
  ArrowRight 
} from "lucide-react";

const roles = [
  {
    icon: Shield,
    title: "Admin Dashboard",
    description: "Complete oversight of all institutions, schemes, and analytics",
    features: [
      "National-level analytics",
      "Scheme performance tracking",
      "Institution compliance monitoring",
      "Cross-state comparisons"
    ],
    color: "bg-primary"
  },
  {
    icon: Building2,
    title: "Institution Portal",
    description: "Manage students, faculty, and institutional performance",
    features: [
      "Student enrollment & tracking",
      "Faculty performance management",
      "NIRF ranking insights",
      "Scheme participation"
    ],
    color: "bg-purple-600"
  },
  {
    icon: GraduationCap,
    title: "Student Dashboard",
    description: "Track academic journey and access opportunities",
    features: [
      "Academic progress tracking",
      "Scholarship recommendations",
      "Placement assistance",
      "Skill gap analysis"
    ],
    color: "bg-blue-500"
  },
  {
    icon: UserCircle,
    title: "Teacher Portal",
    description: "Monitor teaching outcomes and professional development",
    features: [
      "APAR ID performance tracking",
      "Research contributions",
      "Training certifications",
      "Student outcome analytics"
    ],
    color: "bg-green-500"
  }
];

export const RoleDashboards = () => {
  const navigate = useNavigate();

  return (
    <section id="roles" className="py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight lg:text-5xl mb-3 md:mb-4">
            Multi-Role Dashboards
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Tailored interfaces designed for different stakeholders with role-specific insights and controls
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden p-5 md:p-6 transition-all hover:shadow-large hover:-translate-y-1 ${
                role.color === 'bg-blue-500' ? 'bg-blue-50 border-blue-200' :
                role.color === 'bg-green-500' ? 'bg-green-50 border-green-200' :
                role.color === 'bg-primary' ? 'bg-primary/5 border-primary/20' :
                role.color === 'bg-purple-600' ? 'bg-purple-50 border-purple-200' :
                'bg-purple-50 border-purple-200'
              }`}
            >
              <div className={`absolute top-0 right-0 h-20 w-20 md:h-24 md:w-24 ${role.color} opacity-20 rounded-bl-full`} />

              <div className={`mb-4 md:mb-6 inline-flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl ${role.color}`}>
                <role.icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
              </div>

              <h3 className="mb-2 text-lg md:text-xl font-bold">{role.title}</h3>
              <p className="mb-3 md:mb-4 text-xs md:text-sm text-muted-foreground">{role.description}</p>

              <ul className="mb-4 md:mb-6 space-y-1.5 md:space-y-2">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs md:text-sm">
                    <div className={`mt-1 h-1.5 w-1.5 rounded-full ${role.color} flex-shrink-0`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="outline" 
                className="w-full text-sm md:text-base group-hover:bg-primary group-hover:text-primary-foreground"
                onClick={() => navigate('/auth')}
              >
                Explore
                <ArrowRight className="ml-2 h-3.5 w-3.5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};