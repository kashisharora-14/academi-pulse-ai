import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Award,
  TrendingUp,
  Target,
  Users,
  FileText
} from "lucide-react";

const lifeCycleStages = [
  {
    id: 1,
    title: "Admission",
    status: "completed",
    date: "Aug 2021",
    description: "Successfully enrolled in B.Tech Computer Science",
    icon: BookOpen,
    color: "bg-green-500"
  },
  {
    id: 2,
    title: "Academic Progress",
    status: "in-progress",
    date: "Current",
    description: "Semester 6 - CGPA: 8.9",
    icon: TrendingUp,
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "Skill Development",
    status: "in-progress",
    date: "Ongoing",
    description: "Certifications: 5 completed, 2 in progress",
    icon: Award,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Placement Preparation",
    status: "upcoming",
    date: "Jan 2024",
    description: "Career guidance and interview preparation",
    icon: Target,
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "Graduation",
    status: "upcoming",
    date: "May 2025",
    description: "Expected graduation with honors",
    icon: GraduationCap,
    color: "bg-indigo-500"
  },
  {
    id: 6,
    title: "Career",
    status: "future",
    date: "Jun 2025",
    description: "Job placement and career tracking",
    icon: Briefcase,
    color: "bg-green-600"
  }
];

const academicMilestones = [
  { semester: "Sem 1", gpa: 8.2, credits: 24, status: "completed" },
  { semester: "Sem 2", gpa: 8.5, credits: 24, status: "completed" },
  { semester: "Sem 3", gpa: 8.8, credits: 24, status: "completed" },
  { semester: "Sem 4", gpa: 9.1, credits: 24, status: "completed" },
  { semester: "Sem 5", gpa: 8.9, credits: 24, status: "completed" },
  { semester: "Sem 6", gpa: 9.0, credits: 20, status: "in-progress" },
  { semester: "Sem 7", gpa: 0, credits: 24, status: "upcoming" },
  { semester: "Sem 8", gpa: 0, credits: 20, status: "upcoming" },
];

const schemes = [
  { name: "NSP Scholarship", status: "active", amount: "₹48,000/year", duration: "4 years" },
  { name: "Merit Scholarship", status: "active", amount: "₹25,000/year", duration: "2 years" },
  { name: "PMKVY Certification", status: "completed", amount: "Free", duration: "3 months" },
];

export const StudentLifeCycleTracker = () => {
  const completedStages = lifeCycleStages.filter(stage => stage.status === "completed").length;
  const progressPercentage = (completedStages / lifeCycleStages.length) * 100;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Academic Journey Timeline</h3>
            <Badge className="bg-primary">
              {completedStages}/{lifeCycleStages.length} Stages Completed
            </Badge>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="space-y-4">
            {lifeCycleStages.map((stage, index) => (
              <div key={stage.id} className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${stage.color} flex items-center justify-center`}>
                  <stage.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{stage.title}</h4>
                    <Badge variant={
                      stage.status === "completed" ? "default" : 
                      stage.status === "in-progress" ? "secondary" : "outline"
                    }>
                      {stage.status === "completed" ? "Completed" :
                       stage.status === "in-progress" ? "In Progress" : "Upcoming"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stage.date}</p>
                </div>
                {index < lifeCycleStages.length - 1 && (
                  <div className="w-px h-8 bg-border ml-5 mt-2" />
                )}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Active Schemes & Benefits</h3>
          <div className="space-y-4">
            {schemes.map((scheme, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{scheme.name}</h4>
                  <Badge variant={scheme.status === "active" ? "default" : "secondary"}>
                    {scheme.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{scheme.amount}</p>
                <p className="text-xs text-muted-foreground">{scheme.duration}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Academic Performance Tracker</h3>
          <div className="space-y-3">
            {academicMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.status === "completed" ? "bg-green-100 text-green-600" :
                    milestone.status === "in-progress" ? "bg-blue-100 text-blue-600" :
                    "bg-gray-100 text-gray-400"
                  }`}>
                    {milestone.status === "completed" ? <CheckCircle className="h-4 w-4" /> :
                     milestone.status === "in-progress" ? <Clock className="h-4 w-4" /> :
                     <BookOpen className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{milestone.semester}</p>
                    <p className="text-sm text-muted-foreground">{milestone.credits} credits</p>
                  </div>
                </div>
                <div className="text-right">
                  {milestone.status !== "upcoming" && (
                    <p className="font-semibold">{milestone.gpa.toFixed(1)}</p>
                  )}
                  <p className="text-sm text-muted-foreground capitalize">{milestone.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Career Readiness Assessment</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Technical Skills</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Communication</span>
                <span className="text-sm text-muted-foreground">78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Leadership</span>
                <span className="text-sm text-muted-foreground">72%</span>
              </div>
              <Progress value={72} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Industry Knowledge</span>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Progress value={80} />
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Recommended Actions</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Complete advanced Java certification</li>
              <li>• Join technical societies for leadership experience</li>
              <li>• Attend industry workshops and seminars</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};