import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Edit,
  Phone,
  Mail,
  MapPin,
  BookOpen as Book
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

const loggedInStudents = [
  { 
    id: "STU-2024-001", 
    name: "Arjun Patel", 
    email: "arjun.patel@university.edu", 
    course: "B.Tech CSE", 
    semester: "6th", 
    cgpa: 8.9,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "online",
    lastLogin: "2024-01-15 09:30 AM"
  },
  { 
    id: "STU-2024-002", 
    name: "Priya Sharma", 
    email: "priya.sharma@university.edu", 
    course: "B.Tech CSE", 
    semester: "6th", 
    cgpa: 9.2,
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    status: "online",
    lastLogin: "2024-01-15 08:45 AM"
  },
  { 
    id: "STU-2024-003", 
    name: "Rohit Kumar", 
    email: "rohit.kumar@university.edu", 
    course: "B.Tech CSE", 
    semester: "4th", 
    cgpa: 8.5,
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastLogin: "2024-01-14 06:15 PM"
  },
  { 
    id: "STU-2024-004", 
    name: "Sneha Gupta", 
    email: "sneha.gupta@university.edu", 
    course: "B.Tech CSE", 
    semester: "6th", 
    cgpa: 8.7,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    status: "online",
    lastLogin: "2024-01-15 10:00 AM"
  },
  { 
    id: "STU-2024-005", 
    name: "Vikash Singh", 
    email: "vikash.singh@university.edu", 
    course: "B.Tech CSE", 
    semester: "4th", 
    cgpa: 7.8,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    status: "online",
    lastLogin: "2024-01-15 09:15 AM"
  },
  { 
    id: "STU-2024-006", 
    name: "Anita Reddy", 
    email: "anita.reddy@university.edu", 
    course: "B.Tech CSE", 
    semester: "6th", 
    cgpa: 9.0,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    lastLogin: "2024-01-14 07:30 PM"
  }
];

