import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/eventsApi";

const ActiveAlertCard = ({ event }) => (
  <div className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-yellow-600 transform transition duration-300 hover:scale-105">
    <h3 className="text-base font-semibold text-yellow-400">{event.title}</h3>
    <p className="text-xs text-gray-400 mb-3">{event.subtitle}</p>
    <Link
      to={`/alerts`}
      className="inline-block bg-yellow-500 text-gray-900 px-3 py-1 rounded text-xs font-bold hover:bg-yellow-400"
    >
      Respond Now
    </Link>
  </div>
);

const RecentEventCard = ({ event }) => (
  <div className="bg-[#1e293b] rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:-translate-y-1">
    {/* Placeholder image/icon area */}
    <div
      className={`h-32 bg-[#334155] flex items-center justify-center text-4xl ${getSeverityBgClass(
        event.severity
      )}`}
    >
      {event.type === "Fire"
        ? "🔥"
        : event.type === "Earthquake"
        ? "🌍"
        : event.type === "Flood"
        ? "🌊"
        : "❓"}
    </div>
    <div className="p-3">
      <h3 className="font-semibold text-sm text-white truncate">
        {event.title}
      </h3>
      <p className="text-xs text-gray-400">{event.location}</p>
      <p className="text-xs text-gray-500 mt-1">
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-xs mt-1">
        Severity:{" "}
        <span className={`font-bold ${getSeverityColorClass(event.severity)}`}>
          {event.severity || "N/A"}
        </span>
      </p>
    </div>
  </div>
);

// Helper functions for styling severity
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
const getSeverityBgClass = (severity) => {
  switch (severity?.toUpperCase()) {
    case "HIGH":
      return "bg-red-900 bg-opacity-30";
    case "MEDIUM":
      return "bg-yellow-900 bg-opacity-30";
    case "LOW":
      return "bg-green-900 bg-opacity-30";
    default:
      return "bg-gray-700";
  }
};

function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = "Aayush";

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllEvents();
        const formattedEvents = data
          .map((ev) => ({
            id: ev.id,
            title: `${ev.eventType || "Event"}`,
            subtitle: `Magnitude: ${ev.magnitude || "N/A"}`,
            type: ev.eventType,
            location: ev.location || "Unknown Location",
            date: ev.timeStamp || new Date().toISOString(),
            severity: ev.severity,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(formattedEvents);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Is the backend running?");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const activeAlerts = events
    .slice(0, 3)
    .map((e) => ({ ...e, title: `ALERT: ${e.title} - Did you feel it?` }));

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Welcome, {username}.</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          Active Alerts Requiring Action!
        </h2>
        {activeAlerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeAlerts.map((alert) => (
              <ActiveAlertCard key={`alert-${alert.id}`} event={alert} />
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-500 italic">
              No active alerts requiring your response.
            </p>
          )
        )}

        {loading && (
          <p className="text-gray-500 italic">Checking for alerts...</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Events Near You</h2>
        {loading && (
          <p className="text-gray-500 italic">Loading recent events...</p>
        )}

        {!loading && !error && (
          <>
            {events.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {events.slice(0, 8).map((event) => (
                  <RecentEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                No recent events found near you.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
