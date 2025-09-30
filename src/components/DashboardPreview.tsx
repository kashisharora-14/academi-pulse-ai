import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Award, 
  Activity 
} from "lucide-react";

const stats = [
  {
    icon: Users,
    label: "Active Students",
    value: "10.2M",
    change: "+12.5%",
    positive: true
  },
  {
    icon: Award,
    label: "Institutions Ranked",
    value: "50,234",
    change: "+8.3%",
    positive: true
  },
  {
    icon: TrendingUp,
    label: "Schemes Active",
    value: "156",
    change: "+15.2%",
    positive: true
  },
  {
    icon: Activity,
    label: "Data Points/Day",
    value: "2.5M",
    change: "+22.1%",
    positive: true
  }
];

export const DashboardPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4">Real-time Analytics</Badge>
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl mb-4">
            Data-Driven Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive dashboards with live updates, comprehensive reports, and actionable intelligence
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-background transition-all hover:shadow-medium">
              <div className="flex items-start justify-between mb-4">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge 
                  variant={stat.positive ? "default" : "destructive"}
                  className={stat.positive ? "bg-success" : ""}
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
