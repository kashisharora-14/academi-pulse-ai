
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
  Building2, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Award,
  TrendingUp,
  DollarSign,
  Target,
  FileText,
  BarChart3,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area 
} from "recharts";

const departmentData = [
  { name: "CS", students: 450, faculty: 25, ratio: 18, capacity: 500 },
  { name: "EE", students: 380, faculty: 22, ratio: 17.3, capacity: 400 },
  { name: "ME", students: 320, faculty: 20, ratio: 16, capacity: 350 },
  { name: "CE", students: 290, faculty: 18, ratio: 16.1, capacity: 320 },
  { name: "EC", students: 410, faculty: 23, ratio: 17.8, capacity: 450 },
];

const placementData = [
  { year: "2020", placed: 75, packages: 650, highest: 1200 },
  { year: "2021", placed: 82, packages: 720, highest: 1500 },
  { year: "2022", placed: 88, packages: 800, highest: 1800 },
  { year: "2023", placed: 91, packages: 920, highest: 2200 },
  { year: "2024", placed: 94, packages: 1050, highest: 2500 },
];

const researchData = [
  { year: "2020", publications: 45, patents: 3, funding: 2.5 },
  { year: "2021", publications: 52, patents: 5, funding: 3.2 },
  { year: "2022", publications: 68, patents: 7, funding: 4.1 },
  { year: "2023", publications: 75, patents: 9, funding: 5.8 },
  { year: "2024", publications: 82, patents: 12, funding: 7.2 },
];

const complianceMetrics = [
  { category: "NAAC", score: 3.2, maxScore: 4, status: "A+", lastUpdated: "2023" },
  { category: "NIRF", rank: 85, type: "Engineering", improvement: "+5", year: "2024" },
  { category: "NBA", programs: 8, accredited: 6, percentage: 75, validity: "2026" },
  { category: "AICTE", status: "Approved", validity: "2025", students: 2000, approved: 2200 },
];

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--secondary))", "hsl(var(--success))"];

