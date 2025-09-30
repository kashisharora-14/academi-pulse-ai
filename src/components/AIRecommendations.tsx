import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Award, Briefcase, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface Recommendation {
  id: string;
  type: "scholarship" | "internship" | "course" | "scheme";
  title: string;
  description: string;
  matchScore: number;
  amount?: string;
  deadline?: string;
  provider: string;
  eligibility: string[];
}

interface AIRecommendationsProps {
  userType: "student" | "institution";
  userData: any;
}

export const AIRecommendations = ({ userType, userData }: AIRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  // Simulate AI-powered recommendations
  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (userType === "student") {
        setRecommendations([
          {
            id: "1",
            type: "scholarship",
            title: "INSPIRE Scholarship for Higher Education",
            description: "Scholarship for students pursuing BS, MS in natural and basic sciences",
            matchScore: 95,
            amount: "₹80,000/year",
            deadline: "April 30, 2025",
            provider: "Department of Science & Technology",
            eligibility: ["Top 1% in board exams", "Science stream", "Age < 27"]
          },
          {
            id: "2",
            type: "internship",
            title: "Google Summer of Code 2025",
            description: "Work on open source projects with global organizations",
            matchScore: 88,
            amount: "$3000-6600",
            deadline: "March 20, 2025",
            provider: "Google",
            eligibility: ["Programming skills", "Open source experience"]
          },
          {
            id: "3",
            type: "scholarship",
            title: "Post Matric Scholarship SC/ST",
            description: "Financial assistance for SC/ST students pursuing higher education",
            matchScore: 82,
            amount: "₹1,200/month",
            deadline: "May 15, 2025",
            provider: "Ministry of Social Justice",
            eligibility: ["SC/ST certificate", "Family income < ₹2.5 LPA"]
          },
          {
            id: "4",
            type: "course",
            title: "AWS Machine Learning Certification",
            description: "Industry-recognized ML certification to boost career prospects",
            matchScore: 78,
            amount: "Free (scholarship available)",
            deadline: "Rolling admission",
            provider: "Amazon Web Services",
            eligibility: ["Basic programming knowledge", "Math fundamentals"]
          }
        ]);
      } else {
        // Institution recommendations
        setRecommendations([
          {
            id: "1",
            type: "scheme",
            title: "RUSA 2.0 Infrastructure Grant",
            description: "Funding for infrastructure development in state universities",
            matchScore: 92,
            amount: "₹50-200 Cr",
            deadline: "June 30, 2025",
            provider: "Ministry of Education",
            eligibility: ["State university", "NAAC accredited", "Matching contribution"]
          },
          {
            id: "2",
            type: "scheme",
            title: "TEQIP-III Quality Enhancement",
            description: "Technical Education Quality Improvement Programme",
            matchScore: 87,
            amount: "₹25-75 Cr",
            deadline: "May 20, 2025",
            provider: "AICTE & World Bank",
            eligibility: ["Engineering college", "NBA accreditation", "Innovation focus"]
          },
          {
            id: "3",
            type: "scheme",
            title: "Smart India Hackathon Grant",
            description: "Funding to host national-level hackathon at your institution",
            matchScore: 75,
            amount: "₹15 Lakh",
            deadline: "April 10, 2025",
            provider: "AICTE & MoE",
            eligibility: ["Innovation cell", "Minimum 1000 students"]
          }
        ]);
      }
      
      setLoading(false);
      toast.success("AI recommendations generated based on your profile!");
    }, 1500);
  };

  useEffect(() => {
    generateRecommendations();
  }, [userType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "scholarship":
        return <Award className="h-4 w-4" />;
      case "internship":
        return <Briefcase className="h-4 w-4" />;
      case "course":
        return <GraduationCap className="h-4 w-4" />;
      case "scheme":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "scholarship":
        return "bg-green-100 text-green-800";
      case "internship":
        return "bg-blue-100 text-blue-800";
      case "course":
        return "bg-purple-100 text-purple-800";
      case "scheme":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI-Powered Recommendations
        </h3>
        <Button size="sm" variant="outline" onClick={generateRecommendations} disabled={loading}>
          {loading ? "Analyzing..." : "Refresh"}
        </Button>
      </div>

      <div className="mb-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-sm text-purple-800">
          <strong>AI Analysis:</strong> Based on your {userType === "student" ? "academic performance, projects, and interests" : "institutional performance and NIRF metrics"}, 
          we've identified {recommendations.length} high-match opportunities for you.
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={getTypeColor(rec.type)}>
                    <span className="flex items-center gap-1">
                      {getTypeIcon(rec.type)}
                      {rec.type.charAt(0).toUpperCase() + rec.type.slice(1)}
                    </span>
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    {rec.matchScore}% Match
                  </Badge>
                </div>
                <h4 className="font-semibold text-base">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              {rec.amount && (
                <div>
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="ml-2 font-medium text-green-600">{rec.amount}</span>
                </div>
              )}
              {rec.deadline && (
                <div>
                  <span className="text-muted-foreground">Deadline:</span>
                  <span className="ml-2 font-medium text-orange-600">{rec.deadline}</span>
                </div>
              )}
              <div className="col-span-2">
                <span className="text-muted-foreground">Provider:</span>
                <span className="ml-2 font-medium">{rec.provider}</span>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Eligibility Criteria:</p>
              <div className="flex flex-wrap gap-1">
                {rec.eligibility.map((criteria, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {criteria}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1">Apply Now</Button>
              <Button size="sm" variant="outline" className="flex-1">Learn More</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
