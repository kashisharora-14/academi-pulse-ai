import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chatbot } from "@/components/Chatbot";
import MapView from "@/components/MapView";
import { LogOut, UserCircle, Users, BookOpen, Award, TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const performanceData = [
  { month: "Jan", rating: 4.2 },
  { month: "Feb", rating: 4.3 },
  { month: "Mar", rating: 4.5 },
  { month: "Apr", rating: 4.6 },
  { month: "May", rating: 4.7 },
  { month: "Jun", rating: 4.8 },
];

const courseData = [
  { course: "DSA", students: 85 },
  { course: "DBMS", students: 72 },
  { course: "OS", students: 68 },
  { course: "Networks", students: 78 },
];

const departmentLocations = [
  { id: "1", name: "Computer Science Dept", position: [28.5449, 77.1925] as [number, number], data: "Building A" },
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
              <h1 className="text-2xl font-bold">Teacher Portal</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-8 w-8 text-primary" />
              <Badge className="bg-success">Active</Badge>
            </div>
            <div className="text-2xl font-bold">303</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-accent" />
              <Badge>Ongoing</Badge>
            </div>
            <div className="text-2xl font-bold">4</div>
            <div className="text-sm text-muted-foreground">Courses Teaching</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-secondary" />
              <Badge className="bg-success">Excellent</Badge>
            </div>
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-success" />
              <Badge className="bg-success">+15%</Badge>
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Research Papers</div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Performance Rating Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rating" stroke="hsl(var(--success))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Student Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Department Location</h3>
            <MapView locations={departmentLocations} center={[28.5449, 77.1925]} zoom={16} />
          </Card>

          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
