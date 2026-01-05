import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import { Check, Loader2 } from "lucide-react";

function MyAlertsPage() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [respondingId, setRespondingId] = useState(null);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        if (!userId) return;

        const loadAlerts = async () => {
            try {
                setLoading(true);

                // Fetch events, user responses, and AI responses
                const [eventsRes, responsesRes, aiRes] = await Promise.all([
                    apiClient.get("/api/v1/disaster-events"),
                    apiClient.get("/api/v1/user-responses"),
                    apiClient.get(`/api/v1/ai-responses/user/${userId}`),
                ]);

                const events = eventsRes.data || [];
                const responses = responsesRes.data || [];
                const aiResponses = aiRes.data || [];

                // Combine data correctly
                const combined = events.map((event) => {
                    const userResponse = responses.find(
                        (r) =>
                            r.user?.id === Number(userId) &&
                            r.disasterEvent?.id === event.id
                    );

                    // ✅ Use eventId instead of disasterEvent.id
                    const aiResponse = aiResponses.find(
                        (a) => a.eventId === event.id
                    );

                    return {
                        id: event.id,
                        eventType: event.eventType,
                        location: event.location,
                        severity: event.severity,
                        timestamp: event.timeStamp,
                        userResponse,
                        aiResponse,
                    };
                });

                setAlerts(combined);
            } catch (err) {
                console.error("❌ Failed to load alerts:", err);
            } finally {
                setLoading(false);
            }
        };

        loadAlerts();
    }, [userId]);

    const handleResponse = async (eventId, responseType) => {
        setRespondingId(eventId);
        try {
            // Step 1️⃣ — Submit user response
            await apiClient.post("/api/v1/user-responses", {
                userId: Number(userId),
                disasterEventId: eventId,
                responseType,
                description: "",
            });

            // Step 2️⃣ — Wait 5 seconds (allow Gemini + DB to complete)
            await new Promise((res) => setTimeout(res, 5000));

            // Step 3️⃣ — Fetch AI response (auto-generates if missing)
            const aiRes = await apiClient.get(
                `/api/v1/ai-responses/user/${userId}/event/${eventId}`
            );
            const aiResponse = aiRes.data || null;

            // Step 4️⃣ — Update UI
            setAlerts((prev) =>
                prev.map((a) =>
                    a.id === eventId
                        ? {
                            ...a,
                            userResponse: { response: responseType },
                            aiResponse,
                        }
                        : a
                )
            );
        } catch (err) {
            console.error("❌ Failed to submit or fetch AI response:", err);
            alert("Failed to submit response. Try again.");
        } finally {
            setRespondingId(null);
        }
    };


    if (loading)
        return (
            <div className="text-center text-slate-400 mt-20">
                <Loader2 className="animate-spin inline mr-2" />
                Loading Alerts...
            </div>
        );

    return (
        <div className="text-gray-200">
            <h1 className="text-3xl font-bold mb-6">My Alerts</h1>

            {alerts.length === 0 && (
                <p className="italic text-gray-400">No disaster events yet.</p>
            )}

            <div className="space-y-6 max-w-3xl">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="bg-slate-800 p-6 rounded-xl border-l-4 border-blue-500 shadow-lg"
                    >
                        <h2 className="text-lg font-bold text-white">
                            {alert.eventType} — {alert.location}
                        </h2>
                        <p className="text-sm text-gray-400 mt-1">
                            Severity: {alert.severity}
                        </p>

                        {/* Case 1️⃣: Not responded yet */}
                        {!alert.userResponse && (
                            <div className="mt-4">
                                <p className="text-sm text-blue-400 font-semibold">
                                    Did you experience this event?
                                </p>
                                <div className="flex gap-3 mt-3">
                                    <button
                                        onClick={() => handleResponse(alert.id, "FELT")}
                                        disabled={respondingId === alert.id}
                                        className="px-5 py-2 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 transition disabled:opacity-50"
                                    >
                                        {respondingId === alert.id
                                            ? "Submitting..."
                                            : "I FELT IT"}
                                    </button>
                                    <button
                                        onClick={() => handleResponse(alert.id, "NOT_FELT")}
                                        disabled={respondingId === alert.id}
                                        className="px-5 py-2 text-xs font-bold rounded-lg bg-slate-700 hover:bg-slate-600 transition disabled:opacity-50"
                                    >
                                        {respondingId === alert.id
                                            ? "Submitting..."
                                            : "I DID NOT FEEL IT"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Case 2️⃣: Responded + AI response available */}
                        {alert.userResponse && alert.aiResponse && (
                            <div className="mt-4">
                                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                                    <Check size={16} /> Response acknowledged —{" "}
                                    {alert.userResponse.response}
                                </div>

                                <div className="mt-2">
                                    <p className="text-sm text-blue-400 font-semibold">
                                        AI Situation Summary
                                    </p>
                                    <p className="text-sm mt-1 text-gray-300">
                                        {alert.aiResponse.aggregateSummary ||
                                            "No summary available."}
                                    </p>
                                </div>

                                <div className="mt-3">
                                    <p className="text-sm text-green-400 font-semibold">
                                        Recommended Action
                                    </p>
                                    <p className="text-sm mt-1 text-gray-300 whitespace-pre-line">
                                        {alert.aiResponse.recommendedAction ||
                                            "No recommendation yet."}
                                    </p>
                                </div>

                                <p className="mt-3 text-xs text-gray-500">
                                    Generated at{" "}
                                    {new Date(alert.aiResponse.createdAt).toLocaleString()}
                                </p>
                            </div>
                        )}

                        {/* Case 3️⃣: Responded but AI not ready yet */}
                        {alert.userResponse && !alert.aiResponse && (
                            <div className="mt-4 text-slate-400 text-sm italic">
                                Response recorded — waiting for AI analysis...
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyAlertsPage;
