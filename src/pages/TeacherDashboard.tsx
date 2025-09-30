
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Chatbot } from "@/components/Chatbot";
import { MapView } from "@/components/MapView";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { ExportTools } from "@/components/ExportTools";
import { 
  LogOut, 
  UserCircle, 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  FileText,
  Star,
  Calendar,
  Target,
  BarChart3,
  GraduationCap,
  Clock,
  CheckCircle,
  QrCode,
  Download,
  Plus,
  Edit
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const performanceData = [
  { month: "Jan", rating: 4.2, students: 85, research: 2 },
  { month: "Feb", rating: 4.3, students: 87, research: 3 },
  { month: "Mar", rating: 4.5, students: 89, research: 2 },
  { month: "Apr", rating: 4.6, students: 92, research: 4 },
  { month: "May", rating: 4.7, students: 88, research: 3 },
  { month: "Jun", rating: 4.8, students: 94, research: 5 },
];

const courseData = [
  { course: "DSA", students: 85, completion: 92, satisfaction: 4.6 },
  { course: "DBMS", students: 72, completion: 89, satisfaction: 4.4 },
  { course: "OS", students: 68, completion: 95, satisfaction: 4.7 },
  { course: "Networks", students: 78, completion: 88, satisfaction: 4.3 },
];

const researchMetrics = [
  { category: "Publications", score: 85, target: 90 },
  { category: "Citations", score: 78, target: 80 },
  { category: "Funding", score: 65, target: 75 },
  { category: "Patents", score: 40, target: 60 },
  { category: "Collaborations", score: 70, target: 80 },
  { category: "Mentoring", score: 90, target: 85 },
];

const aparData = {
  overallRating: 4.6,
  categories: [
    { name: "Teaching Effectiveness", score: 4.8, weight: 30 },
    { name: "Research & Publications", score: 4.2, weight: 25 },
    { name: "Administrative Work", score: 4.5, weight: 15 },
    { name: "Student Mentoring", score: 4.9, weight: 20 },
    { name: "Professional Development", score: 4.3, weight: 10 },
  ]
};

const upcomingTasks = [
  { task: "Submit APAR Self Assessment", due: "2024-03-30", priority: "high" },
  { task: "Research Paper Review", due: "2024-04-05", priority: "medium" },
  { task: "Student Project Evaluation", due: "2024-04-10", priority: "high" },
  { task: "Department Meeting", due: "2024-04-02", priority: "low" },
];

const departmentLocations = [
  { id: "1", name: "Computer Science Dept", position: [28.5449, 77.1925] as [number, number], data: "Building A, Floor 3" },
  { id: "2", name: "Faculty Lounge", position: [28.5459, 77.1935] as [number, number], data: "Building B, Floor 2" },
  { id: "3", name: "Research Lab", position: [28.5439, 77.1915] as [number, number], data: "Building C, Floor 1" },
];

const TeacherDashboard = () => {
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
            <div className="h-10 w-10 rounded-lg bg-success flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Faculty Portal - Dr. Priya Sharma</h1>
              <p className="text-sm text-muted-foreground">{user?.email} • APAR ID: FAC-2023-001</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <TabsList className="grid w-full grid-cols-10 text-xs">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="teaching">Teaching</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="apar">APAR</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="qr">
                <QrCode className="h-4 w-4 mr-1" />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="export">
                <Download className="h-4 w-4 mr-1" />
                Export
              </TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>

          {/* Mobile Tabs - Scrollable */}
          <div className="block lg:hidden">
            <div className="flex overflow-x-auto pb-2 space-x-1 mobile-tabs-scroll">
              <TabsTrigger value="overview" className="whitespace-nowrap text-xs">Overview</TabsTrigger>
              <TabsTrigger value="teaching" className="whitespace-nowrap text-xs">Teaching</TabsTrigger>
              <TabsTrigger value="research" className="whitespace-nowrap text-xs">Research</TabsTrigger>
              <TabsTrigger value="apar" className="whitespace-nowrap text-xs">APAR</TabsTrigger>
              <TabsTrigger value="students" className="whitespace-nowrap text-xs">Students</TabsTrigger>
              <TabsTrigger value="development" className="whitespace-nowrap text-xs">Development</TabsTrigger>
              <TabsTrigger value="schedule" className="whitespace-nowrap text-xs">Schedule</TabsTrigger>
              <TabsTrigger value="qr" className="whitespace-nowrap text-xs">
                <QrCode className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="export" className="whitespace-nowrap text-xs">
                <Download className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="analytics" className="whitespace-nowrap text-xs">Analytics</TabsTrigger>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge className="bg-success">Active</Badge>
                </div>
                <div className="text-2xl font-bold">303</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
                <Progress value={85} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="h-8 w-8 text-accent" />
                  <Badge>Ongoing</Badge>
                </div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-muted-foreground">Courses Teaching</div>
                <Progress value={100} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                  <Badge className="bg-success">Excellent</Badge>
                </div>
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
                <Progress value={96} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-success" />
                  <Badge className="bg-success">+15%</Badge>
                </div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Research Papers</div>
                <Progress value={80} className="mt-2" />
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Performance Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="rating" stroke="hsl(var(--success))" strokeWidth={2} name="Student Rating" />
                    <Line type="monotone" dataKey="research" stroke="hsl(var(--primary))" strokeWidth={2} name="Research Output" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Course Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completion" fill="hsl(var(--primary))" name="Completion %" />
                    <Bar dataKey="satisfaction" fill="hsl(var(--secondary))" name="Satisfaction (x20)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Upcoming Tasks</h3>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      task.priority === "high" ? "border-red-200 bg-red-50" :
                      task.priority === "medium" ? "border-yellow-200 bg-yellow-50" :
                      "border-green-200 bg-green-50"
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{task.task}</h4>
                        <Badge variant={
                          task.priority === "high" ? "destructive" :
                          task.priority === "medium" ? "secondary" : "default"
                        }>
                          {task.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">APAR Status</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">4.6/5</div>
                    <div className="text-sm text-muted-foreground">Overall Rating</div>
                  </div>
                  <div className="space-y-2">
                    {aparData.categories.map((category, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span>{category.score}/5</span>
                        </div>
                        <Progress value={(category.score / 5) * 100} />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Recognition & Awards</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium text-sm">Best Faculty Award</p>
                      <p className="text-xs text-muted-foreground">2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <Star className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">Research Excellence</p>
                      <p className="text-xs text-muted-foreground">2022</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Teaching Innovation</p>
                      <p className="text-xs text-muted-foreground">2023</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teaching" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Current Courses</h3>
                <div className="space-y-4">
                  {courseData.map((course, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{course.course}</h4>
                        <Badge variant="outline">{course.students} students</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Completion:</span>
                          <span className="ml-2 font-medium">{course.completion}%</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Rating:</span>
                          <span className="ml-2 font-medium">{course.satisfaction}/5</span>
                        </div>
                      </div>
                      <Progress value={course.completion} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Teaching Resources</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Course Materials
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    View Student Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Classes
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Grade Assignments
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Research Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={researchMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current" dataKey="score" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                    <Radar name="Target" dataKey="target" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Recent Publications</h3>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">AI in Educational Data Mining</h4>
                    <p className="text-xs text-muted-foreground">IEEE Transactions on Education • 2024</p>
                    <Badge className="mt-2" variant="outline">Q1 Journal</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Machine Learning Pedagogies</h4>
                    <p className="text-xs text-muted-foreground">ACM Computing Education • 2023</p>
                    <Badge className="mt-2" variant="outline">Conference</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">Student Performance Analytics</h4>
                    <p className="text-xs text-muted-foreground">Journal of Educational Technology • 2023</p>
                    <Badge className="mt-2" variant="outline">Q2 Journal</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="apar" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">APAR Summary</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{aparData.overallRating}/5</div>
                    <div className="text-sm text-green-700">Overall APAR Rating</div>
                    <Badge className="mt-2 bg-success">Outstanding</Badge>
                  </div>
                  <div className="space-y-3">
                    {aparData.categories.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{category.score}/5</span>
                            <span className="text-xs text-muted-foreground">({category.weight}%)</span>
                          </div>
                        </div>
                        <Progress value={(category.score / 5) * 100} />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Self Assessment</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Action Required</h4>
                    <p className="text-sm text-blue-700">Complete your annual self-assessment by March 30, 2024</p>
                    <Button className="mt-3" size="sm">
                      Start Assessment
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Teaching Portfolio</span>
                      <Badge className="bg-success">Submitted</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Research Contributions</span>
                      <Badge className="bg-success">Submitted</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Service Activities</span>
                      <Badge variant="secondary">Pending</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Student Mentoring</h3>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4">
                  <h4 className="font-semibold">PhD Students</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded">
                      <p className="font-medium text-sm">Rahul Kumar</p>
                      <p className="text-xs text-muted-foreground">ML in Education • Year 3</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-medium text-sm">Priya Singh</p>
                      <p className="text-xs text-muted-foreground">Data Mining • Year 2</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">M.Tech Projects</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded">
                      <p className="font-medium text-sm">5 Active Projects</p>
                      <p className="text-xs text-muted-foreground">AI/ML Domain</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="font-medium text-sm">3 Completed</p>
                      <p className="text-xs text-muted-foreground">This Semester</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="font-semibold">95%</span>
                    </div>
                    <Progress value={95} />
                    <div className="flex justify-between">
                      <span className="text-sm">Student Satisfaction</span>
                      <span className="font-semibold">4.8/5</span>
                    </div>
                    <Progress value={96} />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="development" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Professional Development</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Completed Training</h4>
                    <p className="text-sm text-green-700">Online Teaching Methodologies (40 hrs)</p>
                    <p className="text-xs text-green-600">Completed: Feb 2024</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">In Progress</h4>
                    <p className="text-sm text-blue-700">Research Ethics & Publication (20 hrs)</p>
                    <Progress value={65} className="mt-2" />
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">Upcoming</h4>
                    <p className="text-sm text-yellow-700">AI in Higher Education Workshop</p>
                    <p className="text-xs text-yellow-600">Starts: April 15, 2024</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Conferences & Workshops</h3>
                <div className="space-y-3">
                  <div className="p-3 border rounded">
                    <p className="font-medium text-sm">IEEE Education Conference</p>
                    <p className="text-xs text-muted-foreground">Speaker • May 2024</p>
                    <Badge className="mt-1" variant="outline">Upcoming</Badge>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="font-medium text-sm">ACM Computing Education</p>
                    <p className="text-xs text-muted-foreground">Attendee • March 2024</p>
                    <Badge className="mt-1 bg-success">Attended</Badge>
                  </div>
                  <div className="p-3 border rounded">
                    <p className="font-medium text-sm">Faculty Development Program</p>
                    <p className="text-xs text-muted-foreground">Organizer • Jan 2024</p>
                    <Badge className="mt-1 bg-success">Completed</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Campus Locations</h3>
                <MapView locations={departmentLocations} center={[28.5449, 77.1925]} zoom={16} />
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Today's Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium text-sm">DSA Lecture</p>
                      <p className="text-xs text-muted-foreground">9:00 AM - 10:00 AM • Room 301</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">Student Consultation</p>
                      <p className="text-xs text-muted-foreground">11:00 AM - 12:00 PM • Office</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <div>
                      <p className="font-medium text-sm">Research Meeting</p>
                      <p className="text-xs text-muted-foreground">2:00 PM - 3:00 PM • Conference Room</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <QRCodeGenerator 
                data={{ 
                  id: "FAC-2023-001",
                  name: "Dr. Priya Sharma",
                  email: user?.email,
                  department: "Computer Science",
                  designation: "Associate Professor",
                  aparRating: 4.6,
                  courses: courseData,
                  research: researchMetrics,
                  publications: 12,
                  awards: ["Best Faculty Award 2023", "Research Excellence 2022", "Teaching Innovation 2023"],
                  students: 303,
                  avgRating: 4.8
                }} 
                type="faculty"
                title="Faculty Profile QR"
              />
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Faculty QR Management</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Generate New QR
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">👨‍🏫 Faculty Profile</h4>
                    <p className="text-sm text-blue-700">
                      Complete faculty profile with APAR rating, courses, and achievements
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Update Profile
                    </Button>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">📚 Course Materials</h4>
                    <p className="text-sm text-green-700">
                      QR codes for course resources and materials
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Course Material
                    </Button>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">🔬 Research Portfolio</h4>
                    <p className="text-sm text-purple-700">
                      Publications, patents, and research projects
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Research Work
                    </Button>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">🎓 Student Mentoring</h4>
                    <p className="text-sm text-orange-700">
                      PhD students, projects, and mentoring record
                    </p>
                    <Button size="sm" className="mt-2" variant="outline">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Student Project
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <ExportTools 
                data={{
                  name: "Dr. Priya Sharma",
                  id: "FAC-2023-001",
                  email: user?.email,
                  department: "Computer Science",
                  designation: "Associate Professor",
                  aparRating: 4.6,
                  courses: courseData,
                  research: researchMetrics,
                  publications: 12,
                  awards: ["Best Faculty Award 2023", "Research Excellence 2022", "Teaching Innovation 2023"],
                  students: 303,
                  avgRating: 4.8,
                  performanceData: performanceData
                }}
                title="Faculty Profile - Dr. Priya Sharma"
                type="faculty"
              />
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Faculty Export Tools</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Custom CV
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">📄 Academic CV</h4>
                    <p className="text-sm text-muted-foreground">
                      Complete academic CV with all achievements and publications
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Customize
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">🎯 APAR Report</h4>
                    <p className="text-sm text-muted-foreground">
                      Annual Performance Assessment Report
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Achievement
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">📊 Teaching Portfolio</h4>
                    <p className="text-sm text-muted-foreground">
                      Course evaluations and teaching effectiveness
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Course
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">🔬 Research Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      Publications, citations, and research impact
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline">Generate</Button>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Publication
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Chatbot />
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">AI-Generated Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Strength</h4>
                    <p className="text-sm text-green-700">Your student ratings consistently exceed department average by 0.3 points.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Opportunity</h4>
                    <p className="text-sm text-blue-700">Consider collaborating on interdisciplinary research to increase citation impact.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">Recognition</h4>
                    <p className="text-sm text-yellow-700">You're in the top 10% for research output in your department this year.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;
