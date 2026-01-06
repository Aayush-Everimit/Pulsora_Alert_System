import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/eventsApi";
import { Activity, ShieldAlert, MapPin, Clock, ChevronRight } from "lucide-react";

const ActiveAlertCard = ({ event }) => (
    <div className="bg-slate-900/50 backdrop-blur-md border border-amber-500/30 p-5 rounded-2xl shadow-lg group hover:border-amber-500 transition-all">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
                <ShieldAlert className="text-amber-500" size={24} />
            </div>
            <div className="flex-1">
                <h3 className="text-base font-black text-white leading-tight">{event.title}</h3>
                <p className="text-[10px] text-slate-400 mt-1 uppercase font-mono">{event.subtitle}</p>
                <Link to={`/alerts`} className="mt-4 inline-flex items-center bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 py-2 rounded-lg text-xs font-black transition-all">
                    RESPOND NOW <ChevronRight size={14} className="ml-1" />
                </Link>
            </div>
        </div>
    </div>
);

const RecentEventCard = ({ event }) => (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden group hover:bg-slate-800/60 transition-all">
        <div className={`h-24 flex items-center justify-center text-3xl ${getSeverityBgClass(event.severity)}`}>
            {event.type === "Fire" ? "🔥" : event.type === "Earthquake" ? "🌍" : event.type === "Flood" ? "🌊" : "⚠️"}
        </div>
        <div className="p-4">
            <h3 className="font-bold text-white text-sm truncate">{event.title}</h3>
            <div className="flex items-center text-[11px] text-slate-400 mt-2"><MapPin size={12} className="mr-1" /> {event.location}</div>
            <div className="flex items-center text-[11px] text-slate-500 mt-1"><Clock size={12} className="mr-1" /> {new Date(event.date).toLocaleDateString()}</div>
            <div className="mt-3 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Severity</span>
                <span className={`text-[10px] font-black uppercase ${getSeverityColorClass(event.severity)}`}>{event.severity || "N/A"}</span>
            </div>
        </div>
    </div>
);

const getSeverityColorClass = (severity) => {
    switch (severity?.toUpperCase()) {
        case "HIGH": return "text-red-500";
        case "MEDIUM": return "text-yellow-500";
        case "LOW": return "text-green-500";
        default: return "text-slate-400";
    }
};

const getSeverityBgClass = (severity) => {
    switch (severity?.toUpperCase()) {
        case "HIGH": return "bg-red-500/10";
        case "MEDIUM": return "bg-yellow-500/10";
        case "LOW": return "bg-green-500/10";
        default: return "bg-slate-700/20";
    }
};

function DashboardPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const getStoredUsername = () => {
        const raw = localStorage.getItem("username");
        if (!raw || raw === "undefined" || raw === "null") return "User";
        return raw;
    };

    const [username] = useState(getStoredUsername());
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
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-10">
                <h1 className="text-4xl font-black text-white tracking-tight italic uppercase">Welcome, {username}.</h1>
                <p className="text-slate-500 font-mono text-xs mt-2 uppercase tracking-[0.2em]">Live Monitoring System Active</p>
            </header>

            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-1 w-8 bg-amber-500 rounded-full"></div>
                    <h2 className="text-sm font-black text-slate-300 uppercase tracking-widest">Priority Actions</h2>
                </div>
                {activeAlerts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {activeAlerts.map((alert) => (
                            <ActiveAlertCard key={`alert-${alert.id}`} event={alert} />
                        ))}
                    </div>
                ) : (
                    !loading && !error && <p className="text-slate-500 font-mono text-sm">No active alerts requiring response.</p>
                )}
                {loading && <p className="text-slate-500 animate-pulse font-mono text-sm">Synchronizing data...</p>}
                {error && <p className="text-red-500 font-mono text-sm">{error}</p>}
            </section>

            <section>
                <div className="flex items-center gap-2 mb-6">
                    <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
                    <h2 className="text-sm font-black text-slate-300 uppercase tracking-widest">Regional Activity Log</h2>
                </div>
                {!loading && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {events.slice(0, 8).map((event) => (
                            <RecentEventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default DashboardPage;