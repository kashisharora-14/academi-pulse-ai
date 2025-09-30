import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Fix for default marker icon
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Location {
  id: string;
  name: string;
  position: [number, number];
  data: string;
}

interface MapViewProps {
  locations: Location[];
  center?: [number, number];
  zoom?: number;
}

const MapView = ({ locations, center = [20.5937, 78.9629], zoom = 5 }: MapViewProps) => {
  return (
    <div style={{ height: "400px", width: "100%", borderRadius: "8px" }}>
      <MapContainer
        // @ts-ignore - react-leaflet types issue
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", borderRadius: "8px" }}
        className="z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((location) => (
          // @ts-ignore - react-leaflet types issue
          <Marker key={location.id} position={location.position} icon={icon}>
            <Popup>
              <div>
                <h3 className="font-bold">{location.name}</h3>
                <p className="text-sm">{location.data}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export { MapView };
