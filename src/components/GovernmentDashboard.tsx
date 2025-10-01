
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { MapPin, TrendingUp, TrendingDown, Users, BookOpen, Award, AlertTriangle } from 'lucide-react';

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
