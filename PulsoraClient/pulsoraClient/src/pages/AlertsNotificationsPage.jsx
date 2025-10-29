import React, { useState, useEffect } from "react";

// TODO: Import API functions
// import { getUserNotifications } from '../services/notificationsApi'; // Needs to be created
// import { submitUserResponse } from '../services/responseApi'; // Needs to be created

const placeholderNotifications = [
  {
    id: 1,
    type: "INITIAL_CONFIRMATION",
    eventId: 101,
    eventType: "Earthquake",
    location: "Delhi",
    timeStamp: new Date(Date.now() - 3600000).toISOString(),
    message: "Did you experience this event? Please respond.",
    responded: false,
  },
  {
    id: 2,
    type: "GENERAL_GUIDELINE",
    eventId: 101,
    eventType: "Earthquake",
    location: "Delhi",
    timeStamp: new Date(Date.now() - 7200000).toISOString(),
    message:
      "General Safety Guidelines: Drop, Cover, and Hold On during aftershocks. Check for injuries and damage.",
    responded: true,
  }, // Not actionable
  {
    id: 3,
    type: "INITIAL_CONFIRMATION",
    eventId: 102,
    eventType: "Flood",
    location: "Mumbai",
    timeStamp: new Date(Date.now() - 86400000).toISOString(),
    message: "Did you experience this event? Please respond.",
    responded: true,
  }, // Already responded
  {
    id: 4,
    type: "PERSONALIZED_GUIDANCE",
    eventId: 102,
    eventType: "Flood",
    location: "Mumbai",
    timeStamp: new Date(Date.now() - 86000000).toISOString(),
    message:
      "Personalized Guidance: Evacuation recommended for your area. Seek higher ground immediately.",
    responded: false,
  },
];

function AlertsNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondingId, setRespondingId] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setNotifications(
          placeholderNotifications.sort(
            (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
          )
        );
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError("Failed to load notifications.");
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, []);

  const handleResponse = async (notificationId, eventId, responseType) => {
    setRespondingId(notificationId);
    console.log(
      `Responding to notification ${notificationId} for event ${eventId} with: ${responseType}`
    );
    try {
      // TODO: Call API: await submitUserResponse({ userId: /* get from auth */, disasterEventId: eventId, response: responseType })
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API call

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, responded: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to submit response:", err);
    } finally {
      setRespondingId(null);
    }
  };

  const getBorderColor = (type) => {
    if (type === "INITIAL_CONFIRMATION") return "border-yellow-500";
    if (type === "PERSONALIZED_GUIDANCE") return "border-blue-500";
    return "border-gray-600";
  };

  return (
    <div className="text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Your Alerts & Notifications</h1>

      {loading && (
        <p className="italic text-gray-400">Loading notifications...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4 max-w-2xl">
          {notifications.length === 0 ? (
            <p className="italic text-gray-500">
              You have no new alerts or notifications.
            </p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`bg-[#1e293b] p-4 rounded-lg shadow-md border-l-4 ${getBorderColor(
                  notif.type
                )}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      {notif.eventType} in {notif.location}
                    </h2>
                    <p className="text-sm text-gray-400">{notif.message}</p>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0 ml-4 pt-1">
                    {new Date(notif.timeStamp).toLocaleTimeString()} -{" "}
                    {new Date(notif.timeStamp).toLocaleDateString()}
                  </span>
                </div>

                {notif.type === "INITIAL_CONFIRMATION" && !notif.responded && (
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() =>
                        handleResponse(notif.id, notif.eventId, "FELT")
                      }
                      disabled={respondingId === notif.id}
                      className="px-4 py-1.5 rounded text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {respondingId === notif.id
                        ? "Sending..."
                        : "Yes, I Felt It"}
                    </button>
                    <button
                      onClick={() =>
                        handleResponse(notif.id, notif.eventId, "NOT_FELT")
                      }
                      disabled={respondingId === notif.id}
                      className="px-4 py-1.5 rounded text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {respondingId === notif.id
                        ? "Sending..."
                        : "No, I Didn't Feel It"}
                    </button>
                  </div>
                )}
                {notif.type === "INITIAL_CONFIRMATION" && notif.responded && (
                  <p className="mt-3 text-sm text-green-400 italic">
                    ✓ Response Received
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AlertsNotificationsPage;
