
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
            <Popup maxWidth={400} className="custom-popup">
              <div className="p-3 bg-white rounded-lg">
                {/* Horizontal Card Layout */}
                <div className="flex gap-3">
                  {/* Left Section - Institution Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-blue-600" />
                      <h3 className="font-bold text-sm text-gray-900">{location.name}</h3>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      📍 {location.city} • {location.type}
                    </div>
                    <div className="text-xs text-gray-600 mb-2 break-words">
                      {location.data}
                    </div>
                  </div>

                  {/* Right Section - Metrics */}
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {location.nirfRank && (
                        <div className="bg-blue-50 p-1.5 rounded border text-center">
                          <div className="font-bold text-blue-700 text-xs">#{location.nirfRank}</div>
                          <div className="text-blue-600 text-[10px]">NIRF</div>
                        </div>
                      )}
                      <div className={`p-1.5 rounded border text-center ${
                        location.placement && location.placement >= 80 ? 'bg-green-50' :
                        location.placement && location.placement >= 60 ? 'bg-yellow-50' : 'bg-red-50'
                      }`}>
                        <div className={`font-bold text-xs ${
                          location.placement && location.placement >= 80 ? 'text-green-700' :
                          location.placement && location.placement >= 60 ? 'text-yellow-700' : 'text-red-700'
                        }`}>{location.placement}%</div>
                        <div className={`text-[10px] ${
                          location.placement && location.placement >= 80 ? 'text-green-600' :
                          location.placement && location.placement >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>Placement</div>
                      </div>
                      <div className="bg-purple-50 p-1.5 rounded border text-center">
                        <div className="font-bold text-purple-700 text-xs">{location.research}</div>
                        <div className="text-purple-600 text-[10px]">Research</div>
                      </div>
                      <div className={`p-1.5 rounded border text-center ${
                        location.dropout && location.dropout > 15 ? 'bg-red-50' : 
                        location.dropout && location.dropout > 8 ? 'bg-orange-50' : 'bg-green-50'
                      }`}>
                        <div className={`font-bold text-xs ${
                          location.dropout && location.dropout > 15 ? 'text-red-700' : 
                          location.dropout && location.dropout > 8 ? 'text-orange-700' : 'text-green-700'
                        }`}>{location.dropout}%</div>
                        <div className={`text-[10px] ${
                          location.dropout && location.dropout > 15 ? 'text-red-600' : 
                          location.dropout && location.dropout > 8 ? 'text-orange-600' : 'text-green-600'
                        }`}>Dropout</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  {location.performance === 'critical' && (
                    <div className="text-xs text-red-700 bg-red-50 px-2 py-1 rounded">
                      🚨 <span className="font-bold">CRITICAL:</span> Emergency intervention required
                    </div>
                  )}

                  {location.performance === 'needs-attention' && (
                    <div className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded">
                      ⚠️ <span className="font-bold">NEEDS IMPROVEMENT:</span> Focus on placement & research
                    </div>
                  )}

                  {location.performance === 'excellent' && (
                    <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded">
                      🌟 <span className="font-bold">EXEMPLARY:</span> National showcase institution
                    </div>
                  )}

                  {location.performance === 'good' && (
                    <div className="text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                      ✅ <span className="font-bold">GOOD:</span> Stable performance across all areas
                    </div>
                  )}

                  {location.performance === 'average' && (
                    <div className="text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                      ⚡ <span className="font-bold">AVERAGE:</span> Improvement plan in progress
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
