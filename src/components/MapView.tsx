import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

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
        case 'excellent': return '#22c55e'; // Green
        case 'good': return '#3b82f6'; // Blue
        case 'average': return '#eab308'; // Yellow
        case 'needs-attention': return '#f97316'; // Orange
        case 'critical': return '#ef4444'; // Red
        default: return '#6b7280'; // Gray
      }
    };

    const getPerformanceIcon = () => {
      switch (location.performance) {
        case 'excellent': return '⭐';
        case 'good': return '✓';
        case 'average': return '○';
        case 'needs-attention': return '⚠';
        case 'critical': return '⚠';
        default: return '📍';
      }
    };

    return L.divIcon({
      html: `<div style="background-color: ${getPerformanceColor()}; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 3px 6px rgba(0,0,0,0.4); font-size: 12px; font-weight: bold;">
        ${getPerformanceIcon()}
      </div>`,
      className: 'custom-performance-marker',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });
  };

export const MapView = ({ locations, center = [20.5937, 78.9629], zoom = 5 }: MapViewProps) => {
  return (
    <div className="h-64 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
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
            <Popup maxWidth={300}>
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{location.name}</h3>
                  {location.performance === 'excellent' && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {location.performance === 'critical' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                  {location.performance === 'needs-attention' && <Clock className="h-5 w-5 text-orange-500" />}
                </div>

                {location.city && (
                  <p className="text-sm text-gray-600 mb-2">
                    {location.city} • {location.type} • {location.students} students
                  </p>
                )}

                {location.nirfRank && (
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="font-bold text-blue-700">#{location.nirfRank}</div>
                      <div className="text-blue-600">NIRF Rank</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <div className="font-bold text-green-700">{location.placement}%</div>
                      <div className="text-green-600">Placement</div>
                    </div>
                    <div className="bg-purple-50 p-2 rounded">
                      <div className="font-bold text-purple-700">{location.research}</div>
                      <div className="text-purple-600">Research</div>
                    </div>
                    <div className="bg-red-50 p-2 rounded">
                      <div className="font-bold text-red-700">{location.dropout}%</div>
                      <div className="text-red-600">Dropout</div>
                    </div>
                  </div>
                )}

                <div className={`p-2 rounded-md text-xs ${
                  location.performance === 'excellent' ? 'bg-green-100 text-green-800' :
                  location.performance === 'good' ? 'bg-blue-100 text-blue-800' :
                  location.performance === 'average' ? 'bg-yellow-100 text-yellow-800' :
                  location.performance === 'needs-attention' ? 'bg-orange-100 text-orange-800' :
                  location.performance === 'critical' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  <strong>Status:</strong> {location.performance === 'needs-attention' ? 'Needs Attention' :
                    location.performance?.charAt(0).toUpperCase() + location.performance?.slice(1)}
                </div>

                {location.performance === 'critical' && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-xs text-red-700 font-medium">
                      ⚠️ Immediate intervention required for this institution
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