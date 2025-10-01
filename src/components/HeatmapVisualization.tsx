
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const HeatmapVisualization = () => {
  const [selectedMetric, setSelectedMetric] = useState('dropout');
  const [selectedLevel, setSelectedLevel] = useState('state');

  const stateData = [
    { name: 'Kerala', dropout: 3.2, literacy: 94.0, funding: 89, nirf: 8.5, color: 'bg-green-500', status: 'excellent' },
    { name: 'Maharashtra', dropout: 8.1, literacy: 82.3, funding: 76, nirf: 7.2, color: 'bg-blue-500', status: 'good' },
    { name: 'Punjab', dropout: 11.2, literacy: 75.8, funding: 65, nirf: 6.1, color: 'bg-yellow-500', status: 'average' },
    { name: 'Gujarat', dropout: 9.8, literacy: 78.5, funding: 71, nirf: 6.8, color: 'bg-blue-400', status: 'good' },
    { name: 'Haryana', dropout: 12.5, literacy: 76.6, funding: 63, nirf: 5.9, color: 'bg-yellow-500', status: 'average' },
    { name: 'Bihar', dropout: 18.9, literacy: 61.8, funding: 42, nirf: 4.2, color: 'bg-red-500', status: 'critical' },
    { name: 'Uttar Pradesh', dropout: 16.4, literacy: 67.7, funding: 48, nirf: 4.8, color: 'bg-red-400', status: 'needs-attention' },
    { name: 'Jharkhand', dropout: 19.3, literacy: 66.4, funding: 44, nirf: 4.1, color: 'bg-red-500', status: 'critical' },
    { name: 'Odisha', dropout: 17.2, literacy: 72.9, funding: 51, nirf: 5.2, color: 'bg-orange-500', status: 'needs-attention' },
    { name: 'West Bengal', dropout: 13.8, literacy: 76.3, funding: 59, nirf: 5.7, color: 'bg-yellow-400', status: 'average' }
  ];

  const districtData = [
    { name: 'Mumbai', state: 'Maharashtra', dropout: 4.5, literacy: 89.2, funding: 85, performance: 'excellent' },
    { name: 'Pune', state: 'Maharashtra', dropout: 6.1, literacy: 86.7, funding: 78, performance: 'good' },
    { name: 'Thiruvananthapuram', state: 'Kerala', dropout: 2.8, literacy: 95.1, funding: 91, performance: 'excellent' },
    { name: 'Kochi', state: 'Kerala', dropout: 3.1, literacy: 94.5, funding: 88, performance: 'excellent' },
    { name: 'Patna', state: 'Bihar', dropout: 16.2, literacy: 68.4, funding: 48, performance: 'critical' },
    { name: 'Gaya', state: 'Bihar', dropout: 22.1, literacy: 58.3, funding: 35, performance: 'critical' },
    { name: 'Lucknow', state: 'UP', dropout: 12.4, literacy: 73.2, funding: 56, performance: 'needs-attention' },
    { name: 'Varanasi', state: 'UP', dropout: 18.7, literacy: 65.8, funding: 42, performance: 'critical' }
  ];

  const institutionData = [
    { name: 'IIT Bombay', location: 'Mumbai', nirf: 1, dropout: 1.2, research: 95, status: 'top-tier' },
    { name: 'IISc Bangalore', location: 'Bangalore', nirf: 2, dropout: 0.8, research: 98, status: 'top-tier' },
    { name: 'IIT Delhi', location: 'Delhi', nirf: 3, dropout: 1.1, research: 94, status: 'top-tier' },
    { name: 'ABC Institute', location: 'Pune', nirf: 42, dropout: 8.5, research: 68, status: 'good' },
    { name: 'XYZ University', location: 'Jaipur', nirf: 78, dropout: 12.3, research: 54, status: 'average' },
    { name: 'PQR College', location: 'Patna', nirf: 156, dropout: 19.8, research: 32, status: 'needs-improvement' }
  ];

  const getMetricValue = (item: any, metric: string) => {
    switch (metric) {
      case 'dropout': return item.dropout;
      case 'literacy': return item.literacy;
      case 'funding': return item.funding;
      case 'nirf': return item.nirf;
      default: return 0;
    }
  };

  const getColorForMetric = (value: number, metric: string) => {
    switch (metric) {
      case 'dropout':
        if (value <= 5) return 'bg-green-500';
        if (value <= 10) return 'bg-yellow-500';
        if (value <= 15) return 'bg-orange-500';
        return 'bg-red-500';
      case 'literacy':
        if (value >= 90) return 'bg-green-500';
        if (value >= 80) return 'bg-blue-500';
        if (value >= 70) return 'bg-yellow-500';
        return 'bg-red-500';
      case 'funding':
        if (value >= 80) return 'bg-green-500';
        if (value >= 65) return 'bg-blue-500';
        if (value >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
      case 'nirf':
        if (value >= 8) return 'bg-green-500';
        if (value >= 6) return 'bg-blue-500';
        if (value >= 4) return 'bg-yellow-500';
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDataForLevel = () => {
    switch (selectedLevel) {
      case 'state': return stateData;
      case 'district': return districtData;
      case 'institution': return institutionData;
      default: return stateData;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
      case 'top-tier':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'good':
        return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case 'critical':
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Users className="h-4 w-4 text-yellow-600" />;
    }
  };

  const data = getDataForLevel();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Education Performance Heatmap</h1>
          <p className="text-gray-600">Interactive visualization of education metrics across regions and institutions</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dropout">Dropout Rate</SelectItem>
              <SelectItem value="literacy">Literacy Rate</SelectItem>
              <SelectItem value="funding">Funding Utilization</SelectItem>
              <SelectItem value="nirf">NIRF Performance</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="state">State Level</SelectItem>
              <SelectItem value="district">District Level</SelectItem>
              <SelectItem value="institution">Institution Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Legend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Performance Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Excellent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">Good</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-sm">Average</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-sm">Needs Attention</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm">Critical</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Heatmap Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)} Performance Heatmap
            </CardTitle>
            <CardDescription>
              {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} visualization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {data.map((item, index) => (
                <div
                  key={index}
                  className={`${getColorForMetric(getMetricValue(item, selectedMetric), selectedMetric)} 
                             text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    {getStatusIcon(item.status || item.performance)}
                  </div>
                  
                  <div className="text-lg font-bold mb-1">
                    {getMetricValue(item, selectedMetric)}
                    {selectedMetric === 'dropout' || selectedMetric === 'literacy' ? '%' : ''}
                  </div>
                  
                  <div className="text-xs opacity-90">
                    {selectedMetric === 'dropout' && 'Dropout Rate'}
                    {selectedMetric === 'literacy' && 'Literacy Rate'}
                    {selectedMetric === 'funding' && 'Funding Score'}
                    {selectedMetric === 'nirf' && 'NIRF Score'}
                  </div>
                  
                  {selectedLevel === 'district' && (
                    <div className="text-xs opacity-75 mt-1">{item.state}</div>
                  )}
                  
                  {selectedLevel === 'institution' && (
                    <div className="text-xs opacity-75 mt-1">
                      NIRF: #{item.nirf}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Areas of Concern</h4>
                <div className="text-sm text-red-800">
                  {selectedMetric === 'dropout' && (
                    <>
                      • Bihar: 18.9% dropout rate<br/>
                      • Jharkhand: 19.3% dropout rate<br/>
                      • Rural areas most affected
                    </>
                  )}
                  {selectedMetric === 'literacy' && (
                    <>
                      • Bihar: 61.8% literacy rate<br/>
                      • Jharkhand: 66.4% literacy rate<br/>
                      • Female literacy gap significant
                    </>
                  )}
                  {selectedMetric === 'funding' && (
                    <>
                      • Low funding utilization in eastern states<br/>
                      • Infrastructure gaps in rural areas<br/>
                      • Need for targeted interventions
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Success Stories</h4>
                <div className="text-sm text-green-800">
                  {selectedMetric === 'dropout' && (
                    <>
                      • Kerala: 3.2% dropout rate<br/>
                      • Strong mid-day meal programs<br/>
                      • Effective scholarship schemes
                    </>
                  )}
                  {selectedMetric === 'literacy' && (
                    <>
                      • Kerala: 94% literacy rate<br/>
                      • Maharashtra: 82.3% literacy<br/>
                      • Focus on female education
                    </>
                  )}
                  {selectedMetric === 'funding' && (
                    <>
                      • Kerala leads in fund utilization<br/>
                      • Maharashtra close second<br/>
                      • Efficient disbursement systems
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
                <div className="text-sm text-blue-800">
                  • Increase scholarship coverage in red zones<br/>
                  • Enhance digital infrastructure<br/>
                  • Strengthen teacher training programs<br/>
                  • Improve mid-day meal quality
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeatmapVisualization;
