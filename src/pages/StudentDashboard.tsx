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
            {/* Academics content would go here */}
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            {/* Schemes content would go here */}
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Documents content would go here */}
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            {/* Chatbot content is already included in overview, but could be a separate tab */}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            {/* Map content is already included in overview, but could be a separate tab */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StudentDashboard;