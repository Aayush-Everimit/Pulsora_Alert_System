import React, { useState, useEffect } from "react";
import { getAllEvents } from "../services/eventsApi";
import { Activity, Users, MessageCircle } from "lucide-react";
import HeatMap from "../components/Heatmap.jsx";
import apiClient from "../services/api.js";

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-slate-800 shadow-xl group">
        <div className="flex items-center gap-4">
            <div
                className={`p-4 rounded-2xl bg-slate-800 border border-slate-700 group-hover:scale-110 transition-transform ${color}`}
            >
                {icon}
            </div>
            <div>
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    {title}
                </h3>
                <p className="text-3xl font-black text-white italic mt-1">{value}</p>
            </div>
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
            return "text-slate-500";
    }
};

function ReportsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [yourResponses, setYourResponses] = useState(0);
    const [totalResponses, setTotalResponses] = useState(0);

    const userId = localStorage.getItem("userId");

    // 🔹 Load all disaster events
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getAllEvents();
                const eventData = Array.isArray(data) ? data : [];
                setEvents(
                    eventData.sort(
                        (a, b) => new Date(b.timeStamp) - new Date(a.timeStamp)
                    )
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

    // 🔹 Load response counts
    useEffect(() => {
        const loadCounts = async () => {
            try {
                let total = 0;

                // 🧮 Loop through events and get total felt responses for each
                for (const e of events) {
                    const res = await apiClient.get(
                        `/api/v1/user-responses/count/felt/${e.id}`
                    );
                    total += res.data || 0;
                }
                setTotalResponses(total);

                // 👤 Get user's total response count
                if (userId) {
                    const yourRes = await apiClient.get(
                        `/api/v1/user-responses/count/user/${userId}`
                    );
                    setYourResponses(yourRes.data || 0);
                }
            } catch (err) {
                console.error("❌ Failed to load response counts:", err);
            }
        };

        if (events.length > 0) {
            loadCounts();
        }
    }, [events, userId]);

    const totalEvents = events.length;

    return (
        <div className="animate-in fade-in duration-700">
            <div className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-tight italic uppercase">
                    Event Analysis
                </h1>
                <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-[0.2em]">
                    Global Incident Database & Analytics
                </p>
            </div>

            {/* Map */}
            <div className="h-[450px] bg-slate-900/60 rounded-[2.5rem] border border-slate-800 mb-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none z-10"></div>
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
                    <HeatMap />
                </div>
                <div className="absolute bottom-6 right-8 bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 z-20">
                    <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
                        <span className="text-blue-400 font-mono text-[10px] tracking-widest uppercase">
              System_Live // {loading ? "Syncing" : "Active"}
            </span>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard
                    title="Your Responses"
                    value={loading ? "..." : yourResponses}
                    icon={<Activity />}
                    color="text-blue-500"
                />
                <StatCard
                    title="Total Responses"
                    value={loading ? "..." : totalResponses}
                    icon={<Users />}
                    color="text-emerald-500"
                />
                <StatCard
                    title="Est. Population"
                    value={"4.2M"}
                    icon={<MessageCircle />}
                    color="text-purple-500"
                />
            </div>

            {/* Table */}
            <div className="bg-slate-900/40 backdrop-blur-md rounded-[2.5rem] border border-slate-800 shadow-2xl overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
                    <h2 className="text-sm font-black text-white uppercase tracking-widest italic">
                        Raw Event Summary
                    </h2>
                    {error && (
                        <span className="text-red-500 text-[10px] font-mono">{error}</span>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-800">
                        <thead className="bg-slate-800/20 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        <tr>
                            <th className="px-6 py-4 text-left">Transmission</th>
                            <th className="px-6 py-4 text-left">Location</th>
                            <th className="px-6 py-4 text-left">Mag</th>
                            <th className="px-6 py-4 text-left">Severity</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-sm">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-10 text-center text-slate-500 font-mono animate-pulse"
                                >
                                    FETCHING_DATA_FROM_GRID...
                                </td>
                            </tr>
                        ) : (
                            events.map((event) => (
                                <tr
                                    key={event.id}
                                    className="hover:bg-blue-500/5 transition-colors"
                                >
                                    <td className="px-6 py-4 font-bold text-slate-300 italic">
                                        {event.eventType}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                                        {event.location}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {event.magnitude || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                      <span
                          className={`font-black ${getSeverityColorClass(
                              event.severity
                          )}`}
                      >
                        {event.severity}
                      </span>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ReportsPage;
