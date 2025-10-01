import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BookOpen,
  Award,
  TrendingUp,
  Calendar,
  Users,
  FileText,
  Bell,
  Settings,
  Trophy,
  Target,
  GraduationCap,
  LogOut,
  CheckCircle,
  QrCode,
  Download,
  Sparkles,
  Route,
  FolderLock,
  Clock,
  AlertTriangle
} from "lucide-react";
import { Chatbot } from "@/components/Chatbot";
import { MapView } from "@/components/MapView";
import { Gamification } from "@/components/Gamification";
import { StudentLifeCycleTracker } from "@/components/StudentLifeCycleTracker";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { ExportTools } from "@/components/ExportTools";
import { AIRecommendations } from "@/components/AIRecommendations";
import { JourneyMapper } from "@/components/JourneyMapper";
import { DigiLocker } from "@/components/DigiLocker";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const skillData = [
  { subject: "Programming", score: 85 },
  { subject: "Mathematics", score: 78 },
  { subject: "Communication", score: 92 },
  { subject: "Analytics", score: 88 },
  { subject: "Design", score: 75 },
];

const semesterGrades = [
  { sem: "Sem 1", gpa: 8.2 },
  { sem: "Sem 2", gpa: 8.5 },
  { sem: "Sem 3", gpa: 8.8 },
  { sem: "Sem 4", gpa: 9.1 },
];

