import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  LogOut
} from "lucide-react";
import { Chatbot } from "@/components/Chatbot";
import { MapView } from "@/components/MapView";
import { Gamification } from "@/components/Gamification";
import { StudentLifeCycleTracker } from "@/components/StudentLifeCycleTracker";
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

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lifecycle">Life Cycle</TabsTrigger>
            <TabsTrigger value="gamification">
              <Trophy className="h-4 w-4 mr-1" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="chat">EduBot</TabsTrigger>
            <TabsTrigger value="map">Campus Map</TabsTrigger>
          </TabsList>

          <TabsContent value="lifecycle" className="space-y-6">
            <StudentLifeCycleTracker />
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <Gamification />
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
            <div className="grid gap-6 lg:grid-cols-2">
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
                      nextDue: "Apr 2024"
                    },
                    { 
                      name: "PMKVY 4.0", 
                      type: "Skill Development", 
                      amount: "Free Training", 
                      status: "Completed", 
                      duration: "6 months",
                      disbursed: "Certificate",
                      nextDue: "N/A"
                    },
                    { 
                      name: "SWAYAM NPTEL", 
                      type: "Online Courses", 
                      amount: "Free", 
                      status: "Ongoing", 
                      duration: "12 weeks",
                      disbursed: "4 Courses",
                      nextDue: "May 2024"
                    }
                  ].map((scheme, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{scheme.name}</h4>
                          <p className="text-sm text-muted-foreground">{scheme.type}</p>
                        </div>
                        <Badge variant={scheme.status === "Active" ? "default" : scheme.status === "Completed" ? "secondary" : "outline"}>
                          {scheme.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="ml-2 font-medium">{scheme.amount}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-2 font-medium">{scheme.duration}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Received:</span>
                          <span className="ml-2 font-medium">{scheme.disbursed}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Due:</span>
                          <span className="ml-2 font-medium">{scheme.nextDue}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Scheme Eligibility Checker</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">AI-Powered Recommendations</h4>
                    <p className="text-sm text-blue-700">Based on your profile, you're eligible for 8 new schemes</p>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: "Post Matric Scholarship", eligibility: "95%", amount: "₹1,200/month", deadline: "Mar 30, 2024" },
                      { name: "Merit-cum-Means Scholarship", eligibility: "87%", amount: "₹20,000/year", deadline: "Apr 15, 2024" },
                      { name: "Research Fellowship", eligibility: "82%", amount: "₹31,000/month", deadline: "May 01, 2024" },
                      { name: "Innovation Challenge", eligibility: "78%", amount: "₹1,00,000", deadline: "Jun 15, 2024" }
                    ].map((scheme, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">{scheme.name}</h5>
                          <Badge variant="outline">{scheme.eligibility} match</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Amount: {scheme.amount}</p>
                          <p>Deadline: {scheme.deadline}</p>
                        </div>
                        <Button size="sm" className="mt-2 w-full">Apply Now</Button>
                      </div>
                    ))}
                  </div>
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