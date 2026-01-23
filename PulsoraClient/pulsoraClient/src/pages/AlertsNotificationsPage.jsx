import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import { Bell, Check, Clock } from "lucide-react";

function AlertsNotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [respondingId, setRespondingId] = useState(null);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;

        const loadAlerts = async () => {
            setLoading(true);
            setError(null);

            try {

                const eventsRes = await apiClient.get("/api/v1/disaster-events");
                const responsesRes = await apiClient.get("/api/v1/user-responses");

                const events = eventsRes.data || [];
                const responses = (responsesRes.data || []).filter(
                    (r) => r.user?.id === Number(userId)
                );


                const alerts = events.map((event) => {
                    const userResponse = responses.find(
                        (r) => r.disasterEvent?.id === event.id
                    );

                    return {
                        id: event.id,
                        type: "INITIAL_CONFIRMATION",
                        eventId: event.id,
                        eventType: event.eventType,
                        location: event.location,
                        timeStamp: event.timeStamp,
                        message: "Did you experience this event? Please respond.",
                        responded: Boolean(userResponse),
                    };
                });

                alerts.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
                setNotifications(alerts);
            } catch (err) {
                console.error("Failed to load alerts:", err);
                setError("Failed to load alerts.");
            } finally {
                setLoading(false);
            }
        };

        loadAlerts();
    }, [userId]);


    const handleResponse = async (notificationId, eventId, responseType) => {
        setRespondingId(notificationId);
        try {
            await apiClient.post("/api/v1/user-responses", {
                userId: Number(userId),
                disasterEventId: eventId,
                responseType,
                description: "",
            });

            setNotifications((prev) =>
                prev.map((n) =>
                    n.id === notificationId ? { ...n, responded: true } : n
                )
            );
        } catch (err) {
            console.error("Failed to submit response:", err);
            alert("Failed to submit response. Try again.");
        } finally {
            setRespondingId(null);
        }
    };

    const getBorderColor = (type) => {
        if (type === "INITIAL_CONFIRMATION") return "border-blue-500";
        if (type === "PERSONALIZED_GUIDANCE") return "border-purple-500";
        return "border-slate-700";
    };

    return (
        <div className="max-w-4xl animate-in fade-in duration-700">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-tight uppercase italic flex items-center gap-3">
                    <Bell className="text-blue-500" /> Notifications
                </h1>
                <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-[0.2em]">
                    Incoming Transmissions & Requests
                </p>
            </div>

            {loading && (
                <div className="p-12 text-center text-slate-500 font-mono animate-pulse uppercase tracking-widest">
                    Scanning Channel...
                </div>
            )}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl font-mono text-sm">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="space-y-4">
                    {notifications.length === 0 ? (
                        <p className="text-slate-500 font-mono text-sm italic">
                            Transmission log empty.
                        </p>
                    ) : (
                        notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`bg-slate-900/40 backdrop-blur-sm p-6 rounded-2xl border-l-4 shadow-xl transition-all ${getBorderColor(
                                    notif.type
                                )} ${notif.responded ? "opacity-50" : ""}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-xl font-black text-white tracking-tight italic uppercase">
                                                {notif.eventType} Detection
                                            </h2>
                                            {!notif.responded && (
                                                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                            )}
                                        </div>
                                        <p className="text-[11px] font-black text-blue-400 font-mono uppercase tracking-widest">
                                            {notif.location}
                                        </p>
                                        <p className="text-sm text-slate-400 mt-3 leading-relaxed max-w-lg">
                                            {notif.message}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-slate-600 flex items-center gap-1">
                                        <Clock size={12} />{" "}
                                        {notif.timeStamp
                                            ? new Date(
                                                notif.timeStamp
                                            ).toLocaleString()
                                            : ""}
                                    </span>
                                </div>

                                {notif.type === "INITIAL_CONFIRMATION" &&
                                    !notif.responded && (
                                        <div className="mt-6 flex gap-3">
                                            <button
                                                onClick={() =>
                                                    handleResponse(
                                                        notif.id,
                                                        notif.eventId,
                                                        "FELT"
                                                    )
                                                }
                                                disabled={
                                                    respondingId === notif.id
                                                }
                                                className="px-6 py-2.5 rounded-xl text-xs font-black bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                                            >
                                                {respondingId === notif.id
                                                    ? "SYNCING..."
                                                    : "CONFIRM: I FELT IT"}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleResponse(
                                                        notif.id,
                                                        notif.eventId,
                                                        "NOT_FELT"
                                                    )
                                                }
                                                disabled={
                                                    respondingId === notif.id
                                                }
                                                className="px-6 py-2.5 rounded-xl text-xs font-black bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all disabled:opacity-50"
                                            >
                                                {respondingId === notif.id
                                                    ? "SYNCING..."
                                                    : "NEGATIVE"}
                                            </button>
                                        </div>
                                    )}

                                {notif.responded && (
                                    <div className="mt-4 flex items-center gap-2 text-emerald-400 font-black text-[10px] uppercase tracking-widest italic">
                                        <Check size={14} /> Response Acknowledged
                                    </div>
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
