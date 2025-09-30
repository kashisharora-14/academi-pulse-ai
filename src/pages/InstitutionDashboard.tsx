import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chatbot } from "@/components/Chatbot";
import MapView from "@/components/MapView";
import { LogOut, Building2, Users, GraduationCap, BookOpen } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const departmentData = [
  { name: "CS", students: 450 },
  { name: "EE", students: 380 },
  { name: "ME", students: 320 },
  { name: "CE", students: 290 },
  { name: "EC", students: 410 },
];

const placementData = [
  { year: "2020", placed: 75 },
  { year: "2021", placed: 82 },
  { year: "2022", placed: 88 },
  { year: "2023", placed: 91 },
  { year: "2024", placed: 94 },
];

const campusLocation = [
  { id: "1", name: "Main Campus", position: [28.5449, 77.1925] as [number, number], data: "Students: 5000" },
];

const InstitutionDashboard = () => {
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
            <div className="h-10 w-10 rounded-lg bg-accent flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Institution Portal</h1>
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
              <Badge className="bg-success">+5.2%</Badge>
            </div>
            <div className="text-2xl font-bold">5,240</div>
            <div className="text-sm text-muted-foreground">Total Students</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <GraduationCap className="h-8 w-8 text-accent" />
              <Badge className="bg-success">+3.8%</Badge>
            </div>
            <div className="text-2xl font-bold">320</div>
            <div className="text-sm text-muted-foreground">Faculty Members</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="h-8 w-8 text-secondary" />
              <Badge>Active</Badge>
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Departments</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="h-8 w-8 text-success" />
              <Badge className="bg-success">Rank 15</Badge>
            </div>
            <div className="text-2xl font-bold">94%</div>
            <div className="text-sm text-muted-foreground">Placement Rate</div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Department Strength</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Placement Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="placed" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Campus Location</h3>
            <MapView locations={campusLocation} center={[28.5449, 77.1925]} zoom={15} />
          </Card>

          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default InstitutionDashboard;
