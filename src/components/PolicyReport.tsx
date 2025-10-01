import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, Download, TrendingUp, TrendingDown, Users, GraduationCap, DollarSign, MapPin, Search, Calendar, Filter, Sparkles } from 'lucide-react';
import { parseQuery, filterData, aggregateData, generateInsights } from './PolicyReportData';

// Sample data for policy reports (preserved for charts)
const literacyData = [
  { year: '2020', overall: 72, rural: 65, urban: 85, male: 78, female: 66 },
  { year: '2021', overall: 74, rural: 67, urban: 86, male: 80, female: 68 },
  { year: '2022', overall: 76, rural: 70, urban: 88, male: 82, female: 70 },
  { year: '2023', overall: 78, rural: 72, urban: 89, male: 84, female: 72 },
  { year: '2024', overall: 80, rural: 75, urban: 90, male: 85, female: 75 },
];

const dropoutData = [
  { year: '2020', primary: 4.5, secondary: 12.8, higher: 18.2 },
  { year: '2021', primary: 4.2, secondary: 11.5, higher: 16.8 },
  { year: '2022', primary: 3.8, secondary: 10.2, higher: 15.5 },
  { year: '2023', primary: 3.5, secondary: 9.8, higher: 14.2 },
  { year: '2024', primary: 3.2, secondary: 9.2, higher: 13.5 },
];

const schemeAdoptionData = [
  { scheme: 'PM-YASASVI', beneficiaries: 125000, budget: 500, utilization: 92 },
  { scheme: 'NSP 2.0', beneficiaries: 450000, budget: 2800, utilization: 88 },
  { scheme: 'PMKVY 4.0', beneficiaries: 280000, budget: 1200, utilization: 95 },
  { scheme: 'Mid-Day Meal', beneficiaries: 8500000, budget: 12000, utilization: 97 },
  { scheme: 'Samagra Shiksha', beneficiaries: 6200000, budget: 37383, utilization: 85 },
];

const enrollmentData = [
  { category: 'Rural Female', count: 12500000, growth: 8.5 },
  { category: 'Rural Male', count: 13200000, growth: 6.2 },
  { category: 'Urban Female', count: 8300000, growth: 5.8 },
  { category: 'Urban Male', count: 8800000, growth: 4.5 },
  { category: 'SC/ST', count: 9500000, growth: 12.3 },
  { category: 'OBC', count: 15800000, growth: 7.8 },
];

