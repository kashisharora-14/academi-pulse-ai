
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, TrendingDown, Award, Users, BookOpen, Building, Star } from 'lucide-react';

const NIRFAnalytics = () => {
  const [selectedInstitution, setSelectedInstitution] = useState('my-college');
  const [comparisonMode, setComparisonMode] = useState(false);

  const institutionData = {
    name: "ABC Institute of Technology",
    nirfRank: 42,
    previousRank: 48,
    category: "Engineering",
    state: "Maharashtra",
    overallScore: 68.7
  };

  const nirfMetrics = {
    teachingLearning: 72.5,
    research: 64.2,
    graduationOutcomes: 75.8,
    outreach: 58.3,
    perception: 69.1
  };

  const comparisonData = [
    { metric: 'Teaching & Learning', myCollege: 72.5, peer1: 78.2, peer2: 69.8, national: 65.4 },
    { metric: 'Research', myCollege: 64.2, peer1: 71.5, peer2: 62.1, national: 58.7 },
    { metric: 'Graduation Outcomes', myCollege: 75.8, peer1: 73.4, peer2: 79.2, national: 70.3 },
    { metric: 'Outreach', myCollege: 58.3, peer1: 62.7, peer2: 55.9, national: 52.1 },
    { metric: 'Perception', myCollege: 69.1, peer1: 74.8, peer2: 67.3, national: 61.9 }
  ];

  const radarData = [
    { subject: 'Teaching', myCollege: 72.5, nationalAvg: 65.4, fullMark: 100 },
    { subject: 'Research', myCollege: 64.2, nationalAvg: 58.7, fullMark: 100 },
    { subject: 'Placements', myCollege: 75.8, nationalAvg: 70.3, fullMark: 100 },
    { subject: 'Outreach', myCollege: 58.3, nationalAvg: 52.1, fullMark: 100 },
    { subject: 'Perception', myCollege: 69.1, nationalAvg: 61.9, fullMark: 100 }
  ];

  const performanceMetrics = [
    { label: 'Faculty-Student Ratio', value: '1:12', benchmark: '1:10', status: 'needs-improvement' },
    { label: 'PhD Faculty %', value: '78%', benchmark: '75%', status: 'good' },
    { label: 'Research Publications', value: '127', benchmark: '150', status: 'needs-improvement' },
    { label: 'Patent Applications', value: '8', benchmark: '15', status: 'poor' },
    { label: 'Industry Collaboration', value: '23', benchmark: '20', status: 'excellent' },
    { label: 'Placement Rate', value: '89%', benchmark: '85%', status: 'good' },
    { label: 'Median Salary (LPA)', value: '7.2', benchmark: '8.0', status: 'needs-improvement' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500 text-white';
      case 'good': return 'bg-blue-500 text-white';
      case 'needs-improvement': return 'bg-yellow-500 text-white';
      case 'poor': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <TrendingDown className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NIRF Analytics Dashboard</h1>
          <p className="text-gray-600">Live NIRF-style ranking and performance analytics</p>
        </div>

        {/* Institution Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{institutionData.name}</CardTitle>
                <CardDescription>{institutionData.category} • {institutionData.state}</CardDescription>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="text-2xl font-bold">#{institutionData.nirfRank}</span>
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+{institutionData.previousRank - institutionData.nirfRank}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">Overall Score: {institutionData.overallScore}</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">NIRF Overview</TabsTrigger>
            <TabsTrigger value="comparison">Peer Comparison</TabsTrigger>
            <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
            <TabsTrigger value="predictions">Performance Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* NIRF Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Teaching & Learning</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{nirfMetrics.teachingLearning}</div>
                  <Progress value={nirfMetrics.teachingLearning} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Research</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{nirfMetrics.research}</div>
                  <Progress value={nirfMetrics.research} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Graduation Outcomes</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{nirfMetrics.graduationOutcomes}</div>
                  <Progress value={nirfMetrics.graduationOutcomes} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Outreach</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{nirfMetrics.outreach}</div>
                  <Progress value={nirfMetrics.outreach} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Perception</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{nirfMetrics.perception}</div>
                  <Progress value={nirfMetrics.perception} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Radar</CardTitle>
                <CardDescription>Your institution vs national average</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Your Institution"
                      dataKey="myCollege"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="National Average"
                      dataKey="nationalAvg"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Peer Comparison</CardTitle>
                <CardDescription>Compare with similar institutions and national average</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="myCollege" fill="#8884d8" name="Your Institution" />
                    <Bar dataKey="peer1" fill="#82ca9d" name="Top Peer" />
                    <Bar dataKey="peer2" fill="#ffc658" name="Similar Peer" />
                    <Bar dataKey="national" fill="#ff7300" name="National Average" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Areas Needing Attention</h4>
                    <p className="text-sm text-red-800">
                      • Research output is 7.3 points below top peer<br/>
                      • Outreach initiatives need significant improvement<br/>
                      • Patent applications are below industry standard
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Strengths</h4>
                    <p className="text-sm text-green-800">
                      • Graduation outcomes above national average<br/>
                      • Strong industry partnerships<br/>
                      • Good faculty-student engagement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Performance Metrics</CardTitle>
                <CardDescription>Comprehensive breakdown of all NIRF parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(metric.status)}
                        <div>
                          <h3 className="font-medium">{metric.label}</h3>
                          <p className="text-sm text-gray-600">Benchmark: {metric.benchmark}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-lg font-bold">{metric.value}</div>
                        </div>
                        <Badge className={getStatusColor(metric.status)}>
                          {metric.status.replace('-', ' ')}
                        </Badge>
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
                <CardTitle>Performance Forecast</CardTitle>
                <CardDescription>AI-powered predictions for next NIRF ranking cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Ranking Prediction</h4>
                    <p className="text-sm text-orange-800 mb-3">
                      If current trends continue, your institution may drop 8-12 places in next NIRF ranking
                    </p>
                    <div className="text-sm text-orange-700">
                      Critical factors: Research publications decline, patent filing gap
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Improvement Opportunities</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Focus on these areas to improve ranking by 5-8 positions:
                    </p>
                    <div className="text-sm text-blue-700">
                      • Increase research collaborations (target: +25 papers)<br/>
                      • File minimum 12 patents this year<br/>
                      • Enhance industry outreach programs<br/>
                      • Improve faculty PhD percentage to 85%
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Quick Wins</h4>
                    <p className="text-sm text-green-800">
                      Low-effort, high-impact improvements for immediate score boost:
                    </p>
                    <div className="text-sm text-green-700 mt-2">
                      • Update faculty profiles with recent publications<br/>
                      • Document ongoing industry projects<br/>
                      • Register students for national competitions<br/>
                      • Enhance alumni network engagement
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

export default NIRFAnalytics;
