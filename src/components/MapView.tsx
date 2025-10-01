
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown, Building2, Users, Star } from 'lucide-react';

// Fix default markers issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  id: string;
  name: string;
  position: [number, number];
  data: string;
  performance?: 'excellent' | 'good' | 'average' | 'needs-attention' | 'critical';
  city?: string;
  type?: string;
  students?: number;
  nirfRank?: number;
  placement?: number;
  research?: number;
  dropout?: number;
}

interface MapViewProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
}

const createCustomIcon = (location: Location) => {
  const getPerformanceColor = () => {
    switch (location.performance) {
      case 'excellent': return '#16A34A'; // Bright Green
      case 'good': return '#2563EB'; // Bright Blue
      case 'average': return '#EAB308'; // Bright Yellow
      case 'needs-attention': return '#EA580C'; // Bright Orange
      case 'critical': return '#DC2626'; // Bright Red
      default: return '#6B7280'; // Gray
    }
  };

  const getPerformanceSymbol = () => {
    switch (location.performance) {
      case 'excellent': return '★';
      case 'good': return '✓';
      case 'average': return '△';
      case 'needs-attention': return '⚠';
      case 'critical': return '✗';
      default: return '●';
    }
  };

  const getTextColor = () => {
    return location.performance === 'average' ? '#000000' : '#FFFFFF';
  };

  const getRankDisplay = () => {
    if (location.nirfRank && location.nirfRank <= 50) return '🏆';
    if (location.nirfRank && location.nirfRank <= 100) return '🥇';
    if (location.nirfRank && location.nirfRank <= 200) return '🥈';
    return '';
  };

  const performanceColor = getPerformanceColor();
  const symbol = getPerformanceSymbol();
  const textColor = getTextColor();
  const rankDisplay = getRankDisplay();

  const getPulseAnimation = () => {
    if (location.performance === 'critical') {
      return `
        animation: pulse-critical 2s infinite;
        @keyframes pulse-critical {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
      `;
    }
    return '';
  };

  const getGovernmentAlert = () => {
    if (location.performance === 'critical') return '🚨';
    if (location.performance === 'needs-attention') return '⚠️';
    if (location.performance === 'excellent') return '🏆';
    return '';
  };

  return L.divIcon({
    html: `
      <style>
        @keyframes pulse-critical {
          0% { 
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(220, 38, 38, 0.7);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 3px 12px rgba(0,0,0,0.4), 0 0 0 4px rgba(220, 38, 38, 0.3);
          }
          100% { 
            transform: scale(1);
            box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(220, 38, 38, 0);
          }
        }
      </style>
      <div style="
        background-color: ${performanceColor};
        background-image: linear-gradient(135deg, ${performanceColor} 0%, ${performanceColor}dd 100%);
        color: ${textColor};
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3), 0 1px 4px ${performanceColor}60;
        font-size: 10px;
        font-weight: 900;
        position: relative;
        cursor: pointer;
        transition: all 0.3s ease;
        z-index: 1000;
        ${location.performance === 'critical' ? 'animation: pulse-critical 2s infinite;' : ''}
      ">
        <div style="text-align: center; line-height: 1; position: relative; z-index: 2;">
          <div style="font-size: 12px; display: block; margin-bottom: 1px;">${symbol}</div>
          ${location.nirfRank ? `<div style="font-size: 5px; font-weight: 600; color: ${textColor};">#${location.nirfRank}</div>` : ''}
        </div>
        ${rankDisplay ? `<div style="
          font-size: 6px; 
          position: absolute; 
          top: -4px; 
          right: -4px; 
          background: white; 
          border-radius: 50%; 
          width: 10px; 
          height: 10px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border: 1px solid ${performanceColor};
          z-index: 3;
        ">${rankDisplay}</div>` : ''}
        ${getGovernmentAlert() ? `<div style="
          font-size: 6px; 
          position: absolute; 
          top: -4px; 
          left: -4px; 
          background: white; 
          border-radius: 50%; 
          width: 10px; 
          height: 10px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border: 1px solid #333;
          z-index: 3;
        ">${getGovernmentAlert()}</div>` : ''}
      </div>
    `,
    className: `custom-performance-marker marker-${location.performance} performance-${location.performance}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

export const MapView = ({ locations, center = [30.7677, 76.7794], zoom = 8 }: MapViewProps) => {
  return (
    <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        key={`map-${center[0]}-${center[1]}-${zoom}`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.position}
            icon={createCustomIcon(location)}
          >
            <Popup maxWidth={500} className="custom-popup">
              <div className="p-1">
                {/* Government Priority Header */}
                <div className="bg-gradient-to-r from-orange-100 via-white to-green-100 p-2 rounded-t-lg border-b-2 border-blue-600 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white rounded-full"></div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-blue-800">GOVERNMENT MONITORING</div>
                        <div className="text-xs text-gray-600">Ministry of Education • Real-time Status</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      location.performance === 'critical' ? 'bg-red-600 text-white' :
                      location.performance === 'needs-attention' ? 'bg-orange-500 text-white' :
                      location.performance === 'excellent' ? 'bg-green-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {location.performance === 'critical' ? 'HIGH PRIORITY' :
                       location.performance === 'needs-attention' ? 'MONITOR' :
                       location.performance === 'excellent' ? 'SHOWCASE' : 'STABLE'}
                    </div>
                  </div>
                </div>

                {/* Institution Header */}
                <div className="flex items-start justify-between mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <h3 className="font-bold text-lg text-gray-900">{location.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {location.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {location.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {location.students?.toLocaleString()} students
                      </span>
                      <span className="flex items-center gap-1 text-blue-600 font-semibold">
                        📊 ID: {location.id}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3 flex flex-col items-center">
                    {location.performance === 'excellent' && <CheckCircle className="h-7 w-7 text-green-500" />}
                    {location.performance === 'critical' && <AlertTriangle className="h-7 w-7 text-red-500" />}
                    {location.performance === 'needs-attention' && <Clock className="h-7 w-7 text-orange-500" />}
                    {location.performance === 'good' && <CheckCircle className="h-7 w-7 text-blue-500" />}
                    {location.performance === 'average' && <Clock className="h-7 w-7 text-yellow-500" />}
                  </div>
                </div>

                {/* Quick Government Metrics */}
                <div className="bg-gray-50 p-3 rounded-lg mb-3 border">
                  <h4 className="font-bold text-sm text-gray-800 mb-2 flex items-center gap-1">
                    🏛️ GOVERNMENT METRICS (Real-time)
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-blue-700">₹{Math.round((location.students || 0) * 0.45)}L</div>
                      <div className="text-gray-600">Est. Annual Budget</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-green-700">{Math.round((location.placement || 0) * (location.students || 0) / 100)}</div>
                      <div className="text-gray-600">Placed Students</div>
                    </div>
                    <div className="text-center">
                      <div className={`font-bold ${location.dropout && location.dropout > 10 ? 'text-red-700' : 'text-green-700'}`}>
                        {Math.round((location.dropout || 0) * (location.students || 0) / 100)}
                      </div>
                      <div className="text-gray-600">At-Risk Students</div>
                    </div>
                  </div>
                </div>

                {/* Performance Status Badge */}
                <div className="px-3 mb-3">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                    location.performance === 'excellent' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                    location.performance === 'good' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                    location.performance === 'average' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black' :
                    location.performance === 'needs-attention' ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' :
                    location.performance === 'critical' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
                    'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
                  }`}>
                    <span className={`w-3 h-3 rounded-full mr-2 ${
                      location.performance === 'excellent' ? 'bg-green-300' :
                      location.performance === 'good' ? 'bg-blue-300' :
                      location.performance === 'average' ? 'bg-yellow-200' :
                      location.performance === 'needs-attention' ? 'bg-orange-300' :
                      location.performance === 'critical' ? 'bg-red-300' :
                      'bg-gray-300'
                    }`}></span>
                    {location.performance === 'needs-attention' ? 'NEEDS ATTENTION' : 
                     location.performance?.toUpperCase()}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="px-3">
                  {location.nirfRank && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg text-center border">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="h-4 w-4 text-blue-600" />
                          <div className="text-xl font-black text-blue-700">#{location.nirfRank}</div>
                        </div>
                        <div className="text-xs text-blue-600 font-semibold">NIRF RANK</div>
                        {location.nirfRank <= 50 && <div className="text-xs text-green-600 font-bold mt-1">TOP 50 🏆</div>}
                        {location.nirfRank > 200 && <div className="text-xs text-red-600 font-bold mt-1">NEEDS FOCUS</div>}
                      </div>
                      <div className={`p-3 rounded-lg text-center border ${
                        location.placement && location.placement >= 80 ? 'bg-gradient-to-br from-green-50 to-green-100' :
                        location.placement && location.placement >= 60 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' :
                        'bg-gradient-to-br from-red-50 to-red-100'
                      }`}>
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {location.placement && location.placement > 80 && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {location.placement && location.placement < 50 && <TrendingDown className="h-4 w-4 text-red-600" />}
                          <div className={`text-xl font-black ${
                            location.placement && location.placement >= 80 ? 'text-green-700' :
                            location.placement && location.placement >= 60 ? 'text-yellow-700' : 'text-red-700'
                          }`}>{location.placement}%</div>
                        </div>
                        <div className={`text-xs font-semibold ${
                          location.placement && location.placement >= 80 ? 'text-green-600' :
                          location.placement && location.placement >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>PLACEMENT</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg text-center border">
                        <div className="text-xl font-black text-purple-700">{location.research}</div>
                        <div className="text-xs text-purple-600 font-semibold">RESEARCH</div>
                      </div>
                      <div className={`p-3 rounded-lg text-center border ${
                        location.dropout && location.dropout > 15 ? 'bg-gradient-to-br from-red-50 to-red-100' : 
                        location.dropout && location.dropout > 8 ? 'bg-gradient-to-br from-orange-50 to-orange-100' : 'bg-gradient-to-br from-green-50 to-green-100'
                      }`}>
                        <div className={`text-xl font-black ${
                          location.dropout && location.dropout > 15 ? 'text-red-700' : 
                          location.dropout && location.dropout > 8 ? 'text-orange-700' : 'text-green-700'
                        }`}>{location.dropout}%</div>
                        <div className={`text-xs font-semibold ${
                          location.dropout && location.dropout > 15 ? 'text-red-600' : 
                          location.dropout && location.dropout > 8 ? 'text-orange-600' : 'text-green-600'
                        }`}>DROPOUT</div>
                      </div>
                    </div>
                  )}

                  {/* Government Action Alerts */}
                  {location.performance === 'critical' && (
                    <div className="p-3 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg mb-2">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                        <h4 className="font-bold text-red-900">🚨 CRITICAL - IMMEDIATE INTERVENTION REQUIRED</h4>
                      </div>
                      <div className="text-sm text-red-800 mb-2">
                        <strong>Issues:</strong> High dropout ({location.dropout}%), Poor placement ({location.placement}%), Low NIRF rank (#{location.nirfRank})
                      </div>
                      <div className="text-xs text-red-700 bg-red-100 p-2 rounded mb-2">
                        <strong>📋 Immediate Action Plan (Next 30 Days):</strong><br/>
                        🔍 Schedule UGC inspection team deployment<br/>
                        🎯 Emergency placement cell setup<br/>
                        👥 Faculty training program (mandatory)<br/>
                        💰 Special funding review: ₹{Math.round((location.students || 0) * 0.15)}L emergency grant<br/>
                        📊 Weekly progress monitoring with Ministry
                      </div>
                      <div className="text-xs text-red-700 bg-white p-2 rounded border border-red-300">
                        <strong>🏛️ Government Response:</strong><br/>
                        • Contact: Regional Education Officer<br/>
                        • Next Review: {new Date(Date.now() + 7*24*60*60*1000).toLocaleDateString()}<br/>
                        • Budget Impact: High Priority Queue<br/>
                        • Media Attention: Possible
                      </div>
                    </div>
                  )}

                  {location.performance === 'needs-attention' && (
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-lg mb-2">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-orange-600 mr-2" />
                        <h4 className="font-bold text-orange-900">⚠️ NEEDS IMPROVEMENT</h4>
                      </div>
                      <div className="text-sm text-orange-800 mb-1">
                        Focus: Placement rates and research output enhancement
                      </div>
                      <div className="text-xs text-orange-700">
                        📈 Industry partnership program recommended
                      </div>
                    </div>
                  )}

                  {location.performance === 'excellent' && (
                    <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg mb-2">
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-green-600 mr-2" />
                        <h4 className="font-bold text-green-900">🌟 EXEMPLARY PERFORMANCE</h4>
                      </div>
                      <div className="text-sm text-green-800 mb-2">
                        Outstanding across all metrics. Prime candidate for best practice showcase.
                      </div>
                      <div className="text-xs text-green-700 bg-green-100 p-2 rounded mb-2">
                        🏆 <strong>Government Recognition Program:</strong><br/>
                        • Featured in national education excellence report<br/>
                        • Best practices documentation for replication<br/>
                        • Additional funding: ₹{Math.round((location.students || 0) * 0.1)}L excellence bonus<br/>
                        • Mentorship role for struggling institutions
                      </div>
                      <div className="text-xs text-green-700 bg-white p-2 rounded border border-green-300">
                        <strong>🏛️ Ministry Action:</strong><br/>
                        • Status: National Showcase Institution<br/>
                        • Media Coverage: Positive highlighting<br/>
                        • Next Visit: Annual Excellence Review<br/>
                        • Special Grants: Available
                      </div>
                    </div>
                  )}

                  {location.performance === 'good' && (
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg mb-2">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <h4 className="font-bold text-blue-900">✅ GOOD PERFORMANCE - STABLE INSTITUTION</h4>
                      </div>
                      <div className="text-sm text-blue-800 mb-2">
                        Solid performance across key metrics. Maintain current trajectory.
                      </div>
                      <div className="text-xs text-blue-700 bg-blue-100 p-2 rounded mb-2">
                        📈 <strong>Improvement Opportunities:</strong><br/>
                        • Target NIRF rank improvement to &lt;50<br/>
                        • Increase research output by 15%<br/>
                        • Industry partnership expansion<br/>
                        • Digital infrastructure upgrade
                      </div>
                      <div className="text-xs text-blue-700 bg-white p-2 rounded border border-blue-300">
                        <strong>🏛️ Government Support:</strong><br/>
                        • Funding: Regular allocation maintained<br/>
                        • Review Cycle: Bi-annual assessment<br/>
                        • Growth Support: Available on request<br/>
                        • Monitoring: Standard protocols
                      </div>
                    </div>
                  )}

                  {location.performance === 'average' && (
                    <div className="p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 rounded-lg mb-2">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                        <h4 className="font-bold text-yellow-900">⚡ AVERAGE PERFORMANCE - IMPROVEMENT NEEDED</h4>
                      </div>
                      <div className="text-sm text-yellow-800 mb-2">
                        Performance below expectations. Targeted interventions required.
                      </div>
                      <div className="text-xs text-yellow-700 bg-yellow-100 p-2 rounded mb-2">
                        🎯 <strong>Focus Areas (Next 6 Months):</strong><br/>
                        • Placement rate improvement program<br/>
                        • Faculty skill development initiative<br/>
                        • Student support services enhancement<br/>
                        • Infrastructure gap analysis and upgrade
                      </div>
                      <div className="text-xs text-yellow-700 bg-white p-2 rounded border border-yellow-300">
                        <strong>🏛️ Government Intervention:</strong><br/>
                        • Status: Performance Improvement Plan<br/>
                        • Funding: Conditional on milestones<br/>
                        • Support: Technical assistance team<br/>
                        • Timeline: 6-month improvement target
                      </div>
                    </div>
                  )}

                  {location.performance === 'good' && (
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg mb-2">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                        <h4 className="font-bold text-blue-900">✅ GOOD PERFORMANCE</h4>
                      </div>
                      <div className="text-sm text-blue-800">
                        Solid performance across key metrics. Continue monitoring.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
