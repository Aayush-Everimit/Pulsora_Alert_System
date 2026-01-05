import React, { useEffect, useState } from "react";
import { getAIResponsesByUser } from "../services/aiResponseApi";

function MyAlertsPage() {
    const [alerts, setAlerts] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const loadAlerts = async () => {
            const data = await getAIResponsesByUser(userId);
            setAlerts(data);
        };
        loadAlerts();
    }, [userId]);

    return (
        <div className="text-gray-200">
            <h1 className="text-3xl font-bold mb-6">My Alerts</h1>

            {alerts.length === 0 && (
                <p className="italic text-gray-400">No AI alerts yet.</p>
            )}

            <div className="space-y-6 max-w-3xl">
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        className="bg-slate-800 p-5 rounded-xl border-l-4 border-blue-500"
                    >
                        <h2 className="text-lg font-bold text-white">
                            {alert.disasterEvent.eventType} — {alert.disasterEvent.location}
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            Severity: {alert.disasterEvent.severity}
                        </p>

                        <div className="mt-4">
                            <p className="text-sm text-blue-400 font-semibold">
                                AI Situation Summary
                            </p>
                            <p className="text-sm mt-1 text-gray-300">
                                {alert.aggregateSummary}
                            </p>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-green-400 font-semibold">
                                Recommended Action
                            </p>
                            <p className="text-sm mt-1 text-gray-300">
                                {alert.recommendedAction}
                            </p>
                        </div>

                        <p className="mt-3 text-xs text-gray-500">
                            Generated at {new Date(alert.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyAlertsPage;
