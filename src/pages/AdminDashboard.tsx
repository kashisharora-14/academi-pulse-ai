
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
import { 
  LogOut, 
  Users, 
  Building2, 
  TrendingUp, 
  Award, 
  BookOpen, 
  DollarSign,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Map,
  Bot
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from "recharts";

const enrollmentData = [
  { month: "Jan", students: 4000, target: 4200 },
  { month: "Feb", students: 4500, target: 4700 },
  { month: "Mar", students: 5000, target: 5200 },
  { month: "Apr", students: 5500, target: 5800 },
  { month: "May", students: 6000, target: 6300 },
  { month: "Jun", students: 6800, target: 7000 },
];

const schemeData = [
  { name: "PM-YUVA", value: 35, budget: 500, utilized: 425 },
  { name: "RUSA", value: 25, budget: 800, utilized: 720 },
  { name: "NSP", value: 20, budget: 300, utilized: 280 },
  { name: "Others", value: 20, budget: 200, utilized: 180 },
];

const performanceData = [
  { state: "Maharashtra", score: 85, institutions: 1200 },
  { state: "Tamil Nadu", score: 82, institutions: 950 },
  { state: "Karnataka", score: 80, institutions: 800 },
  { state: "Gujarat", score: 78, institutions: 700 },
  { state: "West Bengal", score: 75, institutions: 650 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--success))"];

const institutionLocations = [
  { id: "1", name: "IIT Delhi", position: [28.5449, 77.1925] as [number, number], data: "NIRF Rank: 2, Score: 85.4" },
  { id: "2", name: "IIT Mumbai", position: [19.1334, 72.9133] as [number, number], data: "NIRF Rank: 3, Score: 84.2" },
  { id: "3", name: "IIT Madras", position: [12.9916, 80.2336] as [number, number], data: "NIRF Rank: 1, Score: 88.7" },
  { id: "4", name: "IIT Kanpur", position: [26.5123, 80.2329] as [number, number], data: "NIRF Rank: 4, Score: 83.1" },
  { id: "5", name: "AIIMS Delhi", position: [28.5672, 77.2100] as [number, number], data: "Medical Rank: 1, Score: 90.2" },
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
              <h1 className="text-2xl font-bold">National Education Data Platform - Admin</h1>
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="institutions">Institutions</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="map">Geo-Analytics</TabsTrigger>
            <TabsTrigger value="ai">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge className="bg-success">+12.5%</Badge>
                </div>
                <div className="text-2xl font-bold">10.2M</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
                <Progress value={75} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Building2 className="h-8 w-8 text-accent" />
                  <Badge className="bg-success">+8.3%</Badge>
                </div>
                <div className="text-2xl font-bold">50,234</div>
                <div className="text-sm text-muted-foreground">Institutions</div>
                <Progress value={85} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                  <Badge className="bg-success">+15.2%</Badge>
                </div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Active Schemes</div>
                <Progress value={92} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-success" />
                  <Badge className="bg-success">+22.1%</Badge>
                </div>
                <div className="text-2xl font-bold">₹1,850Cr</div>
                <div className="text-sm text-muted-foreground">Budget Utilized</div>
                <Progress value={68} className="mt-2" />
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Student Enrollment vs Target</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="students" stroke="hsl(var(--primary))" strokeWidth={2} name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Scheme Budget Utilization</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={schemeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="hsl(var(--secondary))" name="Budget (Cr)" />
                    <Bar dataKey="utilized" fill="hsl(var(--primary))" name="Utilized (Cr)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Pending Schemes
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Review Compliance Reports
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Monthly Report
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Alerts & Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">5 institutions missing NAAC compliance</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">12 scholarship applications pending</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">NIRF rankings updated successfully</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">System Health</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Sync</span>
                    <Badge className="bg-success">99.8%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Uptime</span>
                    <Badge className="bg-success">99.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Quality</span>
                    <Badge className="bg-success">95.2%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="institutions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Top Performing States</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="state" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="hsl(var(--primary))" name="Performance Score" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Scheme Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={schemeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name} (${entry.value}%)`}
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

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Scheme Performance Metrics</h3>
                <div className="space-y-4">
                  {schemeData.map((scheme, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{scheme.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {((scheme.utilized / scheme.budget) * 100).toFixed(1)}% utilized
                        </span>
                      </div>
                      <Progress value={(scheme.utilized / scheme.budget) * 100} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Predictive Analytics Dashboard</h3>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Student Success Predictions</h4>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">87.3%</div>
                    <div className="text-sm text-green-700">Predicted graduation rate</div>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">92.1%</div>
                    <div className="text-sm text-blue-700">Employability score</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Risk Assessment</h4>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">2.8%</div>
                    <div className="text-sm text-red-700">Dropout risk</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">15</div>
                    <div className="text-sm text-yellow-700">Institutions at risk</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">NAAC Compliance</h3>
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-muted-foreground">Institutions compliant</div>
                <Progress value={94.2} className="mt-2" />
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">AICTE Approval</h3>
                <div className="text-2xl font-bold text-blue-600">98.7%</div>
                <div className="text-sm text-muted-foreground">Approved institutions</div>
                <Progress value={98.7} className="mt-2" />
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">UGC Recognition</h3>
                <div className="text-2xl font-bold text-purple-600">96.5%</div>
                <div className="text-sm text-muted-foreground">Recognized institutions</div>
                <Progress value={96.5} className="mt-2" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Top Institutions Nationwide</h3>
              <MapView locations={institutionLocations} />
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Chatbot />
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">AI-Generated Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Recommendation</h4>
                    <p className="text-sm text-blue-700">Consider increasing funding for STEM programs in rural areas to improve national competitiveness.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Trend Alert</h4>
                    <p className="text-sm text-green-700">Engineering enrollment up 15% this year - prepare infrastructure scaling plans.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">Action Required</h4>
                    <p className="text-sm text-yellow-700">5 institutions show declining performance metrics - intervention recommended.</p>
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

export default AdminDashboard;
