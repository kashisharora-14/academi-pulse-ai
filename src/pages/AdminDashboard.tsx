import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chatbot } from "@/components/Chatbot";
import { MapView } from "@/components/MapView";
import { LogOut, Users, Building2, TrendingUp, Award } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const enrollmentData = [
  { month: "Jan", students: 4000 },
  { month: "Feb", students: 4500 },
  { month: "Mar", students: 5000 },
  { month: "Apr", students: 5500 },
  { month: "May", students: 6000 },
  { month: "Jun", students: 6800 },
];

const schemeData = [
  { name: "PM-YUVA", value: 35 },
  { name: "RUSA", value: 25 },
  { name: "NSP", value: 20 },
  { name: "Others", value: 20 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--success))"];

const institutionLocations = [
  { id: "1", name: "IIT Delhi", position: [28.5449, 77.1925] as [number, number], data: "NIRF Rank: 2" },
  { id: "2", name: "IIT Mumbai", position: [19.1334, 72.9133] as [number, number], data: "NIRF Rank: 3" },
  { id: "3", name: "IIT Madras", position: [12.9916, 80.2336] as [number, number], data: "NIRF Rank: 1" },
  { id: "4", name: "IIT Kanpur", position: [26.5123, 80.2329] as [number, number], data: "NIRF Rank: 4" },
];

const AdminDashboard = () => {
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
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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
              <Badge className="bg-success">+12.5%</Badge>
            </div>
            <div className="text-2xl font-bold">10.2M</div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="h-8 w-8 text-accent" />
              <Badge className="bg-success">+8.3%</Badge>
            </div>
            <div className="text-2xl font-bold">50,234</div>
            <div className="text-sm text-muted-foreground">Institutions</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-secondary" />
              <Badge className="bg-success">+15.2%</Badge>
            </div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Active Schemes</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="h-8 w-8 text-success" />
              <Badge className="bg-success">+22.1%</Badge>
            </div>
            <div className="text-2xl font-bold">2.5M</div>
            <div className="text-sm text-muted-foreground">Data Points/Day</div>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Student Enrollment Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Scheme Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={schemeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {schemeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Top Institutions Map</h3>
            <MapView locations={institutionLocations} />
          </Card>

          <Chatbot />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
