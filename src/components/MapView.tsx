
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
            box-shadow: 0 1px 4px rgba(0,0,0,0.2), 0 0 0 0 rgba(220, 38, 38, 0.7);
          }
          50% { 
            transform: scale(1.02);
            box-shadow: 0 2px 6px rgba(0,0,0,0.3), 0 0 0 2px rgba(220, 38, 38, 0.3);
          }
          100% { 
            transform: scale(1);
            box-shadow: 0 1px 4px rgba(0,0,0,0.2), 0 0 0 0 rgba(220, 38, 38, 0);
          }
        }
      </style>
      <div style="
        background-color: ${performanceColor};
        background-image: linear-gradient(135deg, ${performanceColor} 0%, ${performanceColor}dd 100%);
        color: ${textColor};
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #FFFFFF;
        box-shadow: 0 1px 4px rgba(0,0,0,0.2), 0 1px 2px ${performanceColor}40;
        font-size: 8px;
        font-weight: 700;
        position: relative;
        cursor: pointer;
        z-index: 1000;
        ${location.performance === 'critical' ? 'animation: pulse-critical 2s infinite;' : ''}
      ">
        <div style="text-align: center; line-height: 1; position: relative; z-index: 2;">
          <div style="font-size: 8px; display: block;">${symbol}</div>
          ${location.nirfRank && location.nirfRank <= 100 ? `<div style="font-size: 4px; font-weight: 600; color: ${textColor}; margin-top: -1px;">${location.nirfRank}</div>` : ''}
        </div>
        ${rankDisplay ? `<div style="
          font-size: 4px; 
          position: absolute; 
          top: -2px; 
          right: -2px; 
          background: white; 
          border-radius: 50%; 
          width: 6px; 
          height: 6px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border: 1px solid ${performanceColor};
          z-index: 3;
        ">${rankDisplay}</div>` : ''}
        ${getGovernmentAlert() ? `<div style="
          font-size: 4px; 
          position: absolute; 
          top: -2px; 
          left: -2px; 
          background: white; 
          border-radius: 50%; 
          width: 6px; 
          height: 6px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border: 1px solid #333;
          z-index: 3;
        ">${getGovernmentAlert()}</div>` : ''}
      </div>
    `,
    className: `custom-performance-marker marker-${location.performance} performance-${location.performance}`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
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
            <Popup maxWidth={320} className="custom-popup">
              <div className="p-2">
                {/* Institution Header */}
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <h3 className="font-bold text-sm text-gray-900">{location.name}</h3>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    📍 {location.city} • {location.type} • {location.students?.toLocaleString()} students
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                    location.performance === 'critical' ? 'bg-red-600 text-white' :
                    location.performance === 'needs-attention' ? 'bg-orange-500 text-white' :
                    location.performance === 'excellent' ? 'bg-green-600 text-white' :
                    'bg-blue-600 text-white'
                  }`}>
                    {location.performance === 'critical' ? 'CRITICAL' :
                     location.performance === 'needs-attention' ? 'NEEDS ATTENTION' :
                     location.performance === 'excellent' ? 'EXCELLENT' : 
                     location.performance === 'good' ? 'GOOD' : 'AVERAGE'}
                  </div>
                </div>

                {/* Compact Metrics Grid */}
                <div className="grid grid-cols-2 gap-1 mb-2 text-xs">
                  {location.nirfRank && (
                    <div className="bg-blue-50 p-2 rounded border text-center">
                      <div className="font-bold text-blue-700">#{location.nirfRank}</div>
                      <div className="text-blue-600">NIRF Rank</div>
                    </div>
                  )}
                  <div className={`p-2 rounded border text-center ${
                    location.placement && location.placement >= 80 ? 'bg-green-50' :
                    location.placement && location.placement >= 60 ? 'bg-yellow-50' : 'bg-red-50'
                  }`}>
                    <div className={`font-bold ${
                      location.placement && location.placement >= 80 ? 'text-green-700' :
                      location.placement && location.placement >= 60 ? 'text-yellow-700' : 'text-red-700'
                    }`}>{location.placement}%</div>
                    <div className={`${
                      location.placement && location.placement >= 80 ? 'text-green-600' :
                      location.placement && location.placement >= 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>Placement</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded border text-center">
                    <div className="font-bold text-purple-700">{location.research}</div>
                    <div className="text-purple-600">Research</div>
                  </div>
                  <div className={`p-2 rounded border text-center ${
                    location.dropout && location.dropout > 15 ? 'bg-red-50' : 
                    location.dropout && location.dropout > 8 ? 'bg-orange-50' : 'bg-green-50'
                  }`}>
                    <div className={`font-bold ${
                      location.dropout && location.dropout > 15 ? 'text-red-700' : 
                      location.dropout && location.dropout > 8 ? 'text-orange-700' : 'text-green-700'
                    }`}>{location.dropout}%</div>
                    <div className={`${
                      location.dropout && location.dropout > 15 ? 'text-red-600' : 
                      location.dropout && location.dropout > 8 ? 'text-orange-600' : 'text-green-600'
                    }`}>Dropout</div>
                  </div>
                </div>

                  {/* Compact Status Summary */}
                {location.performance === 'critical' && (
                  <div className="p-2 bg-red-50 border-l-2 border-red-500 rounded text-xs">
                    <div className="font-bold text-red-900 mb-1">🚨 CRITICAL STATUS</div>
                    <div className="text-red-700">Immediate government intervention required. Emergency funding allocated.</div>
                  </div>
                )}

                {location.performance === 'needs-attention' && (
                  <div className="p-2 bg-orange-50 border-l-2 border-orange-500 rounded text-xs">
                    <div className="font-bold text-orange-900 mb-1">⚠️ NEEDS IMPROVEMENT</div>
                    <div className="text-orange-700">Focus on placement rates and research output enhancement.</div>
                  </div>
                )}

                {location.performance === 'excellent' && (
                  <div className="p-2 bg-green-50 border-l-2 border-green-500 rounded text-xs">
                    <div className="font-bold text-green-900 mb-1">🌟 EXEMPLARY</div>
                    <div className="text-green-700">Outstanding performance. National showcase institution.</div>
                  </div>
                )}

                {location.performance === 'good' && (
                  <div className="p-2 bg-blue-50 border-l-2 border-blue-500 rounded text-xs">
                    <div className="font-bold text-blue-900 mb-1">✅ GOOD PERFORMANCE</div>
                    <div className="text-blue-700">Stable institution with solid metrics across all areas.</div>
                  </div>
                )}

                {location.performance === 'average' && (
                  <div className="p-2 bg-yellow-50 border-l-2 border-yellow-500 rounded text-xs">
                    <div className="font-bold text-yellow-900 mb-1">⚡ AVERAGE</div>
                    <div className="text-yellow-700">Performance improvement plan in progress.</div>
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