const campusLocations = [
  { id: "1", name: "Main Campus", position: [28.5449, 77.1925] as [number, number], data: "Students: 5000, Area: 200 acres" },
  { id: "2", name: "Research Center", position: [28.5469, 77.1945] as [number, number], data: "Labs: 15, Faculty: 45" },
  { id: "3", name: "Hostel Complex", position: [28.5429, 77.1905] as [number, number], data: "Capacity: 3000 students" },
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
              <h1 className="text-2xl font-bold">XYZ Institute of Technology - Dashboard</h1>
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
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="academics">Academics</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="schemes">Schemes</TabsTrigger>
            <TabsTrigger value="faculty">Faculty</TabsTrigger>
            <TabsTrigger value="campus">Campus</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge className="bg-success">+5.2%</Badge>
                </div>
                <div className="text-2xl font-bold">5,240</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
                <Progress value={87} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <GraduationCap className="h-8 w-8 text-accent" />
                  <Badge className="bg-success">+3.8%</Badge>
                </div>
                <div className="text-2xl font-bold">320</div>
                <div className="text-sm text-muted-foreground">Faculty Members</div>
                <Progress value={92} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                  <Badge className="bg-success">Rank 85</Badge>
                </div>
                <div className="text-2xl font-bold">NIRF</div>
                <div className="text-sm text-muted-foreground">Engineering Category</div>
                <Progress value={75} className="mt-2" />
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-success" />
                  <Badge className="bg-success">94%</Badge>
                </div>
                <div className="text-2xl font-bold">Placement</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
                <Progress value={94} className="mt-2" />
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Department-wise Enrollment</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="students" fill="hsl(var(--primary))" name="Current Students" />
                    <Bar dataKey="capacity" fill="hsl(var(--secondary))" name="Capacity" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Placement Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="placed" stroke="hsl(var(--primary))" strokeWidth={2} name="Placement %" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate NIRF Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Faculty Performance Review
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Academic Analytics
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Compliance Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">NAAC Accreditation</span>
                    <Badge className="bg-success">A+</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AICTE Approval</span>
                    <Badge className="bg-success">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">NBA Accreditation</span>
                    <Badge className="bg-warning">Pending</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Student Satisfaction</span>
                    <span className="text-sm font-semibold">4.2/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Faculty-Student Ratio</span>
                    <span className="text-sm font-semibold">1:16</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Research Output</span>
                    <span className="text-sm font-semibold">82 papers</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Department Performance</h3>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{dept.name}</h4>
                        <Badge variant="outline">{dept.students} students</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Faculty:</span>
                          <span className="ml-2 font-medium">{dept.faculty}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ratio:</span>
                          <span className="ml-2 font-medium">1:{dept.ratio}</span>
                        </div>
                      </div>
                      <Progress value={(dept.students / dept.capacity) * 100} className="mt-2" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Academic Calendar</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Current: Semester 6</h4>
                    <p className="text-sm text-blue-700">Mid-term examinations in progress</p>
                    <p className="text-xs text-blue-600">March 15 - March 30, 2024</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Upcoming: Summer Internships</h4>
                    <p className="text-sm text-green-700">Industry placement program</p>
                    <p className="text-xs text-green-600">May 1 - July 31, 2024</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Planning: Semester 7</h4>
                    <p className="text-sm text-purple-700">Course registration opens</p>
                    <p className="text-xs text-purple-600">July 15, 2024</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="placements" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Placement Statistics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="placed" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Package Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="packages" fill="hsl(var(--accent))" name="Average Package (K)" />
                    <Bar dataKey="highest" fill="hsl(var(--success))" name="Highest Package (K)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Research Performance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={researchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="publications" stroke="hsl(var(--primary))" strokeWidth={2} name="Publications" />
                  <Line type="monotone" dataKey="patents" stroke="hsl(var(--secondary))" strokeWidth={2} name="Patents" />
                  <Line type="monotone" dataKey="funding" stroke="hsl(var(--success))" strokeWidth={2} name="Funding (Cr)" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {complianceMetrics.map((metric, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold mb-4">{metric.category} Status</h3>
                  <div className="space-y-3">
                    {metric.category === "NAAC" && (
                      <>
                        <div className="flex justify-between">
                          <span>Grade:</span>
                          <Badge className="bg-success">{metric.status}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Score:</span>
                          <span>{metric.score}/{metric.maxScore}</span>
                        </div>
                        <Progress value={(metric.score! / metric.maxScore!) * 100} />
                      </>
                    )}
                    {metric.category === "NIRF" && (
                      <>
                        <div className="flex justify-between">
                          <span>Rank:</span>
                          <span className="font-semibold">{metric.rank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span>{metric.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Improvement:</span>
                          <Badge className="bg-success">{metric.improvement}</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schemes" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6 lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Government Schemes Management</h3>
                <div className="space-y-6">
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Select Scheme Category</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>All Categories</option>
                        <option>Merit Scholarships</option>
                        <option>Need-based Aid</option>
                        <option>Research Grants</option>
                        <option>Infrastructure Development</option>
                        <option>Skill Development</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Academic Year</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>2024-25</option>
                        <option>2023-24</option>
                        <option>2022-23</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "National Scholarship Portal (NSP)",
                        category: "Merit Scholarship",
                        budget: "₹50,00,000",
                        allocated: "₹45,00,000",
                        utilized: "₹38,50,000",
                        beneficiaries: 320,
                        status: "Active",
                        deadline: "March 31, 2024",
                        criteria: "Family income < ₹2.5 LPA, Min 75% marks",
                        documents: ["Income Certificate", "Marksheet", "Bank Details"],
                        contact: "nsp@education.gov.in"
                      },
                      {
                        name: "Post Matric Scholarship SC/ST",
                        category: "Need-based Aid", 
                        budget: "₹35,00,000",
                        allocated: "₹35,00,000",
                        utilized: "₹28,75,000",
                        beneficiaries: 185,
                        status: "Active",
                        deadline: "April 15, 2024",
                        criteria: "SC/ST category, Family income < ₹2 LPA",
                        documents: ["Caste Certificate", "Income Certificate", "Marksheet"],
                        contact: "pmss@tribal.gov.in"
                      },
                      {
                        name: "INSPIRE Scholarship",
                        category: "Research Grants",
                        budget: "₹25,00,000", 
                        allocated: "₹20,00,000",
                        utilized: "₹15,50,000",
                        beneficiaries: 50,
                        status: "Active",
                        deadline: "May 31, 2024",
                        criteria: "Top 1% in Board exams, Science stream",
                        documents: ["Marksheet", "Research Proposal", "Recommendation Letter"],
                        contact: "inspire@dst.gov.in"
                      },
                      {
                        name: "PMKVY 4.0 - Skill Development",
                        category: "Skill Development",
                        budget: "₹15,00,000",
                        allocated: "₹12,00,000", 
                        utilized: "₹10,80,000",
                        beneficiaries: 120,
                        status: "Ongoing",
                        deadline: "June 30, 2024",
                        criteria: "Age 18-35, Class 10+ pass",
                        documents: ["Age Proof", "Educational Certificate", "Aadhar Card"],
                        contact: "pmkvy@msde.gov.in"
                      }
                    ].map((scheme, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{scheme.name}</h4>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{scheme.category}</Badge>
                              <Badge variant={scheme.status === "Active" ? "default" : "secondary"}>
                                {scheme.status}
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            <FileText className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Total Budget:</span>
                            <div className="font-semibold text-primary">{scheme.budget}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Allocated:</span>
                            <div className="font-semibold text-blue-600">{scheme.allocated}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Utilized:</span>
                            <div className="font-semibold text-green-600">{scheme.utilized}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Beneficiaries:</span>
                            <div className="font-semibold">{scheme.beneficiaries}</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Utilization Progress</span>
                            <span>{((parseFloat(scheme.utilized.replace(/[₹,]/g, '')) / parseFloat(scheme.allocated.replace(/[₹,]/g, ''))) * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={(parseFloat(scheme.utilized.replace(/[₹,]/g, '')) / parseFloat(scheme.allocated.replace(/[₹,]/g, ''))) * 100} />
                        </div>

                        <div className="bg-gray-50 rounded p-3 space-y-2">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="font-medium">Deadline: </span>
                              <span className="text-red-600">{scheme.deadline}</span>
                            </div>
                            <div>
                              <span className="font-medium">Contact: </span>
                              <span className="text-blue-600">{scheme.contact}</span>
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Eligibility: </span>
                            <span>{scheme.criteria}</span>
                          </div>
                          <div>
                            <span className="font-medium">Required Documents: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {scheme.documents.map((doc, docIndex) => (
                                <Badge key={docIndex} variant="outline" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Add Beneficiary
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            View Analytics
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="h-4 w-4 mr-1" />
                            Student List
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Target className="mr-2 h-4 w-4" />
                      Apply New Scheme
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Compliance Check
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Budget Planning
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Add New Beneficiary</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Student ID</label>
                      <input 
                        type="text" 
                        placeholder="Enter Student ID"
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Scheme</label>
                      <select className="w-full p-2 border rounded-md text-sm">
                        <option>Select Scheme</option>
                        <option>NSP Scholarship</option>
                        <option>Post Matric SC/ST</option>
                        <option>INSPIRE</option>
                        <option>PMKVY 4.0</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <input 
                        type="number" 
                        placeholder="Enter amount"
                        className="w-full p-2 border rounded-md text-sm"
                      />
                    </div>
                    <Button size="sm" className="w-full">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Add Beneficiary
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-4">Scheme Analytics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Applications</span>
                      <span className="font-semibold">1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Approved</span>
                      <span className="font-semibold text-green-600">896</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending</span>
                      <span className="font-semibold text-yellow-600">234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rejected</span>
                      <span className="font-semibold text-red-600">110</span>
                    </div>
                    <div className="pt-2">
                      <div className="text-sm mb-2">Approval Rate: 72.3%</div>
                      <Progress value={72.3} />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faculty" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Faculty Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Professors:</span>
                    <span className="font-semibold">45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Associate Professors:</span>
                    <span className="font-semibold">120</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assistant Professors:</span>
                    <span className="font-semibold">155</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Qualifications</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Ph.D Holders:</span>
                    <span className="font-semibold">75%</span>
                  </div>
                  <Progress value={75} />
                  <div className="flex justify-between">
                    <span>Industry Experience:</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <Progress value={40} />
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Avg. Rating:</span>
                    <span className="font-semibold">4.2/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Research Active:</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Training Completed:</span>
                    <span className="font-semibold">92%</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campus" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Campus Infrastructure</h3>
              <MapView locations={campusLocations} center={[28.5449, 77.1925]} zoom={15} />
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Chatbot />
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">AI-Generated Insights</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Performance Trend</h4>
                    <p className="text-sm text-blue-700">Your NIRF ranking has improved by 5 positions. Continue focus on research output.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Strength</h4>
                    <p className="text-sm text-green-700">Placement rates consistently above national average. Excellent industry partnerships.</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">Recommendation</h4>
                    <p className="text-sm text-yellow-700">Increase research funding allocation to boost publication count and patent filings.</p>
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

export default InstitutionDashboard;
