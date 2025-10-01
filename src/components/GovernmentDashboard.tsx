import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { MapPin, TrendingUp, TrendingDown, Users, BookOpen, Award, AlertTriangle, Building2, GraduationCap, Star } from 'lucide-react';
import { MapView } from './MapView';

const GovernmentDashboard = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [timeFrame, setTimeFrame] = useState('6months');

  const policyMetrics = {
    literacyRate: 74.2,
    dropoutRate: 12.8,
    enrollmentGrowth: 8.5,
    schemeAdoption: 67.3,
    ruralFemaleEnrollment: 89.1
  };

  const statePerformance = [
    { state: 'Kerala', literacy: 94.0, dropout: 3.2, status: 'excellent' },
    { state: 'Maharashtra', literacy: 82.3, dropout: 8.1, status: 'good' },
    { state: 'Punjab', literacy: 75.8, dropout: 11.2, status: 'average' },
    { state: 'Bihar', literacy: 61.8, dropout: 18.9, status: 'needs-attention' }
  ];

  const dropoutHotspots = [
    { district: 'Rural Bihar East', dropoutRate: 24.5, riskLevel: 'critical' },
    { district: 'Jharkhand Mining Belt', dropoutRate: 21.3, riskLevel: 'high' },
    { district: 'Odisha Tribal Areas', dropoutRate: 19.8, riskLevel: 'high' },
    { district: 'UP Eastern Districts', dropoutRate: 17.2, riskLevel: 'medium' }
  ];

  const collegePerformanceData = [
    // Chandigarh - Top Performers
    {
      id: "1",
      name: "Punjab Engineering College",
      position: [30.7677, 76.7794] as [number, number],
      nirfRank: 78,
      dropout: 3.2,
      placement: 89,
      research: 72,
      performance: 'excellent',
      data: "NIRF: 78 | Placement: 89% | Research: 72 | Status: Excellent",
      students: 3500,
      city: "Chandigarh",
      type: "Engineering"
    },
    {
      id: "2",
      name: "Panjab University",
      position: [30.7590, 76.7865] as [number, number],
      nirfRank: 95,
      dropout: 4.1,
      placement: 76,
      research: 85,
      performance: 'good',
      data: "NIRF: 95 | Placement: 76% | Research: 85 | Status: Good",
      students: 12000,
      city: "Chandigarh",
      type: "University"
    },
    {
      id: "3",
      name: "Government Medical College",
      position: [30.7465, 76.7850] as [number, number],
      nirfRank: 145,
      dropout: 2.1,
      placement: 94,
      research: 68,
      performance: 'good',
      data: "NIRF: 145 | Placement: 94% | Research: 68 | Status: Good",
      students: 2800,
      city: "Chandigarh",
      type: "Medical"
    },

    // Punjab - Excellent Institutions
    {
      id: "4",
      name: "IIT Ropar",
      position: [30.9675, 76.4748] as [number, number],
      nirfRank: 31,
      dropout: 1.8,
      placement: 95,
      research: 92,
      performance: 'excellent',
      data: "NIRF: 31 | Placement: 95% | Research: 92 | Status: Top Tier",
      students: 1800,
      city: "Rupnagar",
      type: "IIT"
    },
    {
      id: "5",
      name: "Thapar Institute of Engineering",
      position: [30.3548, 76.3621] as [number, number],
      nirfRank: 42,
      dropout: 2.5,
      placement: 91,
      research: 78,
      performance: 'excellent',
      data: "NIRF: 42 | Placement: 91% | Research: 78 | Status: Excellent",
      students: 4200,
      city: "Patiala",
      type: "Engineering"
    },
    {
      id: "6",
      name: "NIT Jalandhar",
      position: [31.3260, 75.5762] as [number, number],
      nirfRank: 52,
      dropout: 3.8,
      placement: 87,
      research: 74,
      performance: 'excellent',
      data: "NIRF: 52 | Placement: 87% | Research: 74 | Status: Excellent",
      students: 3600,
      city: "Jalandhar",
      type: "NIT"
    },

    // Punjab - Good Performers
    {
      id: "7",
      name: "Punjab Agricultural University",
      position: [30.9010, 75.8573] as [number, number],
      nirfRank: 89,
      dropout: 5.2,
      placement: 79,
      research: 81,
      performance: 'good',
      data: "NIRF: 89 | Placement: 79% | Research: 81 | Status: Good",
      students: 5200,
      city: "Ludhiana",
      type: "Agricultural"
    },
    {
      id: "8",
      name: "Guru Nanak Dev University",
      position: [31.6340, 74.8723] as [number, number],
      nirfRank: 112,
      dropout: 6.8,
      placement: 71,
      research: 65,
      performance: 'good',
      data: "NIRF: 112 | Placement: 71% | Research: 65 | Status: Good",
      students: 8500,
      city: "Amritsar",
      type: "University"
    },

    // Average Performers - Need Monitoring
    {
      id: "9",
      name: "Chandigarh College of Engineering",
      position: [30.7506, 76.7647] as [number, number],
      nirfRank: 156,
      dropout: 8.7,
      placement: 65,
      research: 45,
      performance: 'average',
      data: "NIRF: 156 | Placement: 65% | Research: 45 | Status: Average",
      students: 2100,
      city: "Chandigarh",
      type: "Engineering"
    },
    {
      id: "10",
      name: "Punjab Technical University",
      position: [31.2560, 75.7047] as [number, number],
      nirfRank: 167,
      dropout: 9.5,
      placement: 62,
      research: 42,
      performance: 'average',
      data: "NIRF: 167 | Placement: 62% | Research: 42 | Status: Average",
      students: 6800,
      city: "Kapurthala",
      type: "Technical"
    },

    // Needs Attention - Government Focus Required
    {
      id: "11",
      name: "Government Polytechnic Ludhiana",
      position: [30.9000, 75.8500] as [number, number],
      nirfRank: 198,
      dropout: 12.3,
      placement: 52,
      research: 38,
      performance: 'needs-attention',
      data: "NIRF: 198 | Placement: 52% | Research: 38 | Status: Needs Attention",
      students: 1200,
      city: "Ludhiana",
      type: "Polytechnic"
    },
    {
      id: "12",
      name: "Regional College Jalandhar",
      position: [31.3200, 75.5800] as [number, number],
      nirfRank: 215,
      dropout: 14.1,
      placement: 48,
      research: 35,
      performance: 'needs-attention',
      data: "NIRF: 215 | Placement: 48% | Research: 35 | Status: Needs Attention",
      students: 1850,
      city: "Jalandhar",
      type: "General"
    },

    // Critical - Immediate Intervention Required
    {
      id: "13",
      name: "Rural Technical Institute",
      position: [30.2048, 76.9348] as [number, number],
      nirfRank: 285,
      dropout: 18.5,
      placement: 35,
      research: 25,
      performance: 'critical',
      data: "NIRF: 285 | Placement: 35% | Research: 25 | Status: Critical",
      students: 850,
      city: "Moga",
      type: "Technical"
    },
    {
      id: "14",
      name: "District College Bathinda",
      position: [30.2100, 74.9455] as [number, number],
      nirfRank: 312,
      dropout: 21.8,
      placement: 28,
      research: 22,
      performance: 'critical',
      data: "NIRF: 312 | Placement: 28% | Research: 22 | Status: Critical",
      students: 1100,
      city: "Bathinda",
      type: "General"
    },
    {
      id: "15",
      name: "Sangrur Polytechnic",
      position: [30.2458, 75.8421] as [number, number],
      nirfRank: 298,
      dropout: 19.2,
      placement: 31,
      research: 18,
      performance: 'critical',
      data: "NIRF: 298 | Placement: 31% | Research: 18 | Status: Critical",
      students: 920,
      city: "Sangrur",
      type: "Polytechnic"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'average': return 'bg-yellow-500';
      case 'needs-attention': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Education Dashboard</h1>
          <p className="text-gray-600">Real-time insights on education policies and national performance</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="kerala">Kerala</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="punjab">Punjab</SelectItem>
              <SelectItem value="bihar">Bihar</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="3years">Last 3 Years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Policy Overview</TabsTrigger>
            <TabsTrigger value="performance">State Performance</TabsTrigger>
            <TabsTrigger value="map">College Performance Map</TabsTrigger>
            <TabsTrigger value="hotspots">Dropout Hotspots</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Literacy Rate</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{policyMetrics.literacyRate}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2.3% from last year
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Dropout Rate</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{policyMetrics.dropoutRate}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -1.8% from last year
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Enrollment Growth</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{policyMetrics.enrollmentGrowth}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Target: 10%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Scheme Adoption</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{policyMetrics.schemeAdoption}%</div>
                  <div className="flex items-center text-xs text-blue-600">
                    Active schemes: 47
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rural Female Enrollment</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{policyMetrics.ruralFemaleEnrollment}%</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +4.7% from last year
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Policy Impact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Policy Impact Analysis</CardTitle>
                <CardDescription>Impact of education policies in the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">PM-USHA Scholarship Program</p>
                      <p className="text-sm text-gray-600">Rural female students in Punjab</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+12,847 beneficiaries</p>
                      <p className="text-sm text-gray-600">89% increase in applications</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Digital India Initiative</p>
                      <p className="text-sm text-gray-600">Online learning platform adoption</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">2.3M active users</p>
                      <p className="text-sm text-gray-600">45% from rural areas</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mid-Day Meal Enhancement</p>
                      <p className="text-sm text-gray-600">Attendance improvement program</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">+8.5% attendance</p>
                      <p className="text-sm text-gray-600">Across 15 states</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>State-wise Performance Ranking</CardTitle>
                <CardDescription>Literacy and dropout metrics by state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statePerformance.map((state, index) => (
                    <div key={state.state} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="text-lg font-bold text-gray-500">#{index + 1}</div>
                        <div>
                          <h3 className="font-medium">{state.state}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getStatusColor(state.status)}>{state.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Literacy: {state.literacy}%</div>
                        <div className="text-sm text-gray-600">Dropout: {state.dropout}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            {/* Performance Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Institutions</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{collegePerformanceData.length}</div>
                  <div className="text-xs text-muted-foreground">
                    Tracked on map
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {collegePerformanceData.filter(c => c.performance === 'excellent').length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Excellent rating
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {collegePerformanceData.filter(c => c.performance === 'critical' || c.performance === 'needs-attention').length}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Require intervention
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Placement</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(collegePerformanceData.reduce((acc, c) => acc + c.placement, 0) / collegePerformanceData.length)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Across all institutions
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  College Performance Map - Punjab & Chandigarh Region
                </CardTitle>
                <CardDescription>
                  Real-time visualization of college performance metrics. Red markers indicate poor performance requiring intervention.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Excellent (NIRF &lt; 50, Placement &gt; 85%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Good (NIRF &lt; 100, Placement &gt; 70%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Average (NIRF &lt; 150, Placement &gt; 50%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Critical (Needs Intervention)</span>
                    </div>
                  </div>
                </div>
                <MapView
                  locations={collegePerformanceData}
                  center={[30.7677, 76.7794]}
                  zoom={8}
                />
              </CardContent>
            </Card>

            {/* Detailed College List */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed College Performance Analysis</CardTitle>
                <CardDescription>
                  Comprehensive breakdown of institutional metrics and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collegePerformanceData.map((college) => (
                    <div key={college.id} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            college.performance === 'excellent' ? 'bg-green-500' :
                            college.performance === 'good' ? 'bg-blue-500' :
                            college.performance === 'average' ? 'bg-yellow-500' :
                            college.performance === 'needs-attention' ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}></div>
                          <div>
                            <h3 className="font-medium">{college.name}</h3>
                            <p className="text-sm text-gray-600">{college.city} • {college.type} • {college.students} students</p>
                          </div>
                        </div>
                        <Badge className={
                          college.performance === 'excellent' ? 'bg-green-500' :
                          college.performance === 'good' ? 'bg-blue-500' :
                          college.performance === 'average' ? 'bg-yellow-500' :
                          college.performance === 'needs-attention' ? 'bg-orange-500' :
                          'bg-red-500'
                        }>
                          {college.performance === 'needs-attention' ? 'needs attention' : college.performance}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold">#{college.nirfRank}</div>
                          <div className="text-xs text-gray-600">NIRF Rank</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold">{college.placement}%</div>
                          <div className="text-xs text-gray-600">Placement Rate</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold">{college.research}</div>
                          <div className="text-xs text-gray-600">Research Score</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-lg font-bold">{college.dropout}%</div>
                          <div className="text-xs text-gray-600">Dropout Rate</div>
                        </div>
                      </div>

                      {college.performance === 'critical' && (
                        <div className="mt-3 p-3 bg-red-50 rounded-lg">
                          <h4 className="font-medium text-red-900 mb-1">Immediate Action Required</h4>
                          <p className="text-sm text-red-800">
                            High dropout rate and low placement statistics. Recommend:
                            • Enhanced placement cell • Faculty training programs • Infrastructure upgrade
                          </p>
                          <Button size="sm" className="mt-2 bg-red-600">
                            Schedule Intervention
                          </Button>
                        </div>
                      )}

                      {college.performance === 'needs-attention' && (
                        <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                          <h4 className="font-medium text-orange-900 mb-1">Improvement Needed</h4>
                          <p className="text-sm text-orange-800">
                            Focus on placement rates and research output. Consider industry partnerships.
                          </p>
                        </div>
                      )}

                      {college.performance === 'excellent' && (
                        <div className="mt-3 p-3 bg-green-50 rounded-lg">
                          <h4 className="font-medium text-green-900 mb-1">Best Practices</h4>
                          <p className="text-sm text-green-800">
                            Exemplary performance. Share best practices with other institutions.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hotspots" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dropout Hotspots</CardTitle>
                <CardDescription>Districts requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dropoutHotspots.map((hotspot, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <MapPin className="h-5 w-5 text-red-500" />
                        <div>
                          <h3 className="font-medium">{hotspot.district}</h3>
                          <Badge className={getRiskColor(hotspot.riskLevel)}>
                            {hotspot.riskLevel} risk
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-600">{hotspot.dropoutRate}%</div>
                        <div className="text-sm text-gray-600">dropout rate</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Predictions</CardTitle>
                <CardDescription>Machine learning insights and forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Literacy Projection</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      If current trends continue, Punjab literacy rate will reach 78.2% by 2025
                    </p>
                    <Progress value={76} className="h-2" />
                    <div className="flex justify-between text-xs text-blue-600 mt-1">
                      <span>Current: 75.8%</span>
                      <span>Target: 80%</span>
                    </div>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Dropout Risk Alert</h4>
                    <p className="text-sm text-orange-800 mb-3">
                      23,456 students identified as high dropout risk in next 6 months
                    </p>
                    <div className="text-sm text-orange-700">
                      • 65% from rural areas<br/>
                      • 58% female students<br/>
                      • Primary factors: Economic stress, family migration
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Scheme Optimization</h4>
                    <p className="text-sm text-green-800 mb-3">
                      AI recommends targeting scholarship programs in 12 specific districts
                    </p>
                    <div className="text-sm text-green-700">
                      Expected impact: +15,000 beneficiaries, 18% dropout reduction
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Top Performing States */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Top Performing States - Education Excellence Dashboard
              </CardTitle>
              <CardDescription>
                Comprehensive state-wise education performance with detailed analytics and government insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="ranking" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="ranking">State Rankings</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed Metrics</TabsTrigger>
                  <TabsTrigger value="comparison">Compare States</TabsTrigger>
                  <TabsTrigger value="trends">Performance Trends</TabsTrigger>
                </TabsList>

                <TabsContent value="ranking" className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      🏆 National Education Performance Rankings
                      <Badge variant="outline" className="bg-blue-50">Updated: Real-time</Badge>
                    </h3>
                    <div className="grid gap-4">
                      {[
                        {
                          state: "Kerala",
                          score: 92,
                          rank: 1,
                          trend: "up",
                          literacy: 94.0,
                          nirfCount: 8,
                          dropout: 2.1,
                          funding: "₹15,240 Cr",
                          institutions: 2847,
                          highlight: "National Leader",
                          bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
                          borderColor: "border-green-500"
                        },
                        {
                          state: "Tamil Nadu",
                          score: 88,
                          rank: 2,
                          trend: "up",
                          literacy: 80.1,
                          nirfCount: 12,
                          dropout: 4.2,
                          funding: "₹18,650 Cr",
                          institutions: 3421,
                          highlight: "Strong Industrial Connect",
                          bgColor: "bg-gradient-to-r from-blue-50 to-cyan-50",
                          borderColor: "border-blue-500"
                        },
                        {
                          state: "Karnataka",
                          score: 85,
                          rank: 3,
                          trend: "stable",
                          literacy: 75.4,
                          nirfCount: 15,
                          dropout: 6.8,
                          funding: "₹16,890 Cr",
                          institutions: 2987,
                          highlight: "Tech Education Hub",
                          bgColor: "bg-gradient-to-r from-purple-50 to-indigo-50",
                          borderColor: "border-purple-500"
                        },
                        {
                          state: "Gujarat",
                          score: 82,
                          rank: 4,
                          trend: "down",
                          literacy: 78.0,
                          nirfCount: 6,
                          dropout: 8.1,
                          funding: "₹12,340 Cr",
                          institutions: 2156,
                          highlight: "Business Education Focus",
                          bgColor: "bg-gradient-to-r from-orange-50 to-amber-50",
                          borderColor: "border-orange-500"
                        },
                        {
                          state: "Maharashtra",
                          score: 80,
                          rank: 5,
                          trend: "up",
                          literacy: 82.3,
                          nirfCount: 18,
                          dropout: 7.5,
                          funding: "₹22,180 Cr",
                          institutions: 4512,
                          highlight: "Largest Higher Ed Network",
                          bgColor: "bg-gradient-to-r from-red-50 to-pink-50",
                          borderColor: "border-red-500"
                        }
                      ].map((state, index) => (
                        <div key={state.state} className={`${state.bgColor} border-l-4 ${state.borderColor} rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 ${state.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                                               state.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                                               state.rank === 3 ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                                               'bg-gradient-to-r from-blue-500 to-blue-600'}
                                              rounded-full flex items-center justify-center shadow-md`}>
                                <span className="text-lg font-bold text-white">#{state.rank}</span>
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-xl font-bold text-gray-900">{state.state}</h4>
                                  <Badge variant="secondary" className={`${state.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                                                                           state.rank <= 3 ? 'bg-green-100 text-green-800' :
                                                                           'bg-blue-100 text-blue-800'}`}>
                                    {state.highlight}
                                  </Badge>
                                </div>
                                <div className="text-sm text-gray-600">Performance Score: {state.score}/100</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="flex items-center gap-1 mb-1">
                                  {state.trend === "up" && <TrendingUp className="h-5 w-5 text-green-500" />}
                                  {state.trend === "down" && <TrendingDown className="h-5 w-5 text-red-500" />}
                                  {state.trend === "stable" && <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>}
                                  <span className={`text-sm font-medium ${
                                    state.trend === "up" ? "text-green-600" :
                                    state.trend === "down" ? "text-red-600" : "text-yellow-600"
                                  }`}>
                                    {state.trend === "up" ? "Rising" : state.trend === "down" ? "Declining" : "Stable"}
                                  </span>
                                </div>
                                <Progress value={state.score} className="w-24 h-2" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-200">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">{state.literacy}%</div>
                              <div className="text-xs text-gray-500">Literacy Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600">{state.nirfCount}</div>
                              <div className="text-xs text-gray-500">NIRF Ranked</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{state.institutions.toLocaleString()}</div>
                              <div className="text-xs text-gray-500">Institutions</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${state.dropout < 5 ? 'text-green-600' : state.dropout < 8 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {state.dropout}%
                              </div>
                              <div className="text-xs text-gray-500">Dropout Rate</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-indigo-600">{state.funding}</div>
                              <div className="text-xs text-gray-500">Annual Budget</div>
                            </div>
                          </div>

                          {/* Government Action Indicators */}
                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-600">Ministry Status: Active Monitoring</span>
                              </div>
                              <div className="flex gap-2">
                                {state.rank <= 2 && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Exemplary</Badge>}
                                {state.rank === 3 && <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Stable</Badge>}
                                {state.rank > 3 && state.trend === "down" && <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Watch List</Badge>}
                                {state.nirfCount > 10 && <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Research Leader</Badge>}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                          Literacy Excellence
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Kerala</span>
                            <span className="font-bold text-blue-600">94.0%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Maharashtra</span>
                            <span className="font-bold text-blue-600">82.3%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Tamil Nadu</span>
                            <span className="font-bold text-blue-600">80.1%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Star className="h-5 w-5 text-green-600" />
                          NIRF Champions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Maharashtra</span>
                            <span className="font-bold text-green-600">18 Institutes</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Karnataka</span>
                            <span className="font-bold text-green-600">15 Institutes</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Tamil Nadu</span>
                            <span className="font-bold text-green-600">12 Institutes</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-purple-600" />
                          Infrastructure Scale
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Maharashtra</span>
                            <span className="font-bold text-purple-600">4,512</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Tamil Nadu</span>
                            <span className="font-bold text-purple-600">3,421</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Karnataka</span>
                            <span className="font-bold text-purple-600">2,987</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gradient-to-r from-orange-50 via-white to-green-50 border-l-4 border-orange-500">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        🏛️ Government Action Dashboard
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-100 rounded-lg">
                          <div className="text-2xl font-bold text-green-700">₹84,300 Cr</div>
                          <div className="text-sm text-green-600">Total Annual Education Budget</div>
                          <div className="text-xs text-gray-500 mt-1">Across Top 5 States</div>
                        </div>
                        <div className="text-center p-4 bg-blue-100 rounded-lg">
                          <div className="text-2xl font-bold text-blue-700">15,923</div>
                          <div className="text-sm text-blue-600">Higher Education Institutions</div>
                          <div className="text-xs text-gray-500 mt-1">Combined Network</div>
                        </div>
                        <div className="text-center p-4 bg-purple-100 rounded-lg">
                          <div className="text-2xl font-bold text-purple-700">5.7%</div>
                          <div className="text-sm text-purple-600">Average Dropout Rate</div>
                          <div className="text-xs text-gray-500 mt-1">Target: &lt;5% by 2025</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comparison" className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Comparative State Analysis</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left p-3 font-semibold">State</th>
                            <th className="text-center p-3 font-semibold">Overall Score</th>
                            <th className="text-center p-3 font-semibold">Literacy %</th>
                            <th className="text-center p-3 font-semibold">NIRF Count</th>
                            <th className="text-center p-3 font-semibold">Dropout %</th>
                            <th className="text-center p-3 font-semibold">Budget (Cr)</th>
                            <th className="text-center p-3 font-semibold">Gov Priority</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { state: "Kerala", score: 92, literacy: 94.0, nirf: 8, dropout: 2.1, budget: "15,240", priority: "Showcase" },
                            { state: "Tamil Nadu", score: 88, literacy: 80.1, nirf: 12, dropout: 4.2, budget: "18,650", priority: "Support" },
                            { state: "Karnataka", score: 85, literacy: 75.4, nirf: 15, dropout: 6.8, budget: "16,890", priority: "Monitor" },
                            { state: "Gujarat", score: 82, literacy: 78.0, nirf: 6, dropout: 8.1, budget: "12,340", priority: "Improve" },
                            { state: "Maharashtra", score: 80, literacy: 82.3, nirf: 18, dropout: 7.5, budget: "22,180", priority: "Scale" }
                          ].map((row, index) => (
                            <tr key={row.state} className="border-b border-gray-100 hover:bg-white/50">
                              <td className="p-3 font-medium">{row.state}</td>
                              <td className="p-3 text-center">
                                <span className={`font-bold ${
                                  row.score >= 90 ? 'text-green-600' :
                                  row.score >= 85 ? 'text-blue-600' :
                                  row.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                                }`}>{row.score}</span>
                              </td>
                              <td className="p-3 text-center">{row.literacy}%</td>
                              <td className="p-3 text-center text-green-600 font-semibold">{row.nirf}</td>
                              <td className="p-3 text-center">
                                <span className={row.dropout < 5 ? 'text-green-600' : row.dropout < 8 ? 'text-yellow-600' : 'text-red-600'}>
                                  {row.dropout}%
                                </span>
                              </td>
                              <td className="p-3 text-center">₹{row.budget}</td>
                              <td className="p-3 text-center">
                                <Badge variant="outline" className={
                                  row.priority === "Showcase" ? "bg-green-50 text-green-700 border-green-200" :
                                  row.priority === "Support" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                  row.priority === "Monitor" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                  row.priority === "Improve" ? "bg-orange-50 text-orange-700 border-orange-200" :
                                  "bg-purple-50 text-purple-700 border-purple-200"
                                }>
                                  {row.priority}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="trends" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Performance Trajectory</CardTitle>
                        <CardDescription>5-Year trend analysis</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { state: "Kerala", trend: [88, 89, 90, 91, 92], change: "+4", color: "green" },
                            { state: "Tamil Nadu", trend: [84, 85, 86, 87, 88], change: "+4", color: "green" },
                            { state: "Karnataka", trend: [83, 84, 85, 85, 85], change: "+2", color: "blue" },
                            { state: "Gujarat", trend: [85, 84, 83, 83, 82], change: "-3", color: "red" },
                            { state: "Maharashtra", trend: [78, 78, 79, 79, 80], change: "+2", color: "blue" }
                          ].map((state, index) => (
                            <div key={state.state} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex-1">
                                <div className="font-medium">{state.state}</div>
                                <div className="flex items-center gap-1 mt-1">
                                  {state.trend.map((score, i) => (
                                    <div key={i} className={`h-2 w-8 rounded ${
                                      state.color === 'green' ? 'bg-green-400' :
                                      state.color === 'blue' ? 'bg-blue-400' : 'bg-red-400'
                                    }`} style={{opacity: 0.4 + (i * 0.15)}}></div>
                                  ))}
                                </div>
                              </div>
                              <div className={`text-sm font-bold ${
                                state.color === 'green' ? 'text-green-600' :
                                state.color === 'blue' ? 'text-blue-600' : 'text-red-600'
                              }`}>
                                {state.change}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Government Focus Areas</CardTitle>
                        <CardDescription>Priority interventions by state</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
                            <h4 className="font-semibold text-green-900">Kerala - Best Practice Model</h4>
                            <p className="text-sm text-green-700">Document and replicate successful strategies nationally</p>
                          </div>
                          <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                            <h4 className="font-semibold text-blue-900">Tamil Nadu - Industry Integration</h4>
                            <p className="text-sm text-blue-700">Strengthen industry-academia partnerships</p>
                          </div>
                          <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                            <h4 className="font-semibold text-purple-900">Karnataka - Tech Innovation</h4>
                            <p className="text-sm text-purple-700">Digital education infrastructure expansion</p>
                          </div>
                          <div className="p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                            <h4 className="font-semibold text-orange-900">Gujarat - Dropout Prevention</h4>
                            <p className="text-sm text-orange-700">Implement targeted retention programs</p>
                          </div>
                          <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded">
                            <h4 className="font-semibold text-red-900">Maharashtra - Quality Assurance</h4>
                            <p className="text-sm text-red-700">Focus on improving quality across large network</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentDashboard;