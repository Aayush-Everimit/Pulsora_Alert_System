import React, { useState, useEffect } from "react";
import { getAllEvents } from "../services/eventsApi";

export default function DashboardPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllEvents();
        console.log(
          "DashboardPage: events data =",
          data,
          "isArray?",
          Array.isArray(data)
        );
        setEvents(data);
      } catch (error) {
        console.log("Error Encountered in Dashboard get events" + error);
        setError("Failed to fetch events. Please try again later.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <nav className="flex justify-center space-x-4">
        <a
          href="/dashboard"
          className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          Home
        </a>
        <a
          href="/team"
          className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          Team
        </a>
        <a
          href="/projects"
          className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          Projects
        </a>
        <a
          href="/reports"
          className="font-medium rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        >
          Reports
        </a>
      </nav>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">Loading events...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Success State (Data Loaded) */}
      {!loading && !error && (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg shadow-lg">
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={event.imageSrc || ""}
                  alt={event.title}
                />
                <div className="p-4">
                  <div className="text-xs font-bold text-sky-500">
                    {event.category || "EVENT"}
                  </div>
                  <div className="mt-1 font-bold text-gray-700">
                    <a href={event.url || "#"} className="hover:underline">
                      {event.title || "Event Title"}
                    </a>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {event.date
                      ? new Date(event.date).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