const statePerformanceData = [
  { state: 'Kerala', literacy: 96, dropout: 2.1, enrollment: 98, score: 95 },
  { state: 'Delhi', literacy: 88, dropout: 8.5, enrollment: 95, score: 88 },
  { state: 'Maharashtra', literacy: 84, dropout: 9.2, enrollment: 92, score: 85 },
  { state: 'Tamil Nadu', literacy: 82, dropout: 10.5, enrollment: 90, score: 83 },
  { state: 'Punjab', literacy: 80, dropout: 11.8, enrollment: 88, score: 80 },
  { state: 'Bihar', literacy: 70, dropout: 18.5, enrollment: 78, score: 65 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function PolicyReport() {
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedScheme, setSelectedScheme] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('2024');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [queryResult, setQueryResult] = useState<any>(null);
  const [activeInsights, setActiveInsights] = useState<string[]>([]);
  const [queryConfidence, setQueryConfidence] = useState<number>(0);

  // Parse query and update filters
  const handleGenerateReport = () => {
    if (searchQuery.trim()) {
      // Parse natural language query
      const parsed = parseQuery(searchQuery);
      setQueryConfidence(parsed.confidence);
      
      // Apply parsed filters, don't pass 'all' - use undefined instead
      const filters = {
        state: parsed.state || (selectedState !== 'all' ? selectedState : undefined),
        scheme: parsed.scheme || (selectedScheme !== 'all' ? selectedScheme : undefined),
        year: parsed.year || selectedYear,
        gender: parsed.gender,
        locality: parsed.locality,
      };
      
      // Filter and aggregate data
      const filteredData = filterData(filters);
      const aggregated = aggregateData(filteredData);
      const insights = generateInsights(filteredData, filters);
      
      setQueryResult({ filters, aggregated, recordCount: filteredData.length });
      setActiveInsights(insights);
      
      // Update filter dropdowns if query specified them
      if (parsed.state) setSelectedState(parsed.state);
      if (parsed.scheme) setSelectedScheme(parsed.scheme);
      if (parsed.year) setSelectedYear(parsed.year);
    } else {
      // Use manual filters (don't pass 'all')
      const filters = {
        state: selectedState !== 'all' ? selectedState : undefined,
        scheme: selectedScheme !== 'all' ? selectedScheme : undefined,
        year: selectedYear !== 'all' ? selectedYear : undefined,
      };
      
      const filteredData = filterData(filters);
      const aggregated = aggregateData(filteredData);
      const insights = generateInsights(filteredData, filters);
      
      setQueryResult({ filters, aggregated, recordCount: filteredData.length });
      setActiveInsights(insights);
      setQueryConfidence(100);
    }
  };

  // Auto-generate on filter change
  useEffect(() => {
    if (!searchQuery) {
      handleGenerateReport();
    }
  }, [selectedState, selectedScheme, selectedYear]);

  // Initial load
  useEffect(() => {
    handleGenerateReport();
  }, []);

  const handleExportPDF = () => {
    console.log('Exporting as PDF');
  };

  const handleExportExcel = () => {
    console.log('Exporting as Excel');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Policy Impact Report</h2>
          <p className="text-slate-600 mt-1">Auto-generated insights on education policies' impact</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button onClick={handleExportExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Ask a question: e.g., How many rural female students benefited from NSP in Punjab?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="punjab">Punjab</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="kerala">Kerala</SelectItem>
              <SelectItem value="maharashtra">Maharashtra</SelectItem>
              <SelectItem value="bihar">Bihar</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedScheme} onValueChange={setSelectedScheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Schemes</SelectItem>
              <SelectItem value="nsp">NSP 2.0</SelectItem>
              <SelectItem value="pmkvy">PMKVY 4.0</SelectItem>
              <SelectItem value="yasasvi">PM-YASASVI</SelectItem>
              <SelectItem value="midday">Mid-Day Meal</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleGenerateReport}>
            <Search className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <Badge className="bg-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8%
            </Badge>
          </div>
          <div className="text-3xl font-bold text-blue-900">80.2%</div>
          <div className="text-sm text-blue-700 mt-1">National Literacy Rate</div>
          <div className="text-xs text-blue-600 mt-2">Target: 85% by 2025</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-green-600" />
            <Badge className="bg-green-500">
              <TrendingDown className="h-3 w-3 mr-1" />
              -29%
            </Badge>
          </div>
          <div className="text-3xl font-bold text-green-900">8.6%</div>
          <div className="text-sm text-green-700 mt-1">Avg. Dropout Rate</div>
          <div className="text-xs text-green-600 mt-2">Down from 12.1% in 2020</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-orange-600" />
            <Badge className="bg-blue-500">91%</Badge>
          </div>
          <div className="text-3xl font-bold text-orange-900">₹53,883Cr</div>
          <div className="text-sm text-orange-700 mt-1">Scheme Budget Utilization</div>
          <div className="text-xs text-orange-600 mt-2">Across 125+ schemes</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <MapPin className="h-8 w-8 text-purple-600" />
            <Badge className="bg-green-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              +7.5%
            </Badge>
          </div>
          <div className="text-3xl font-bold text-purple-900">68.5M</div>
          <div className="text-sm text-purple-700 mt-1">Total Enrollment</div>
          <div className="text-xs text-purple-600 mt-2">Including 35M rural students</div>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="literacy" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="literacy">Literacy Trends</TabsTrigger>
          <TabsTrigger value="dropout">Dropout Analysis</TabsTrigger>
          <TabsTrigger value="schemes">Scheme Adoption</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment Growth</TabsTrigger>
          <TabsTrigger value="states">State Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="literacy">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Literacy Rate Trends (2020-2024)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={literacyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="overall" stroke="#8884d8" strokeWidth={2} name="Overall" />
                <Line type="monotone" dataKey="rural" stroke="#82ca9d" strokeWidth={2} name="Rural" />
                <Line type="monotone" dataKey="urban" stroke="#ffc658" strokeWidth={2} name="Urban" />
                <Line type="monotone" dataKey="male" stroke="#ff7c7c" strokeWidth={2} name="Male" />
                <Line type="monotone" dataKey="female" stroke="#a78bfa" strokeWidth={2} name="Female" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Key Insight:</strong> Rural female literacy has grown by 10 percentage points (65% → 75%) in 5 years, 
                outpacing urban growth. This indicates successful implementation of targeted schemes like Beti Bachao Beti Padhao.
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="dropout">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Dropout Rate Analysis by Education Level</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dropoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="primary" fill="#10b981" name="Primary (1-5)" />
                <Bar dataKey="secondary" fill="#f59e0b" name="Secondary (6-10)" />
                <Bar dataKey="higher" fill="#ef4444" name="Higher Secondary (11-12)" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">-29%</div>
                <div className="text-sm text-green-600">Primary Dropout Reduction</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-700">-28%</div>
                <div className="text-sm text-orange-600">Secondary Dropout Reduction</div>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-700">-26%</div>
                <div className="text-sm text-red-600">Higher Secondary Reduction</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schemes">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Government Scheme Adoption & Budget Utilization</h3>
            <div className="space-y-4">
              {schemeAdoptionData.map((scheme, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{scheme.scheme}</h4>
                      <p className="text-sm text-slate-600">
                        {scheme.beneficiaries.toLocaleString()} beneficiaries | ₹{scheme.budget}Cr budget
                      </p>
                    </div>
                    <Badge className={scheme.utilization >= 90 ? 'bg-green-500' : 'bg-orange-500'}>
                      {scheme.utilization}% Utilized
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${scheme.utilization >= 90 ? 'bg-green-500' : 'bg-orange-500'}`}
                      style={{ width: `${scheme.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="enrollment">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Enrollment Growth by Category (2024)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={enrollmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.category}: ${(entry.count / 1000000).toFixed(1)}M`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {enrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {enrollmentData.map((category, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{category.category}</span>
                      </div>
                      <Badge className="bg-blue-500">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{category.growth}%
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600 mt-1 ml-7">
                      {(category.count / 1000000).toFixed(2)}M students enrolled
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="states">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">State-wise Performance Scorecard</h3>
            <div className="space-y-3">
              {statePerformanceData.map((state, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">{state.state}</h4>
                        <p className="text-sm text-slate-600">Overall Score: {state.score}/100</p>
                      </div>
                    </div>
                    <Badge className={state.score >= 85 ? 'bg-green-500' : state.score >= 75 ? 'bg-blue-500' : 'bg-orange-500'}>
                      {state.score >= 85 ? 'Excellent' : state.score >= 75 ? 'Good' : 'Needs Improvement'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600">Literacy Rate</div>
                      <div className="font-semibold text-lg text-blue-600">{state.literacy}%</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Dropout Rate</div>
                      <div className="font-semibold text-lg text-green-600">{state.dropout}%</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Enrollment</div>
                      <div className="font-semibold text-lg text-purple-600">{state.enrollment}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Query Result Display */}
      {queryResult && searchQuery && (
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-300">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-blue-900">Query Answer</h3>
                <Badge className={queryConfidence >= 60 ? 'bg-green-500' : 'bg-orange-500'}>
                  {queryConfidence}% Confidence
                </Badge>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200 mb-3">
                <p className="text-sm text-slate-600 mb-2">
                  <strong>Question:</strong> {searchQuery}
                </p>
                <div className="text-2xl font-bold text-blue-700 mb-2">
                  {queryResult.aggregated.totalBeneficiaries.toLocaleString()} Beneficiaries
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                  <div>
                    <div className="text-slate-600">Budget Allocated</div>
                    <div className="font-semibold text-green-600">₹{queryResult.aggregated.totalBudget}Cr</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Utilization Rate</div>
                    <div className="font-semibold text-blue-600">{queryResult.aggregated.avgUtilization}%</div>
                  </div>
                  <div>
                    <div className="text-slate-600">Records Found</div>
                    <div className="font-semibold text-purple-600">{queryResult.recordCount}</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Data filtered by: {queryResult.filters.state && `State: ${queryResult.filters.state}`} 
                {queryResult.filters.scheme && ` | Scheme: ${queryResult.filters.scheme}`}
                {queryResult.filters.gender && ` | Gender: ${queryResult.filters.gender}`}
                {queryResult.filters.locality && ` | Locality: ${queryResult.filters.locality}`}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* AI-Generated Insights */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 text-purple-900">AI-Generated Policy Insights</h3>
            <div className="space-y-3 text-sm">
              {activeInsights.length > 0 ? (
                activeInsights.map((insight, index) => (
                  <p key={index} className="p-3 bg-white rounded-lg border border-purple-200">
                    {insight}
                  </p>
                ))
              ) : (
                <p className="p-3 bg-white rounded-lg border border-purple-200 text-slate-500">
                  Select filters or enter a query to generate insights.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
