import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { fetchHeatMapData } from "../services/heatMapApi.js";
import "leaflet/dist/leaflet.css"; // Ensure CSS is imported

const getColorBySeverity = (severity) => {
    switch (severity?.toUpperCase()) {
        case "HIGH": return "#ef4444";
        case "MEDIUM": return "#f59e0b";
        case "LOW": return "#22c55e";
        default: return "#3b82f6";
    }
};

export default function HeatMap() {
    const [points, setPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHeatMapData()
            .then((data) => {
                const validPoints = (data || []).filter(
                    (p) => p.latitude !== null && p.longitude !== null
                );
                setPoints(validPoints);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full bg-slate-900/20 text-blue-400 font-mono text-xs">
                INITIALIZING_MAP_SENSORS...
            </div>
        );
    }

    return (
        <MapContainer
            center={[28.6139, 77.2090]}
            zoom={5}
            className="h-full w-full z-0"
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {points.map((p, i) => (
                <CircleMarker
                    key={`${p.id || i}`}
                    center={[parseFloat(p.latitude), parseFloat(p.longitude)]}
                    radius={p.magnitude ? Math.max(6, p.magnitude * 2) : 8}
                    pathOptions={{
                        color: getColorBySeverity(p.severity),
                        fillColor: getColorBySeverity(p.severity),
                        fillOpacity: 0.6,
                        weight: 2
                    }}
                >
                    <Popup className="hacker-popup">
                        <div className="font-mono text-xs">
                            <strong className="text-white">EVENT:</strong> {p.eventType || "Unknown"}<br />
                            <strong className="text-white">SEVERITY:</strong> {p.severity}<br />
                            <strong className="text-white">MAG:</strong> {p.magnitude || "N/A"}
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}