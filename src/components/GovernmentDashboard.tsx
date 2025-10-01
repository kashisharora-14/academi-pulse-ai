
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { MapPin, TrendingUp, TrendingDown, Users, BookOpen, Award, AlertTriangle, Star, Building, GraduationCap } from 'lucide-react';

const GovernmentDashboard = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [timeFrame, setTimeFrame] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('overall');

  const policyMetrics = {
    literacyRate: 74.2,
    dropoutRate: 12.8,
    enrollmentGrowth: 8.5,
    schemeAdoption: 67.3,
    ruralFemaleEnrollment: 89.1
  };

  // College/Institution data with geographic coordinates and performance metrics
  const collegeData = [
    {
      id: 1,
      name: "IIT Delhi",
      type: "Engineering",
      state: "Delhi",
      coordinates: { lat: 28.5449, lng: 77.1925 },
      nirfRank: 2,
      overallScore: 88.7,
      dropoutRate: 1.2,
      placementRate: 95,
      researchScore: 92,
      fundingUtilization: 89,
      status: "excellent",
      color: "#10b981" // Green
    },
    {
      id: 2,
      name: "IIT Bombay",
      type: "Engineering",
      state: "Maharashtra",
      coordinates: { lat: 19.1334, lng: 72.9133 },
      nirfRank: 3,
      overallScore: 86.2,
      dropoutRate: 1.5,
      placementRate: 93,
      researchScore: 90,
      fundingUtilization: 87,
      status: "excellent",
      color: "#10b981"
    },
    {
      id: 3,
      name: "IIT Madras",
      type: "Engineering",
      state: "Tamil Nadu",
      coordinates: { lat: 12.9916, lng: 80.2336 },
      nirfRank: 1,
      overallScore: 90.1,
      dropoutRate: 0.8,
      placementRate: 96,
      researchScore: 95,
      fundingUtilization: 91,
      status: "excellent",
      color: "#10b981"
    },
    {
      id: 4,
      name: "Delhi University",
      type: "University",
      state: "Delhi",
      coordinates: { lat: 28.6869, lng: 77.2090 },
      nirfRank: 12,
      overallScore: 68.4,
      dropoutRate: 8.2,
      placementRate: 72,
      researchScore: 65,
      fundingUtilization: 71,
      status: "good",
      color: "#3b82f6"
    },
    {
      id: 5,
      name: "Patna University",
      type: "University",
      state: "Bihar",
      coordinates: { lat: 25.6093, lng: 85.1376 },
      nirfRank: 89,
      overallScore: 42.1,
      dropoutRate: 22.5,
      placementRate: 38,
      researchScore: 32,
      fundingUtilization: 44,
      status: "critical",
      color: "#ef4444"
    },
    {
      id: 6,
      name: "Jadavpur University",
      type: "University",
      state: "West Bengal",
      coordinates: { lat: 22.4991, lng: 88.3705 },
      nirfRank: 8,
      overallScore: 75.3,
      dropoutRate: 5.8,
      placementRate: 78,
      researchScore: 73,
      fundingUtilization: 76,
      status: "good",
      color: "#3b82f6"
    },
    {
      id: 7,
      name: "Anna University",
      type: "Engineering",
      state: "Tamil Nadu",
      coordinates: { lat: 13.0119, lng: 80.2337 },
      nirfRank: 15,
      overallScore: 64.8,
      dropoutRate: 9.1,
      placementRate: 69,
      researchScore: 61,
      fundingUtilization: 67,
      status: "average",
      color: "#f59e0b"
    },
    {
      id: 8,
      name: "Pune University",
      type: "University",
      state: "Maharashtra",
      coordinates: { lat: 18.5645, lng: 73.8143 },
      nirfRank: 28,
      overallScore: 58.2,
      dropoutRate: 12.4,
      placementRate: 62,
      researchScore: 55,
      fundingUtilization: 59,
      status: "average",
      color: "#f59e0b"
    },
    {
      id: 9,
      name: "Rajasthan University",
      type: "University",
      state: "Rajasthan",
      coordinates: { lat: 26.9260, lng: 75.8235 },
      nirfRank: 67,
      overallScore: 46.7,
      dropoutRate: 18.3,
      placementRate: 45,
      researchScore: 41,
      fundingUtilization: 48,
      status: "needs-attention",
      color: "#f97316"
    },
    {
      id: 10,
      name: "Utkal University",
      type: "University",
      state: "Odisha",
      coordinates: { lat: 20.2691, lng: 85.8245 },
      nirfRank: 78,
      overallScore: 41.3,
      dropoutRate: 21.7,
      placementRate: 41,
      researchScore: 35,
      fundingUtilization: 42,
      status: "critical",
      color: "#ef4444"
    }
  ];

  const dropoutHotspots = [
    { district: 'Rural Bihar East', dropoutRate: 24.5, riskLevel: 'critical', colleges: 12 },
    { district: 'Jharkhand Mining Belt', dropoutRate: 21.3, riskLevel: 'high', colleges: 8 },
    { district: 'Odisha Tribal Areas', dropoutRate: 19.8, riskLevel: 'high', colleges: 15 },
    { district: 'UP Eastern Districts', dropoutRate: 17.2, riskLevel: 'medium', colleges: 23 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'average': return 'bg-yellow-500';
      case 'needs-attention': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
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

  const getFilteredColleges = () => {
    let filtered = collegeData;
    if (selectedState !== 'all') {
      filtered = filtered.filter(college => 
        college.state.toLowerCase() === selectedState.toLowerCase()
      );
    }
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Education Control Panel</h1>
          <p className="text-gray-600">Real-time institutional performance mapping and policy decision support</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="tamil nadu">Tamil Nadu</SelectItem>
              <SelectItem value="bihar">Bihar</SelectItem>
              <SelectItem value="west bengal">West Bengal</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
              <SelectItem value="odisha">Odisha</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Performance Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overall">Overall Performance</SelectItem>
              <SelectItem value="dropout">Dropout Rate</SelectItem>
              <SelectItem value="placement">Placement Rate</SelectItem>
              <SelectItem value="research">Research Score</SelectItem>
              <SelectItem value="funding">Funding Utilization</SelectItem>
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

        <Tabs defaultValue="map" className="space-y-6">
          <TabsList>
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="overview">Policy Overview</TabsTrigger>
            <TabsTrigger value="hotspots">Dropout Hotspots</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            {/* Performance Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Institution Performance Map Legend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Excellent (NIRF 1-10)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Good (NIRF 11-30)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Average (NIRF 31-60)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">Needs Attention (NIRF 61-80)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Critical (NIRF 80+)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Map */}
            <Card>
              <CardHeader>
                <CardTitle>National Institution Performance Map</CardTitle>
                <CardDescription>Real-time visualization of college performance across India</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simulated Map with College Markers */}
                <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border overflow-hidden">
                  <div className="absolute inset-0 bg-gray-100 opacity-30"></div>
                  
                  {/* India Map Outline (Simplified) */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600">
                    <path
                      d="M200 150 L600 150 L650 200 L650 450 L550 500 L450 480 L350 500 L250 480 L150 400 L150 200 Z"
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="2"
                      className="opacity-50"
                    />
                  </svg>

                  {/* College Markers */}
                  {getFilteredColleges().map((college) => (
                    <div
                      key={college.id}
                      className="absolute group cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${(college.coordinates.lng - 68) * 8}px`,
                        top: `${(35 - college.coordinates.lat) * 12}px`
                      }}
                    >
                      {/* Marker */}
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg relative z-10"
                        style={{ backgroundColor: college.color }}
                      >
                        <div className="absolute inset-0 rounded-full animate-ping opacity-75"
                             style={{ backgroundColor: college.color }}></div>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border min-w-64 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-blue-500" />
                          <h4 className="font-semibold text-sm">{college.name}</h4>
                        </div>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>NIRF Rank:</span>
                            <span className="font-medium">#{college.nirfRank}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Overall Score:</span>
                            <span className="font-medium">{college.overallScore}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dropout Rate:</span>
                            <span className={`font-medium ${college.dropoutRate > 15 ? 'text-red-600' : 'text-green-600'}`}>
                              {college.dropoutRate}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Placement Rate:</span>
                            <span className="font-medium text-blue-600">{college.placementRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>State:</span>
                            <span className="font-medium">{college.state}</span>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(college.status)} text-white mt-2`}>
                          {college.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Excellent Institutions</p>
                      <p className="text-2xl font-bold text-green-600">
                        {getFilteredColleges().filter(c => c.status === 'excellent').length}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Good Performance</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {getFilteredColleges().filter(c => c.status === 'good').length}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Needs Attention</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {getFilteredColleges().filter(c => c.status === 'needs-attention').length}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Critical Status</p>
                      <p className="text-2xl font-bold text-red-600">
                        {getFilteredColleges().filter(c => c.status === 'critical').length}
                      </p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed College List */}
            <Card>
              <CardHeader>
                <CardTitle>Institution Performance Details</CardTitle>
                <CardDescription>Comprehensive performance metrics for all institutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Institution</th>
                        <th className="text-left p-2">State</th>
                        <th className="text-left p-2">NIRF Rank</th>
                        <th className="text-left p-2">Overall Score</th>
                        <th className="text-left p-2">Dropout Rate</th>
                        <th className="text-left p-2">Placement Rate</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredColleges()
                        .sort((a, b) => a.nirfRank - b.nirfRank)
                        .map((college) => (
                        <tr key={college.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: college.color }}
                              ></div>
                              {college.name}
                            </div>
                          </td>
                          <td className="p-2">{college.state}</td>
                          <td className="p-2">#{college.nirfRank}</td>
                          <td className="p-2">{college.overallScore}</td>
                          <td className="p-2">
                            <span className={college.dropoutRate > 15 ? 'text-red-600' : 'text-green-600'}>
                              {college.dropoutRate}%
                            </span>
                          </td>
                          <td className="p-2">{college.placementRate}%</td>
                          <td className="p-2">
                            <Badge className={getStatusColor(college.status)}>
                              {college.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getRiskColor(hotspot.riskLevel)}>
                              {hotspot.riskLevel} risk
                            </Badge>
                            <span className="text-sm text-gray-600">{hotspot.colleges} institutions</span>
                          </div>
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
                    <h4 className="font-medium text-blue-900 mb-2">Institutional Performance Projection</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Based on current trends, 15 institutions are at risk of NIRF ranking decline
                    </p>
                    <div className="text-sm text-blue-700">
                      • Focus on research output improvement<br/>
                      • Enhance placement support programs<br/>
                      • Increase funding utilization efficiency
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
                    <h4 className="font-medium text-green-900 mb-2">Recommended Interventions</h4>
                    <p className="text-sm text-green-800 mb-3">
                      AI recommends targeted interventions for underperforming institutions
                    </p>
                    <div className="text-sm text-green-700">
                      • Increase faculty training in critical institutions<br/>
                      • Deploy additional resources to red-zone colleges<br/>
                      • Implement mentorship programs for at-risk students
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