const nearbyInstitutions = [
  { id: "1", name: "Central Library", position: [28.5449, 77.1925] as [number, number], data: "Open 24/7" },
  { id: "2", name: "Sports Complex", position: [28.5469, 77.1945] as [number, number], data: "Open till 10 PM" },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isApplicationDialogOpen, setIsApplicationDialogOpen] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<any>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "Arjun Patel",
    studentId: "STU-2024-001",
    email: "arjun.patel@student.edu",
    phone: "",
    fatherName: "",
    motherName: "",
    annualIncome: "",
    category: "",
    bankAccount: "",
    ifscCode: "",
    aadharNumber: "",
    address: ""
  });

  // State for Authority Request System
  const [isAuthorityRequestDialogOpen, setIsAuthorityRequestDialogOpen] = useState(false);
  const [requestDetails, setRequestDetails] = useState({
    requestedBy: "",
    requestedLevel: "",
    details: "",
    requestDate: "",
    status: "Pending"
  });
  const [authorityRequests, setAuthorityRequests] = useState<any[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleApplyClick = (scholarship: any) => {
    setSelectedScholarship(scholarship);
    setIsApplicationDialogOpen(true);
    setApplicationSubmitted(false); // Reset submission status when opening dialog
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission to department
    setApplicationSubmitted(true);
    // In a real application, you would send formData to your backend here
    console.log("Submitting application data:", formData);

    // Use a timeout to mimic a successful submission and then close the dialog
    setTimeout(() => {
      setIsApplicationDialogOpen(false);
      setApplicationSubmitted(false); // Reset submission status after closing
      // Reset form fields
      setFormData({
        studentName: "Arjun Patel", // Keep pre-filled fields if desired, or reset them too
        studentId: "STU-2024-001",
        email: "arjun.patel@student.edu",
        phone: "",
        fatherName: "",
        motherName: "",
        annualIncome: "",
        category: "",
        bankAccount: "",
        ifscCode: "",
        aadharNumber: "",
        address: ""
      });
    }, 3000); // Close dialog and reset form after 3 seconds
  };

  // Handler for Authority Request System
  const handleAuthorityRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest = {
      ...requestDetails,
      requestDate: new Date().toISOString(),
      requestedBy: user?.email || "Unknown User", // Assuming user object has email
      status: "Pending"
    };
    setAuthorityRequests([...authorityRequests, newRequest]);
    // In a real app, you'd save this to a database or send it to a backend
    console.log("New authority request:", newRequest);
    setIsAuthorityRequestDialogOpen(false);
    setRequestDetails({ // Reset form
      requestedBy: "",
      requestedLevel: "",
      details: "",
      requestDate: "",
      status: "Pending"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Student Life Cycle Portal</h1>
              <p className="text-sm text-muted-foreground">{user?.email || 'student@nedp.gov.in'} • Student ID: STU-2024-001</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/")} variant="ghost">
              <GraduationCap className="mr-2 h-4 w-4" /> Return to Home
            </Button>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Welcome, Arjun Patel! 🎓</h2>
              <p className="text-muted-foreground">
                Track your complete academic journey from admission to graduation. Your current CGPA: <span className="font-semibold text-primary">8.9/10</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">Semester 6</div>
              <div className="text-sm text-muted-foreground">B.Tech Computer Science</div>
              <Badge className="mt-1 bg-success">On Track</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <TabsList className="grid w-full grid-cols-11 text-xs">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="lifecycle">Life Cycle</TabsTrigger>
              <TabsTrigger value="journey">
                <Route className="h-4 w-4 mr-1" />
                Journey
              </TabsTrigger>
              <TabsTrigger value="gamification">
                <Trophy className="h-4 w-4 mr-1" />
                Achievements
              </TabsTrigger>
              <TabsTrigger value="digilocker">
                <FolderLock className="h-4 w-4 mr-1" />
                DigiLocker
              </TabsTrigger>

              <TabsTrigger value="qr">
                <QrCode className="h-4 w-4 mr-1" />
                QR
              </TabsTrigger>
              <TabsTrigger value="export">
                <Download className="h-4 w-4 mr-1" />
                Export
              </TabsTrigger>
              <TabsTrigger value="ai">
                <Sparkles className="h-4 w-4 mr-1" />
                AI
              </TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="schemes">Schemes</TabsTrigger>
              <TabsTrigger value="chat">EduBot</TabsTrigger>
              <TabsTrigger value="authority-requests">
                <Users className="h-4 w-4 mr-1" /> {/* Icon for Authority Requests */}
                Authority Requests
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Mobile Tabs - Grid Layout */}
          <div className="block lg:hidden">
            <div className="overflow-x-auto scrollbar-hide">
              <TabsList className="grid grid-cols-3 gap-2 p-2 bg-muted/50 h-auto min-w-full">
                <TabsTrigger value="overview" className="text-xs px-2 py-2 h-auto">Overview</TabsTrigger>
                <TabsTrigger value="lifecycle" className="text-xs px-2 py-2 h-auto">Life Cycle</TabsTrigger>
                <TabsTrigger value="journey" className="text-xs px-1 py-2 h-auto flex flex-col items-center gap-1">
                  <Route className="h-3 w-3" />
                  <span>Journey</span>
                </TabsTrigger>
                <TabsTrigger value="gamification" className="text-xs px-1 py-2 h-auto flex flex-col items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  <span>Awards</span>
                </TabsTrigger>
                <TabsTrigger value="digilocker" className="text-xs px-1 py-2 h-auto flex flex-col items-center gap-1">
                  <FolderLock className="h-3 w-3" />
                  <span>DigiLocker</span>
                </TabsTrigger>

                <TabsTrigger value="qr" className="text-xs px-1 py-2 h-auto flex flex-col items-center gap-1">
                  <QrCode className="h-3 w-3" />
                  <span>QR Code</span>
                </TabsTrigger>
                <TabsTrigger value="export" className="text-xs px-1 py-2 h-auto flex flex-col items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>Export</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="text-xs px-1 py-2 h-auto flex flex-col items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>AI</span>
                </TabsTrigger>
                <TabsTrigger value="academics" className="text-xs px-2 py-2 h-auto">Academics</TabsTrigger>
                <TabsTrigger value="schemes" className="text-xs px-2 py-2 h-auto">Schemes</TabsTrigger>
                <TabsTrigger value="chat" className="text-xs px-2 py-2 h-auto">EduBot</TabsTrigger>
                <TabsTrigger value="authority-requests" className="text-xs px-1 py-2 h-auto flex flex-col items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>Auth Requests</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="lifecycle" className="space-y-6">
            <StudentLifeCycleTracker />
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <Gamification />
          </TabsContent>

          <TabsContent value="journey" className="space-y-6">
            <JourneyMapper studentData={{
              name: "Arjun Patel",
              id: "STU-2024-001",
              email: user?.email
            }} />
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <QRCodeGenerator
                data={{
                  id: "STU-2024-001",
                  name: "Arjun Patel",
                  email: user?.email,
                  cgpa: 8.9,
                  credits: 148,
                  attendance: 92,
                  scholarships: ["NSP", "PMKVY"],
                  certifications: ["AWS", "Google Analytics", "ML Basics", "Python", "Data Structures"]
                }}
                type="student"
                title="Student ID Card QR"
              />
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">QR Code Uses</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">📱 Student ID Card</h4>
                    <p className="text-sm text-blue-700">
                      Print this QR on your student ID card for instant profile access and verification
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📜 Certificates</h4>
                    <p className="text-sm text-green-700">
                      Each certificate gets a unique QR for blockchain-verified authenticity
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">👔 Job Applications</h4>
                    <p className="text-sm text-purple-700">
                      Employers can scan to view verified achievements and academic records
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🏛️ University Verification</h4>
                    <p className="text-sm text-orange-700">
                      Other institutions can verify your credentials for higher studies
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ExportTools
                data={{
                  name: "Arjun Patel",
                  id: "STU-2024-001",
                  email: user?.email,
                  cgpa: 8.9,
                  credits: 148,
                  attendance: 92,
                  scholarships: [
                    { name: "NSP", amount: "₹48,000/year" },
                    { name: "PMKVY", type: "Skill Development" }
                  ],
                  certifications: [
                    "AWS Cloud Practitioner",
                    "Google Analytics",
                    "Machine Learning Basics",
                    "Python Programming",
                    "Data Structures Expert"
                  ]
                }}
                title="Student Profile - Arjun Patel"
                type="student"
              />
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Export Features</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">📄 Digital Transcript</h4>
                    <p className="text-sm text-muted-foreground">
                      Auto-generated PDF with QR authentication - perfect for job applications
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">📊 Performance Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Excel sheet with semester-wise grades, attendance, and achievement data
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">🔗 Shareable Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Unique link for employers/universities to view verified profile
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">💳 Offline Wallet Card</h4>
                    <p className="text-sm text-muted-foreground">
                      Encrypted PDF for offline access to all your documents
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <AIRecommendations
              userType="student"
              userData={{
                cgpa: 8.9,
                branch: "Computer Science",
                projects: ["AI Education Platform", "ML Model"],
                skills: ["React", "Python", "ML"],
                interests: ["AI", "Machine Learning", "Cloud Computing"]
              }}
            />
          </TabsContent>

          <TabsContent value="digilocker" className="space-y-6">
            <DigiLocker
              userEmail={user?.email || 'student@university.edu'}
              planType="free"
            />
          </TabsContent>

          {/* Authority Request System Tab */}
          <TabsContent value="authority-requests" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Authority Request System
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Request detailed information from lower levels or track your requests.
                  </p>
                </div>
                <Dialog open={isAuthorityRequestDialogOpen} onOpenChange={setIsAuthorityRequestDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary" onClick={() => setIsAuthorityRequestDialogOpen(true)}>
                      <Users className="h-4 w-4 mr-2" />
                      Create New Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Authority Request Form</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to request information from a lower authority level.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAuthorityRequestSubmit} className="space-y-4 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="requestedBy">Requested By</Label>
                          <Input id="requestedBy" value={user?.email || ''} readOnly className="bg-gray-50" />
                        </div>
                        <div>
                          <Label htmlFor="requestedLevel">Requesting From Level *</Label>
                          <Select value={requestDetails.requestedLevel} onValueChange={(value) => setRequestDetails({...requestDetails, requestedLevel: value})} required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the level you are requesting from" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="department">Department</SelectItem>
                              <SelectItem value="sub-department">Sub-Department</SelectItem>
                              <SelectItem value="team">Team</SelectItem>
                              <SelectItem value="individual">Individual</SelectItem>
                              {/* Add more levels as needed */}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="details">Request Details *</Label>
                        <Input
                          id="details"
                          placeholder="Specify the information you need and the reason for your request"
                          value={requestDetails.details}
                          onChange={(e) => setRequestDetails({...requestDetails, details: e.target.value})}
                          required
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                          <Bell className="h-4 w-4 mr-2" />
                          Send Request
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsAuthorityRequestDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Display Existing Requests */}
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-bold">My Requests</h3>
                {authorityRequests.length > 0 ? (
                  authorityRequests.map((req, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold text-md">{req.requestedLevel} - {req.requestedBy}</h4>
                        <Badge className={`bg-${req.status === 'Pending' ? 'orange-500' : req.status === 'Approved' ? 'green-500' : 'red-500'}`}>
                          {req.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{req.details}</p>
                      <p className="text-xs text-muted-foreground">Requested on: {new Date(req.requestDate).toLocaleDateString()}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">You have not made any authority requests yet.</p>
                )}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <Badge className="bg-success">Excellent</Badge>
                </div>
                <div className="text-2xl font-bold">8.9</div>
                <div className="text-sm text-muted-foreground">Current CGPA</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-8 w-8 text-accent" />
                  <Badge>Active</Badge>
                </div>
                <div className="text-2xl font-bold">6/8</div>
                <div className="text-sm text-muted-foreground">Courses Completed</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                  <Badge className="bg-success">+2</Badge>
                </div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Certifications</div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="h-8 w-8 text-success" />
                  <Badge>Eligible</Badge>
                </div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Scholarships</div>
              </Card>
            </div>

            <Card className="p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Course Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Data Structures</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Algorithms</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Database Systems</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>
              </div>
            </Card>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Skill Assessment</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Skills" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Semester Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={semesterGrades}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sem" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="gpa" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Campus Facilities</h3>
                <MapView locations={nearbyInstitutions} center={[28.5449, 77.1925]} zoom={14} />
              </Card>

              <Chatbot />
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Academic Records</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">8.9</div>
                      <div className="text-sm text-blue-700">Current CGPA</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">148</div>
                      <div className="text-sm text-green-700">Credits Earned</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">92%</div>
                      <div className="text-sm text-purple-700">Attendance</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Current Semester Courses</h4>
                    {[
                      { name: "Machine Learning", code: "CS642", credits: 4, grade: "A", marks: 89 },
                      { name: "Software Engineering", code: "CS630", credits: 3, grade: "A+", marks: 95 },
                      { name: "Database Management", code: "CS620", credits: 4, grade: "A", marks: 87 },
                      { name: "Computer Networks", code: "CS610", credits: 3, grade: "B+", marks: 82 }
                    ].map((course, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">{course.name}</p>
                          <p className="text-sm text-muted-foreground">{course.code} • {course.credits} Credits</p>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-1">{course.grade}</Badge>
                          <p className="text-sm">{course.marks}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Certifications & Achievements</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-yellow-50 rounded-lg text-center">
                      <Award className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">5</div>
                      <div className="text-sm">Certifications</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-lg font-bold">3</div>
                      <div className="text-sm">Awards</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { name: "AWS Cloud Practitioner", issuer: "Amazon", date: "Dec 2023", status: "Active" },
                      { name: "Google Analytics", issuer: "Google", date: "Nov 2023", status: "Active" },
                      { name: "Machine Learning Basics", issuer: "Coursera", date: "Oct 2023", status: "Active" },
                      { name: "Python Programming", issuer: "HackerRank", date: "Sep 2023", status: "Active" },
                      { name: "Data Structures", issuer: "LeetCode", date: "Aug 2023", status: "Active" }
                    ].map((cert, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <p className="font-medium">{cert.name}</p>
                          <p className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</p>
                        </div>
                        <Badge className="bg-success">{cert.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            {/* Scholarship Application Tracking */}
            <div className="mb-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Award className="h-6 w-6 text-yellow-500" />
                      Scholarship Applications & Tracking
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Track your scholarship applications from submission to approval
                    </p>
                  </div>
                  <Dialog open={isApplicationDialogOpen} onOpenChange={setIsApplicationDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary" onClick={() => handleApplyClick(null)}>
                        <Award className="h-4 w-4 mr-2" />
                        Apply for Scholarship
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {selectedScholarship ? `Apply for ${selectedScholarship.name}` : 'Scholarship Application Form'}
                        </DialogTitle>
                        <DialogDescription>
                          Fill in your details below. Your application will be sent to the Financial Aid Department for review.
                        </DialogDescription>
                      </DialogHeader>

                      {!applicationSubmitted ? (
                        <form onSubmit={handleApplicationSubmit} className="space-y-4 mt-4">
                          {/* Pre-filled Student Information */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="studentName">Student Name *</Label>
                              <Input id="studentName" value={formData.studentName} readOnly className="bg-gray-50" />
                            </div>
                            <div>
                              <Label htmlFor="studentId">Student ID *</Label>
                              <Input id="studentId" value={formData.studentId} readOnly className="bg-gray-50" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="email">Email *</Label>
                              <Input id="email" type="email" value={formData.email} readOnly className="bg-gray-50" />
                            </div>
                            <div>
                              <Label htmlFor="phone">Phone Number *</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="Enter 10-digit mobile number"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                required
                              />
                            </div>
                          </div>

                          {/* Parent Information */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="fatherName">Father's Name *</Label>
                              <Input
                                id="fatherName"
                                placeholder="Enter father's full name"
                                value={formData.fatherName}
                                onChange={(e) => setFormData({...formData, fatherName: e.target.value})}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="motherName">Mother's Name *</Label>
                              <Input
                                id="motherName"
                                placeholder="Enter mother's full name"
                                value={formData.motherName}
                                onChange={(e) => setFormData({...formData, motherName: e.target.value})}
                                required
                              />
                            </div>
                          </div>

                          {/* Financial & Category Information */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="annualIncome">Annual Family Income (₹) *</Label>
                              <Input
                                id="annualIncome"
                                type="number"
                                placeholder="Enter annual income"
                                value={formData.annualIncome}
                                onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="category">Category *</Label>
                              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})} required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="general">General</SelectItem>
                                  <SelectItem value="obc">OBC</SelectItem>
                                  <SelectItem value="sc">SC</SelectItem>
                                  <SelectItem value="st">ST</SelectItem>
                                  <SelectItem value="ews">EWS</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {/* Bank Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="bankAccount">Bank Account Number *</Label>
                              <Input
                                id="bankAccount"
                                placeholder="Enter account number"
                                value={formData.bankAccount}
                                onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="ifscCode">IFSC Code *</Label>
                              <Input
                                id="ifscCode"
                                placeholder="Enter IFSC code"
                                value={formData.ifscCode}
                                onChange={(e) => setFormData({...formData, ifscCode: e.target.value})}
                                required
                              />
                            </div>
                          </div>

                          {/* Aadhar & Address */}
                          <div>
                            <Label htmlFor="aadharNumber">Aadhar Number *</Label>
                            <Input
                              id="aadharNumber"
                              placeholder="Enter 12-digit Aadhar number"
                              maxLength={12}
                              value={formData.aadharNumber}
                              onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="address">Residential Address *</Label>
                            <Input
                              id="address"
                              placeholder="Enter complete address"
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                              required
                            />
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-2">📋 Required Documents (Upload after submission)</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• Income Certificate (issued by competent authority)</li>
                              <li>• Caste Certificate (if applicable)</li>
                              <li>• Aadhar Card copy</li>
                              <li>• Bank Passbook first page</li>
                              <li>• Previous semester mark sheets</li>
                            </ul>
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Submit Application to Department
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsApplicationDialogOpen(false)}>
                              Cancel
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="py-8 text-center">
                          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-green-800 mb-2">Application Submitted Successfully!</h3>
                          <p className="text-muted-foreground mb-4">
                            Your scholarship application has been sent to the Financial Aid Department for review.
                          </p>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800">
                              <strong>Application ID:</strong> APP-{Date.now().toString().slice(-6)}<br/>
                              <strong>Status:</strong> Under Department Review<br/>
                              <strong>Next Step:</strong> Upload required documents in the tracking section
                            </p>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Application Status Cards */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-bold">My Applications</h3>

                  {/* Application 1 - Under Review */}
                  <div className="border rounded-lg p-4 bg-blue-50/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg">Post Matric Scholarship SC/ST</h4>
                          <Badge className="bg-blue-500">Under Department Review</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">₹1,200/month • Applied: March 15, 2024</p>
                      </div>
                    </div>

                    {/* Progress Tracker */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Application Submitted</span>
                            <span className="text-xs text-muted-foreground">Mar 15, 2024</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Your application has been received</p>
                        </div>
                      </div>

                      <div className="ml-4 h-8 w-0.5 bg-green-500"></div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white">
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Document Verification</span>
                            <span className="text-xs text-muted-foreground">Mar 18, 2024</span>
                          </div>
                          <p className="text-xs text-muted-foreground">All documents verified successfully</p>
                        </div>
                      </div>

                      <div className="ml-4 h-8 w-0.5 bg-blue-500 animate-pulse"></div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white animate-pulse">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">Department Review</span>
                            <span className="text-xs text-blue-600 font-medium">In Progress</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Being reviewed by Financial Aid Department</p>
                        </div>
                      </div>

                      <div className="ml-4 h-8 w-0.5 bg-gray-300"></div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600">
                          <Award className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-sm text-gray-500">Final Approval</span>
                          <p className="text-xs text-muted-foreground">Pending department review</p>
                        </div>
                      </div>

                      <div className="ml-4 h-8 w-0.5 bg-gray-300"></div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-sm text-gray-500">Disbursement</span>
                          <p className="text-xs text-muted-foreground">Will be processed after approval</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-100 rounded-lg flex items-start gap-2">
                      <Bell className="h-4 w-4 text-blue-700 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <span className="font-medium">Status Update:</span> Your application is currently under review by the Financial Aid Department. Expected decision by March 25, 2024.
                      </div>
                    </div>
                  </div>

                  {/* Application 2 - Approved */}
                  <div className="border rounded-lg p-4 bg-green-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg">Merit-cum-Means Scholarship</h4>
                          <Badge className="bg-green-500">Approved</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">₹20,000/year • Approved: March 10, 2024</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="p-2 bg-white rounded">
                        <span className="text-muted-foreground">Amount Sanctioned:</span>
                        <span className="ml-2 font-bold text-green-600">₹20,000</span>
                      </div>
                      <div className="p-2 bg-white rounded">
                        <span className="text-muted-foreground">Next Disbursement:</span>
                        <span className="ml-2 font-medium">April 5, 2024</span>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-green-100 rounded-lg flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-700" />
                      <span className="text-sm text-green-800 font-medium">
                        Congratulations! Your scholarship has been approved. First installment will be credited on April 5, 2024.
                      </span>
                    </div>
                  </div>

                  {/* Application 3 - Documents Pending */}
                  <div className="border rounded-lg p-4 bg-orange-50/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg">Research Fellowship - CSIR</h4>
                          <Badge className="bg-orange-500">Documents Required</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">₹31,000/month • Applied: March 12, 2024</p>
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-orange-100 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-orange-700 mt-0.5" />
                        <div className="text-sm text-orange-800">
                          <span className="font-medium">Action Required:</span> Please upload the following documents:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>Research Proposal (PDF)</li>
                            <li>Supervisor Recommendation Letter</li>
                            <li>GATE Scorecard</li>
                          </ul>
                          <Button size="sm" className="mt-3 bg-orange-600 hover:bg-orange-700">
                            Upload Documents
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Eligible Scholarships */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Available Scholarships - You're Eligible! 🎯</h3>
                <p className="text-sm text-muted-foreground mb-4">Based on your CGPA (8.9), Category (General), and Income level, you qualify for these scholarships:</p>
                <div className="space-y-4">
                  {[
                    {
                      name: "Central Sector Scholarship",
                      type: "Merit-Based",
                      amount: "₹10,000/year",
                      eligibility: "98% Match",
                      criteria: "CGPA > 8.5, Family Income < 6 LPA",
                      deadline: "April 30, 2024",
                      color: "green"
                    },
                    {
                      name: "INSPIRE Scholarship",
                      type: "Science & Technology",
                      amount: "₹80,000/year",
                      eligibility: "92% Match",
                      criteria: "Top 1% in 12th, Science Stream",
                      deadline: "May 15, 2024",
                      color: "blue"
                    },
                    {
                      name: "Dr. Ambedkar Post Matric",
                      type: "OBC Category",
                      amount: "₹1,200/month",
                      eligibility: "85% Match",
                      criteria: "OBC Category, Income < 8 LPA",
                      deadline: "March 31, 2024",
                      color: "purple"
                    },
                    {
                      name: "Prime Minister's Scholarship",
                      type: "Defense Personnel Ward",
                      amount: "₹25,000/year",
                      eligibility: "90% Match",
                      criteria: "Defense background, CGPA > 8.0",
                      deadline: "April 20, 2024",
                      color: "orange"
                    }
                  ].map((scholarship, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{scholarship.name}</h4>
                            <Badge className={`bg-${scholarship.color}-100 text-${scholarship.color}-800`}>
                              {scholarship.eligibility}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{scholarship.type}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-bold text-green-600">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-muted-foreground">Criteria:</span>
                          <span className="text-right font-medium text-xs">{scholarship.criteria}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Deadline:</span>
                          <span className="font-medium text-red-600">{scholarship.deadline}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-3" size="sm" onClick={() => handleApplyClick(scholarship)}>
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Active Schemes & Benefits</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "National Scholarship Portal (NSP)",
                      type: "Merit Scholarship",
                      amount: "₹48,000/year",
                      status: "Active",
                      duration: "4 years",
                      disbursed: "₹96,000",
                      nextDue: "Apr 2024",
                      description: "Scholarship for meritorious students." // Added description
                    },
                    {
                      name: "PMKVY 4.0",
                      type: "Skill Development",
                      amount: "Free Training",
                      status: "Completed",
                      duration: "6 months",
                      disbursed: "Certificate",
                      nextDue: "N/A",
                      description: "Skill development program for youth." // Added description
                    },
                    {
                      name: "SWAYAM NPTEL",
                      type: "Online Courses",
                      amount: "Free",
                      status: "Ongoing",
                      duration: "12 weeks",
                      disbursed: "4 Courses",
                      nextDue: "May 2024",
                      description: "Online courses for academic enhancement." // Added description
                    }
                  ].map((scheme, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{scheme.name}</h5>
                        <Badge variant="outline">{scheme.status}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">{scheme.description}</div>
                      <Button size="sm" className="mt-2 w-full">Apply Now</Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Academic Documents</h3>
                <div className="space-y-3">
                  {[
                    { name: "Degree Certificate", type: "PDF", size: "2.4 MB", date: "Expected: May 2025", status: "Pending" },
                    { name: "Transcript (Semester 1-5)", type: "PDF", size: "1.8 MB", date: "Updated: Jan 2024", status: "Available" },
                    { name: "Character Certificate", type: "PDF", size: "0.9 MB", date: "Issued: Dec 2023", status: "Available" },
                    { name: "Migration Certificate", type: "PDF", size: "1.2 MB", date: "Expected: May 2025", status: "Pending" },
                    { name: "Provisional Certificate", type: "PDF", size: "1.1 MB", date: "Expected: May 2025", status: "Pending" }
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">{doc.type} • {doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={doc.status === "Available" ? "default" : "secondary"}>
                          {doc.status}
                        </Badge>
                        {doc.status === "Available" && (
                          <Button size="sm" variant="outline">Download</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">DigiLocker Integration</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">Connected to DigiLocker</h4>
                    </div>
                    <p className="text-sm text-green-700">All documents are securely synced with your DigiLocker account</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Available Documents</h4>
                    {[
                      { name: "Aadhaar Card", issuer: "UIDAI", verified: true },
                      { name: "PAN Card", issuer: "Income Tax Department", verified: true },
                      { name: "Class 12 Certificate", issuer: "CBSE", verified: true },
                      { name: "Class 10 Certificate", issuer: "CBSE", verified: true },
                      { name: "Driving License", issuer: "RTO", verified: false }
                    ].map((doc, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <p className="font-medium text-sm">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">{doc.issuer}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {doc.verified ? (
                            <Badge className="bg-success text-xs">Verified</Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">Pending</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Chatbot />
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-16 flex-col">
                    <BookOpen className="h-6 w-6 mb-1" />
                    <span className="text-xs">Course Registration</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Award className="h-6 w-6 mb-1" />
                    <span className="text-xs">Apply Scholarship</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <FileText className="h-6 w-6 mb-1" />
                    <span className="text-xs">Request Documents</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Calendar className="h-6 w-6 mb-1" />
                    <span className="text-xs">Exam Schedule</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Users className="h-6 w-6 mb-1" />
                    <span className="text-xs">Faculty Contact</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col">
                    <Target className="h-6 w-6 mb-1" />
                    <span className="text-xs">Career Guidance</span>
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Campus Navigation</h3>
                <MapView locations={nearbyInstitutions} center={[28.5449, 77.1925]} zoom={14} />
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Campus Services</h3>
                <div className="space-y-3">
                  {[
                    { name: "Central Library", status: "Open", hours: "24/7", distance: "200m" },
                    { name: "Computer Lab", status: "Open", hours: "8 AM - 10 PM", distance: "150m" },
                    { name: "Cafeteria", status: "Open", hours: "7 AM - 11 PM", distance: "300m" },
                    { name: "Sports Complex", status: "Open", hours: "6 AM - 10 PM", distance: "400m" },
                    { name: "Medical Center", status: "Open", hours: "24/7", distance: "250m" },
                    { name: "ATM", status: "Available", hours: "24/7", distance: "100m" }
                  ].map((service, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.hours} • {service.distance}</p>
                      </div>
                      <Badge className={service.status === "Open" || service.status === "Available" ? "bg-success" : "bg-secondary"}>
                        {service.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;