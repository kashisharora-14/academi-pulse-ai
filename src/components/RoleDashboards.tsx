import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    color: "bg-accent"
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
  return (
    <section id="roles" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl mb-4">
            Multi-Role Dashboards
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tailored interfaces designed for different stakeholders with role-specific insights and controls
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden p-6 transition-all hover:shadow-large hover:-translate-y-1 ${
                role.color === 'bg-blue-500' ? 'bg-blue-50 border-blue-200' :
                role.color === 'bg-green-500' ? 'bg-green-50 border-green-200' :
                role.color === 'bg-primary' ? 'bg-primary/5 border-primary/20' :
                'bg-purple-50 border-purple-200'
              }`}
            >
              <div className={`absolute top-0 right-0 h-24 w-24 ${role.color} opacity-20 rounded-bl-full`} />

              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${role.color}`}>
                <role.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="mb-2 text-xl font-bold">{role.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{role.description}</p>

              <ul className="mb-6 space-y-2">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <div className={`mt-1 h-1.5 w-1.5 rounded-full ${role.color}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
                Explore
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};