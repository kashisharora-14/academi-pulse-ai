
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
    // Chandigarh Colleges
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
      name: "Chandigarh College of Engineering", 
      position: [30.7506, 76.7647] as [number, number], 
      nirfRank: 156, 
      dropout: 8.7, 
      placement: 65, 
      research: 45, 
      performance: 'average',
      data: "NIRF: 156 | Placement: 65% | Research: 45 | Status: Needs Improvement",
      students: 2100,
      city: "Chandigarh",
      type: "Engineering"
    },
    // Punjab Colleges
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
      name: "Thapar Institute", 
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
    // Poor Performance Examples
    { 
      id: "6", 
      name: "Rural College XYZ", 
      position: [30.2048, 76.9348] as [number, number], 
      nirfRank: 285, 
      dropout: 18.5, 
      placement: 35, 
      research: 25, 
      performance: 'critical',
      data: "NIRF: 285 | Placement: 35% | Research: 25 | Status: Critical - Needs Intervention",
      students: 850,
      city: "Rural Punjab",
      type: "General"
    },
    { 
      id: "7", 
      name: "ABC Technical College", 
      position: [30.1234, 76.8765] as [number, number], 
      nirfRank: 198, 
      dropout: 12.3, 
      placement: 52, 
      research: 38, 
      performance: 'needs-attention',
      data: "NIRF: 198 | Placement: 52% | Research: 38 | Status: Needs Attention",
      students: 1200,
      city: "Ludhiana",
      type: "Technical"
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
        </Tabs>
      </div>
    </div>
  );
};

export default GovernmentDashboard;
