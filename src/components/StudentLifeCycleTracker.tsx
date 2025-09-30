
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Star, 
  TrendingUp, 
  Gift,
  Bot,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming";
  category: "academic" | "scheme" | "career" | "certification";
  aiRecommended?: boolean;
}

interface SchemeRecommendation {
  id: string;
  name: string;
  amount: string;
  eligibility: number;
  deadline: string;
  category: string;
  aiConfidence: number;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    title: "Enrolled in B.Tech Computer Science",
    description: "Admission to XYZ University with 85% in 12th grade",
    date: "Aug 2021",
    status: "completed",
    category: "academic"
  },
  {
    id: "2",
    title: "PMKVY Certification - AI/ML",
    description: "Completed 6-month certification program",
    date: "Feb 2022",
    status: "completed",
    category: "certification",
    aiRecommended: true
  },
  {
    id: "3",
    title: "Merit-cum-Means Scholarship",
    description: "₹48,000 per year for excellent academic performance",
    date: "Jul 2022",
    status: "completed",
    category: "scheme"
  },
  {
    id: "4",
    title: "Summer Internship - TCS",
    description: "AI/ML Developer Intern position",
    date: "Jun 2024",
    status: "in-progress",
    category: "career",
    aiRecommended: true
  },
  {
    id: "5",
    title: "Final Year Project",
    description: "AI-powered Education Analytics Platform",
    date: "Dec 2024",
    status: "in-progress",
    category: "academic"
  },
  {
    id: "6",
    title: "Campus Placement",
    description: "Expected placement in top tech companies",
    date: "Mar 2025",
    status: "upcoming",
    category: "career"
  }
];

const aiRecommendations: SchemeRecommendation[] = [
  {
    id: "1",
    name: "Dr. A.P.J. Abdul Kalam Technical Scholarship",
    amount: "₹50,000",
    eligibility: 95,
    deadline: "30 Dec 2024",
    category: "Technical Education",
    aiConfidence: 92
  },
  {
    id: "2",
    name: "National Scholarship for Innovation",
    amount: "₹75,000",
    eligibility: 88,
    deadline: "15 Jan 2025",
    category: "Research & Innovation",
    aiConfidence: 85
  },
  {
    id: "3",
    name: "AI/ML Skill Development Grant",
    amount: "₹25,000",
    eligibility: 98,
    deadline: "20 Dec 2024",
    category: "Skill Development",
    aiConfidence: 96
  }
];

export const StudentLifeCycleTracker = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const currentCGPA = 8.7;
  const completionPercentage = 75;
  const totalSchemesBenefited = 5;
  const predictedPlacementScore = 92;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "upcoming":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "academic":
        return "bg-blue-100 text-blue-800";
      case "scheme":
        return "bg-green-100 text-green-800";
      case "career":
        return "bg-purple-100 text-purple-800";
      case "certification":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{currentCGPA}</p>
              <p className="text-sm text-muted-foreground">Current CGPA</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{completionPercentage}%</p>
              <p className="text-sm text-muted-foreground">Degree Progress</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Gift className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">{totalSchemesBenefited}</p>
              <p className="text-sm text-muted-foreground">Schemes Benefited</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">{predictedPlacementScore}%</p>
              <p className="text-sm text-muted-foreground">AI Placement Score</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Recommendations Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-6 w-6 text-primary animate-pulse" />
          <h3 className="text-xl font-bold">AI-Powered Scheme Recommendations</h3>
          <Badge className="bg-accent text-white animate-bounce">Live</Badge>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {aiRecommendations.map((scheme) => (
            <Card key={scheme.id} className="p-4 border-2 border-accent/30 hover:border-accent/60 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-sm">{scheme.name}</h4>
                <Badge className="bg-accent/20 text-accent text-xs">
                  {scheme.aiConfidence}% match
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-semibold text-green-600">{scheme.amount}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Eligibility:</span>
                    <span className="font-semibold">{scheme.eligibility}%</span>
                  </div>
                  <Progress value={scheme.eligibility} className="h-2" />
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="font-medium text-red-600">{scheme.deadline}</span>
                </div>
                
                <Badge className={getCategoryColor("scheme")}>
                  {scheme.category}
                </Badge>
              </div>
              
              <Button className="w-full mt-3" size="sm">
                Apply Now
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Timeline Section */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="h-6 w-6" />
          Academic Journey Timeline
        </h3>
        
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  event.status === "completed" ? "bg-green-50 border-green-500" :
                  event.status === "in-progress" ? "bg-blue-50 border-blue-500" :
                  "bg-gray-50 border-gray-300"
                }`}>
                  {getStatusIcon(event.status)}
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                )}
              </div>
              
              <Card 
                className={`flex-1 p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  event.aiRecommended ? 'ring-2 ring-accent/30' : ''
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{event.title}</h4>
                  <div className="flex gap-2">
                    {event.aiRecommended && (
                      <Badge className="bg-accent text-white text-xs">
                        <Bot className="h-3 w-3 mr-1" />
                        AI Recommended
                      </Badge>
                    )}
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