const departmentLocations = [
  { id: "1", name: "Computer Science Dept", position: [28.5449, 77.1925] as [number, number], data: "Building A, Floor 3" },
  { id: "2", name: "Faculty Lounge", position: [28.5459, 77.1935] as [number, number], data: "Building B, Floor 2" },
  { id: "3", name: "Research Lab", position: [28.5439, 77.1915] as [number, number], data: "Building C, Floor 1" },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

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
        {/* Government Header with Emblem */}
        <div className="mb-6 p-4 bg-gradient-to-r from-orange-100 via-white to-green-100 border border-orange-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Indian Government Emblem */}
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center relative">
                <div className="w-12 h-12 relative">
                  {/* Ashoka Chakra */}
                  <div className="w-12 h-12 border-3 border-white rounded-full relative flex items-center justify-center">
                    <div className="absolute w-2 h-2 bg-white rounded-full"></div>
                    {/* 24 Spokes */}
                    {Array.from({length: 24}).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute w-0.5 h-4 bg-white origin-bottom"
                        style={{
                          transform: `rotate(${i * 15}deg) translateY(-8px)`,
                          transformOrigin: 'center 16px'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">भारत सरकार • Government of India</h2>
                <p className="text-sm text-slate-600">शिक्षा मंत्रालय • Ministry of Education</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-100 text-green-800 text-xs">Verified Faculty</Badge>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">APAR Compliant</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="w-2 h-8 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded"></div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          {/* Desktop Tabs */}
          <div className="hidden lg:block">
            <TabsList className="grid w-full grid-cols-11 text-xs bg-gradient-to-r from-blue-50 to-green-50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="teaching" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Teaching</TabsTrigger>
              <TabsTrigger value="research" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Research</TabsTrigger>
              <TabsTrigger value="apar" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">APAR</TabsTrigger>
              <TabsTrigger value="students" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Students</TabsTrigger>
              <TabsTrigger value="student-management" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-1" />
                Student Mgmt
              </TabsTrigger>
              <TabsTrigger value="development" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Development</TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Schedule</TabsTrigger>
              <TabsTrigger value="qr" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <QrCode className="h-4 w-4 mr-1" />
                QR Code
              </TabsTrigger>
              <TabsTrigger value="export" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Download className="h-4 w-4 mr-1" />
                Export
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analytics</TabsTrigger>
            </TabsList>
          </div>

          {/* Mobile Tabs - Improved styling */}
          <div className="block lg:hidden">
            <div className="overflow-x-auto">
              <TabsList className="flex gap-2 w-max p-2 bg-gradient-to-r from-blue-50 to-green-50">
                <TabsTrigger value="overview" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="teaching" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Teaching</TabsTrigger>
                <TabsTrigger value="research" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Research</TabsTrigger>
                <TabsTrigger value="apar" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">APAR</TabsTrigger>
                <TabsTrigger value="students" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Students</TabsTrigger>
                <TabsTrigger value="student-management" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Users className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="development" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Dev</TabsTrigger>
                <TabsTrigger value="schedule" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Schedule</TabsTrigger>
                <TabsTrigger value="qr" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <QrCode className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="export" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <Download className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="analytics" className="whitespace-nowrap text-xs px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Analytics</TabsTrigger>
              </TabsList>
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

          <TabsContent value="student-management" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">Student Management</h2>
                <p className="text-muted-foreground">View logged-in students with their profiles and academic information</p>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-green-100 text-green-800">
                  {loggedInStudents.filter(s => s.status === 'online').length} Online
                </Badge>
                <Badge variant="outline">
                  {loggedInStudents.length} Total Students
                </Badge>
              </div>
            </div>

            {/* Stats Cards - Government Style */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card className="p-4 border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {loggedInStudents.filter(s => s.status === 'online').length}
                  </div>
                  <div className="text-sm text-green-700 font-medium">Currently Online</div>
                  <Badge className="mt-1 bg-green-100 text-green-800 text-xs">🟢 Live Status</Badge>
                </div>
              </Card>
              <Card className="p-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {loggedInStudents.filter(s => s.cgpa >= 9.0).length}
                  </div>
                  <div className="text-sm text-blue-700 font-medium">CGPA ≥ 9.0</div>
                  <Badge className="mt-1 bg-blue-100 text-blue-800 text-xs">🏆 Top Performers</Badge>
                </div>
              </Card>
              <Card className="p-4 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <GraduationCap className="h-8 w-8 text-purple-500" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    {loggedInStudents.filter(s => s.semester === '6th').length}
                  </div>
                  <div className="text-sm text-purple-700 font-medium">Final Year</div>
                  <Badge className="mt-1 bg-purple-100 text-purple-800 text-xs">🎓 Graduating</Badge>
                </div>
              </Card>
              <Card className="p-4 border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-orange-600">75+</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {(loggedInStudents.reduce((sum, s) => sum + s.cgpa, 0) / loggedInStudents.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-orange-700 font-medium">Avg CGPA</div>
                  <Badge className="mt-1 bg-orange-100 text-orange-800 text-xs">📊 Class Average</Badge>
                </div>
              </Card>
            </div>

            {/* Student Grid - Aadhaar Card Style */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {loggedInStudents.map((student) => (
                <Card key={student.id} className="p-0 hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300 bg-gradient-to-br from-blue-50 via-white to-green-50">
                  {/* Government Header Strip */}
                  <div className="h-2 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
                  
                  <div className="p-5">
                    {/* Government Emblem and Title */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                          <div className="w-5 h-5 border border-white rounded-full relative flex items-center justify-center">
                            <div className="absolute w-1 h-1 bg-white rounded-full"></div>
                            {/* Mini Ashoka Chakra */}
                            {Array.from({length: 12}).map((_, i) => (
                              <div 
                                key={i}
                                className="absolute w-0.5 h-1.5 bg-white origin-bottom"
                                style={{
                                  transform: `rotate(${i * 30}deg) translateY(-2px)`,
                                  transformOrigin: 'center 6px'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-blue-800 font-medium">GoI Student ID</div>
                      </div>
                      <Badge variant={student.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                        {student.status === 'online' ? '🟢 Live' : '🔴 Offline'}
                      </Badge>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <Avatar className="h-16 w-16 border-2 border-blue-200">
                          <AvatarImage src={student.photo} alt={student.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-800 font-bold">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {/* Attendance Badge */}
                        <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                          75D+
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-slate-800 truncate mb-1">{student.name}</h3>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-blue-700">ID:</span> 
                            <span className="text-slate-600 font-mono">{student.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-blue-700">Course:</span> 
                            <span className="text-slate-600">{student.course}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-blue-700">Semester:</span> 
                            <span className="text-slate-600">{student.semester}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                  <div className="mt-4 pt-4 border-t border-dashed border-blue-200">
                    {/* CGPA with Government Grade Scale */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-700">CGPA</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          student.cgpa >= 9.0 ? 'text-green-600' : 
                          student.cgpa >= 8.0 ? 'text-blue-600' : 'text-orange-600'
                        }`}>
                          {student.cgpa}/10
                        </span>
                        <Badge variant="outline" className={`text-xs px-2 py-0 ${
                          student.cgpa >= 9.0 ? 'bg-green-100 text-green-800 border-green-300' : 
                          student.cgpa >= 8.0 ? 'bg-blue-100 text-blue-800 border-blue-300' : 
                          'bg-orange-100 text-orange-800 border-orange-300'
                        }`}>
                          {student.cgpa >= 9.0 ? 'A+' : student.cgpa >= 8.0 ? 'A' : 'B+'}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={(student.cgpa / 10) * 100} 
                      className="h-2 mb-3"
                    />
                    
                    {/* Attendance Tracking */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-700">Attendance</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-green-600">94%</span>
                        <div className="flex items-center gap-1">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-green-700">75</span>
                          </div>
                          <span className="text-xs text-green-600">Days+</span>
                        </div>
                      </div>
                    </div>
                    <Progress value={94} className="h-2 mb-3" />
                    
                    {/* Government Compliance Badges */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        📋 Verified
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        🏛️ Compliant
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                        🎓 Active
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      <p><span className="font-medium">Last Login:</span> {student.lastLogin}</p>
                      <p><span className="font-medium">Scholarship:</span> <span className="text-green-600 font-medium">₹48,000/year</span></p>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200" onClick={() => setSelectedStudent(student)}>
                            View Profile
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Student Profile - {student.name}</DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-6">
                            {/* Profile Header */}
                            <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                              <Avatar className="h-20 w-20">
                                <AvatarImage src={student.photo} alt={student.name} />
                                <AvatarFallback className="text-lg">{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-2xl font-bold">{student.name}</h3>
                                  <Badge variant={student.status === 'online' ? 'default' : 'secondary'} className="text-sm">
                                    {student.status === 'online' ? '🟢 Online' : '🔴 Offline'}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div><span className="font-medium">Student ID:</span> {student.id}</div>
                                  <div><span className="font-medium">Course:</span> {student.course}</div>
                                  <div><span className="font-medium">Semester:</span> {student.semester}</div>
                                  <div><span className="font-medium">CGPA:</span> <span className="font-bold text-blue-600">{student.cgpa}/10</span></div>
                                </div>
                              </div>
                            </div>

                            {/* Contact Information */}
                            <Card className="p-6">
                              <h4 className="font-semibold mb-4 flex items-center gap-2">
                                <Mail className="h-5 w-5" />
                                Contact Information
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                  <Mail className="h-4 w-4 text-blue-600" />
                                  <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm text-muted-foreground">{student.email}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                  <Phone className="h-4 w-4 text-green-600" />
                                  <div>
                                    <p className="text-sm font-medium">Phone</p>
                                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                  <MapPin className="h-4 w-4 text-red-600" />
                                  <div>
                                    <p className="text-sm font-medium">Address</p>
                                    <p className="text-sm text-muted-foreground">New Delhi, India</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                                  <Clock className="h-4 w-4 text-purple-600" />
                                  <div>
                                    <p className="text-sm font-medium">Last Login</p>
                                    <p className="text-sm text-muted-foreground">{student.lastLogin}</p>
                                  </div>
                                </div>
                              </div>
                            </Card>

                            {/* Academic Performance */}
                            <Card className="p-6">
                              <h4 className="font-semibold mb-4 flex items-center gap-2">
                                <Book className="h-5 w-5" />
                                Academic Performance
                              </h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                  <div className="text-2xl font-bold text-blue-600">{student.cgpa}</div>
                                  <div className="text-sm text-blue-700">Current CGPA</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                  <div className="text-2xl font-bold text-green-600">142</div>
                                  <div className="text-sm text-green-700">Credits Earned</div>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                  <div className="text-2xl font-bold text-purple-600">94%</div>
                                  <div className="text-sm text-purple-700">Attendance</div>
                                </div>
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                  <div className="text-2xl font-bold text-orange-600">18</div>
                                  <div className="text-sm text-orange-700">Subjects</div>
                                </div>
                              </div>
                              
                              {/* Subject-wise Performance */}
                              <div className="space-y-3">
                                <h5 className="font-medium">Current Semester Subjects</h5>
                                {[
                                  { subject: "Data Structures & Algorithms", grade: "A+", marks: 95 },
                                  { subject: "Database Management Systems", grade: "A", marks: 88 },
                                  { subject: "Operating Systems", grade: "A+", marks: 92 },
                                  { subject: "Computer Networks", grade: "A", marks: 85 }
                                ].map((sub, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                      <p className="font-medium text-sm">{sub.subject}</p>
                                      <p className="text-xs text-muted-foreground">Grade: {sub.grade}</p>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-bold">{sub.marks}%</div>
                                      <Progress value={sub.marks} className="w-20 h-2 mt-1" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </Card>

                            {/* Achievements & Certifications */}
                            <Card className="p-6">
                              <h4 className="font-semibold mb-4 flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Achievements & Certifications
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium mb-3">Certifications</h5>
                                  <div className="space-y-2">
                                    {["AWS Cloud Practitioner", "Google Analytics", "Python Programming", "ML Basics"].map((cert, idx) => (
                                      <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                        <span className="text-sm">{cert}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-medium mb-3">Scholarships</h5>
                                  <div className="space-y-2">
                                    <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                                      <p className="font-medium text-sm">National Scholarship Portal</p>
                                      <p className="text-xs text-muted-foreground">₹48,000/year • Active</p>
                                    </div>
                                    <div className="p-3 bg-purple-50 border border-purple-200 rounded">
                                      <p className="font-medium text-sm">PMKVY 4.0</p>
                                      <p className="text-xs text-muted-foreground">Skill Development • Completed</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                              <Button className="flex-1">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Message
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Calendar className="mr-2 h-4 w-4" />
                                Schedule Meeting
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <FileText className="mr-2 h-4 w-4" />
                                Generate Report
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Mail className="mr-1 h-3 w-3" />
                        Contact
                      </Button>
                    </div>
                  </div>
                  
                    {/* Bottom Government Strip */}
                    <div className="h-1 bg-gradient-to-r from-orange-500 via-white to-green-500"></div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="p-6 mt-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="grid gap-3 md:grid-cols-4">
                <Button variant="outline" className="justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Send Announcement
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Export Attendance
                </Button>
                <Button variant="outline" className="justify-start">
                  <Award className="mr-2 h-4 w-4" />
                  Grade Assignment
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
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