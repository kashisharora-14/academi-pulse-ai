
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

// Fix default markers
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
      case 'excellent': return '#10B981'; // Green
      case 'good': return '#3B82F6'; // Blue
      case 'average': return '#F59E0B'; // Yellow/Amber
      case 'needs-attention': return '#F97316'; // Orange
      case 'critical': return '#EF4444'; // Red
      default: return '#6B7280'; // Gray
    }
  };

  const getPerformanceSymbol = () => {
    switch (location.performance) {
      case 'excellent': return '★';
      case 'good': return '✓';
      case 'average': return '○';
      case 'needs-attention': return '⚠';
      case 'critical': return '✗';
      default: return '●';
    }
  };

  const getBorderColor = () => {
    switch (location.performance) {
      case 'excellent': return '#059669';
      case 'good': return '#2563EB';
      case 'average': return '#D97706';
      case 'needs-attention': return '#EA580C';
      case 'critical': return '#DC2626';
      default: return '#4B5563';
    }
  };

  return L.divIcon({
    html: `
      <div style="
        background-color: ${getPerformanceColor()};
        color: white;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid ${getBorderColor()};
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        font-size: 14px;
        font-weight: bold;
        position: relative;
      ">
        ${getPerformanceSymbol()}
      </div>
    `,
    className: 'custom-performance-marker',
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
            <Popup maxWidth={400} className="custom-popup">
              <div className="p-4 min-w-72">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{location.name}</h3>
                    <p className="text-sm text-gray-600">
                      📍 {location.city} • {location.type} • {location.students?.toLocaleString()} students
                    </p>
                  </div>
                  <div className="ml-3 flex flex-col items-center">
                    {location.performance === 'excellent' && <CheckCircle className="h-6 w-6 text-green-500" />}
                    {location.performance === 'critical' && <AlertTriangle className="h-6 w-6 text-red-500" />}
                    {location.performance === 'needs-attention' && <Clock className="h-6 w-6 text-orange-500" />}
                  </div>
                </div>

                {/* Performance Status Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                  location.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                  location.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                  location.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                  location.performance === 'needs-attention' ? 'bg-orange-100 text-orange-800' :
                  location.performance === 'critical' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  <span className={`w-2 h-2 rounded-full mr-2 ${
                    location.performance === 'excellent' ? 'bg-green-500' :
                    location.performance === 'good' ? 'bg-blue-500' :
                    location.performance === 'average' ? 'bg-yellow-500' :
                    location.performance === 'needs-attention' ? 'bg-orange-500' :
                    location.performance === 'critical' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></span>
                  {location.performance === 'needs-attention' ? 'Needs Attention' : 
                   location.performance?.charAt(0).toUpperCase() + location.performance?.slice(1)}
                </div>

                {/* Metrics Grid */}
                {location.nirfRank && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-blue-700">#{location.nirfRank}</div>
                      <div className="text-xs text-blue-600 font-medium">NIRF Ranking</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-green-700">{location.placement}%</div>
                      <div className="text-xs text-green-600 font-medium">Placement Rate</div>
                      {location.placement && location.placement > 80 && <TrendingUp className="h-3 w-3 text-green-500 mx-auto mt-1" />}
                      {location.placement && location.placement < 50 && <TrendingDown className="h-3 w-3 text-red-500 mx-auto mt-1" />}
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-700">{location.research}</div>
                      <div className="text-xs text-purple-600 font-medium">Research Score</div>
                    </div>
                    <div className={`p-3 rounded-lg text-center ${
                      location.dropout && location.dropout > 15 ? 'bg-red-50' : 
                      location.dropout && location.dropout > 8 ? 'bg-orange-50' : 'bg-green-50'
                    }`}>
                      <div className={`text-xl font-bold ${
                        location.dropout && location.dropout > 15 ? 'text-red-700' : 
                        location.dropout && location.dropout > 8 ? 'text-orange-700' : 'text-green-700'
                      }`}>{location.dropout}%</div>
                      <div className={`text-xs font-medium ${
                        location.dropout && location.dropout > 15 ? 'text-red-600' : 
                        location.dropout && location.dropout > 8 ? 'text-orange-600' : 'text-green-600'
                      }`}>Dropout Rate</div>
                    </div>
                  </div>
                )}

                {/* Action Alerts */}
                {location.performance === 'critical' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <h4 className="font-semibold text-red-900">Critical - Immediate Action Required</h4>
                    </div>
                    <p className="text-sm text-red-800 mb-2">
                      High dropout rate ({location.dropout}%) and poor placement statistics ({location.placement}%).
                    </p>
                    <div className="text-xs text-red-700">
                      <strong>Recommended Actions:</strong><br/>
                      • Schedule immediate inspection<br/>
                      • Enhance placement cell operations<br/>
                      • Faculty training programs<br/>
                      • Infrastructure assessment
                    </div>
                  </div>
                )}

                {location.performance === 'needs-attention' && (
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Clock className="h-4 w-4 text-orange-500 mr-2" />
                      <h4 className="font-semibold text-orange-900">Requires Improvement</h4>
                    </div>
                    <p className="text-sm text-orange-800">
                      Focus areas: Placement rates and research output. Consider industry partnerships.
                    </p>
                  </div>
                )}

                {location.performance === 'excellent' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <h4 className="font-semibold text-green-900">Exemplary Performance</h4>
                    </div>
                    <p className="text-sm text-green-800">
                      Outstanding metrics across all parameters. Share best practices with peer institutions.
                    </p>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
