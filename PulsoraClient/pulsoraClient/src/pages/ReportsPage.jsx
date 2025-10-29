import React, { useState, useEffect } from "react";
import { getAllEvents } from "../services/eventsApi";

const MapPlaceholder = () => (
  <div className="h-64 md:h-[450px] bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 mb-6 border border-gray-600">
    Global Event Heatmap
  </div>
);

const StatCard = ({ title, value, icon }) => (
  <div className="bg-[#1e293b] p-4 rounded-lg shadow-md flex items-center space-x-3">
    <div className="text-3xl text-indigo-400">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-gray-400 uppercase">{title}</h3>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  </div>
);

const getSeverityColorClass = (severity) => {
  switch (severity?.toUpperCase()) {
    case "HIGH":
      return "text-red-500";
    case "MEDIUM":
      return "text-yellow-500";
    case "LOW":
      return "text-green-500";
    default:
      return "text-gray-400";
  }
};

function ReportsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllEvents();
        setEvents(
          data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp))
        );
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load report data.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const totalEvents = events.length;
  const activeAlerts = events.filter(
    (e) => e.status === "REPORTED" || e.status === "CONFIRMED"
  ).length;

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Global Event Reports</h1>

      <MapPlaceholder />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total Events Recorded"
          value={totalEvents}
          icon={"🌍"}
        />
        <StatCard title="Active Alerts" value={activeAlerts} icon={"🔔"} />
        <StatCard title="Total Impacted (Est.)" value={"N/A"} icon={"👥"} />
      </div>

      <h2 className="text-2xl font-semibold mb-4">Event Summary</h2>
      <div className="bg-[#1e293b] rounded-lg shadow-md overflow-x-auto">
        {loading && (
          <p className="text-gray-400 p-4 italic">Loading event data...</p>
        )}
        {error && <p className="text-red-500 p-4">{error}</p>}
        {!loading && !error && (
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-[#334155]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Magnitude
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date/Time Reported
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#1e293b] divide-y divide-gray-700">
              {events.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No event data available
                  </td>
                </tr>
              ) : (
                events.slice(0, 20).map((event) => (
                  <tr key={event.id} className="hover:bg-[#334155]/50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {event.eventType || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {event.location || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {event.magnitude || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span
                        className={`font-semibold ${getSeverityColorClass(
                          event.severity
                        )}`}
                      >
                        {event.severity || "-"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                      {event.status || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                      {event.timeStamp
                        ? new Date(event.timeStamp).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ReportsPage;
