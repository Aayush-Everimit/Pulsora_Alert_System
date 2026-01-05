import React, { useState, useEffect } from "react";
import apiClient from "../services/api";
import { User, Mail, MapPin, Bell, Save } from "lucide-react";

function SettingsPage() {
    const userId = localStorage.getItem("userId");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await apiClient.get(`/api/v1/users/${userId}`);
                setName(res.data.username ?? "");
                setEmail(res.data.email ?? "");
                setLocation(res.data.location ?? "");
            } catch (err) { console.error(err); }
        };
        fetchUser();
    }, [userId]);

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await apiClient.put(`/api/v1/users/${userId}`, { username: name, email, location });
            setSaveMessage({ type: "success", text: "Database entry updated." });
        } catch (err) {
            setSaveMessage({ type: "error", text: "Update failed." });
        } finally { setIsSaving(false); }
    };

    return (
        <div className="max-w-3xl animate-in fade-in duration-700">
            <h1 className="text-4xl font-black text-white tracking-tight italic uppercase mb-10">Configuration</h1>

            {saveMessage.text && (
                <div className={`mb-6 p-4 rounded-xl font-mono text-xs font-bold uppercase ${saveMessage.type === "success" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                    {saveMessage.text}
                </div>
            )}

            <div className="bg-slate-900/40 backdrop-blur-md rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl mb-8">
                <div className="px-8 py-6 bg-slate-800/30 border-b border-slate-800 flex items-center gap-3">
                    <User className="text-blue-500" size={18}/>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Operator Profile</h2>
                </div>
                <form onSubmit={handleProfileSave} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Username</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Duty Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <button type="submit" disabled={isSaving} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase italic tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
                        <Save size={16}/> {isSaving ? "Synchronizing..." : "Update Credentials"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SettingsPage;