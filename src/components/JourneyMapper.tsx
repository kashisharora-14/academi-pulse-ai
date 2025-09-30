import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Circle, 
  Download, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Users, 
  TrendingUp 
} from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "completed" | "in-progress" | "upcoming";
  type: "admission" | "scholarship" | "internship" | "placement" | "alumni" | "scheme";
  details?: string[];
}

interface JourneyMapperProps {
  studentData: any;
}

export const JourneyMapper = ({ studentData }: JourneyMapperProps) => {
  
  const journeySteps: JourneyStep[] = [
    {
      id: "1",
      title: "Admission to University",
      description: "Enrolled in B.Tech Computer Science",
      date: "August 2021",
      status: "completed",
      type: "admission",
      details: ["JEE Main Score: 96.8%", "Rank: 2,450", "Choice: Computer Science"]
    },
    {
      id: "2",
      title: "National Scholarship Portal",
      description: "Merit-based scholarship awarded",
      date: "September 2021",
      status: "completed",
      type: "scholarship",
      details: ["Amount: ₹48,000/year", "Duration: 4 years", "Total: ₹1,92,000"]
    },
    {
      id: "3",
      title: "PMKVY 4.0 Skill Training",
      description: "Completed Full Stack Development course",
      date: "January 2023",
      status: "completed",
      type: "scheme",
      details: ["Duration: 6 months", "Certificate: Level 4", "Skills: React, Node.js"]
    },
    {
      id: "4",
      title: "Summer Internship - TCS",
      description: "Software Development Intern",
      date: "May 2023 - July 2023",
      status: "completed",
      type: "internship",
      details: ["Stipend: ₹15,000/month", "Project: Cloud Migration", "PPO Received"]
    },
    {
      id: "5",
      title: "Final Year Project",
      description: "AI-powered Education Analytics Platform",
      date: "August 2024 - Present",
      status: "in-progress",
      type: "scheme",
      details: ["Guide: Dr. Sharma", "Funding: ₹50,000", "Tech: ML, React, Python"]
    },
    {
      id: "6",
      title: "Campus Placement",
      description: "Job offer from Google India",
      date: "Expected: May 2025",
      status: "upcoming",
      type: "placement",
      details: ["Package: ₹28 LPA", "Role: SDE-1", "Location: Bangalore"]
    },
    {
      id: "7",
      title: "Alumni Network",
      description: "Join as active alumni member",
      date: "Expected: June 2025",
      status: "upcoming",
      type: "alumni",
      details: ["Mentorship program", "Career guidance", "Network events"]
    }
  ];

  const getStepIcon = (type: string, status: string) => {
    const iconClass = status === "completed" ? "text-green-600" : 
                      status === "in-progress" ? "text-blue-600" : "text-gray-400";
    
    switch (type) {
      case "admission":
        return <GraduationCap className={`h-5 w-5 ${iconClass}`} />;
      case "scholarship":
      case "scheme":
        return <Award className={`h-5 w-5 ${iconClass}`} />;
      case "internship":
        return <Briefcase className={`h-5 w-5 ${iconClass}`} />;
      case "placement":
        return <TrendingUp className={`h-5 w-5 ${iconClass}`} />;
      case "alumni":
        return <Users className={`h-5 w-5 ${iconClass}`} />;
      default:
        return status === "completed" ? 
          <CheckCircle className={`h-5 w-5 ${iconClass}`} /> : 
          <Circle className={`h-5 w-5 ${iconClass}`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const exportJourneyAsPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text("Student Life Cycle Journey Map", 14, 22);
    
    // Student info
    doc.setFontSize(12);
    doc.text(`Student: ${studentData.name || 'Arjun Patel'}`, 14, 32);
    doc.text(`ID: ${studentData.id || 'STU-2024-001'}`, 14, 39);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 46);
    
    // Journey steps
    let yPosition = 56;
    journeySteps.forEach((step, index) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(`${index + 1}. ${step.title}`, 14, yPosition);
      
      doc.setFont(undefined, 'normal');
      doc.setFontSize(9);
      doc.text(`${step.description} | ${step.date}`, 20, yPosition + 6);
      doc.text(`Status: ${step.status}`, 20, yPosition + 11);
      
      if (step.details && step.details.length > 0) {
        step.details.forEach((detail, idx) => {
          doc.text(`• ${detail}`, 24, yPosition + 16 + (idx * 5));
        });
        yPosition += 16 + (step.details.length * 5) + 6;
      } else {
        yPosition += 18;
      }
    });
    
    doc.save("student-journey-map.pdf");
    toast.success("Journey map exported as PDF!");
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Beneficiary Journey Mapper</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Complete lifecycle from admission to alumni
          </p>
        </div>
        <Button onClick={exportJourneyAsPDF} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export as PDF
        </Button>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        
        {/* Journey steps */}
        <div className="space-y-6">
          {journeySteps.map((step, index) => (
            <div key={step.id} className="relative flex gap-4">
              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-white">
                {getStepIcon(step.type, step.status)}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold">{step.title}</h4>
                  <Badge className={getStatusColor(step.status)}>
                    {step.status === "in-progress" ? "In Progress" : 
                     step.status === "completed" ? "Completed" : "Upcoming"}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-1">{step.description}</p>
                <p className="text-xs text-muted-foreground mb-3">📅 {step.date}</p>
                
                {step.details && step.details.length > 0 && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <ul className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
        <h4 className="font-semibold mb-2">Journey Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {journeySteps.filter(s => s.status === "completed").length}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {journeySteps.filter(s => s.status === "in-progress").length}
            </div>
            <div className="text-xs text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {journeySteps.filter(s => s.status === "upcoming").length}
            </div>
            <div className="text-xs text-muted-foreground">Upcoming</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
