import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ShieldPlus, UserPlus, Mail, Lock, ChevronRight } from "lucide-react";

export default function RegistrationPage() {
    const { register } = useAuth();
    const navigate = useNavigate();

    // 🔐 LOGIC PRESERVED: Exactly as provided
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form.username, form.email, form.password);
            alert("Registered successfully");
            navigate("/login");
        } catch {
            alert("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden font-sans">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-md w-full relative z-10 px-6 animate-in fade-in zoom-in duration-500">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20 mb-4 shadow-2xl">
                        <ShieldPlus className="w-10 h-10 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">Create <span className="text-blue-500">Profile</span></h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2 font-mono">Pulsora Network Enrollment</p>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Username Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <UserPlus size={12} /> Assigned Username
                            </label>
                            <input
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                                placeholder="e.g. Operator_01"
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Mail size={12} /> Communication Channel
                            </label>
                            <input
                                type="email"
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                                placeholder="name@pulsora.sys"
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                                <Lock size={12} /> Access Passcode
                            </label>
                            <input
                                type="password"
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-3.5 text-white text-sm outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                                placeholder="••••••••"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl tracking-[0.2em] shadow-xl shadow-blue-600/30 transition-all active:scale-95 uppercase italic flex items-center justify-center gap-2 group">
                                Authorize Enrollment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                        <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                            Already Enrolled? <Link to="/login" className="text-blue-500 hover:text-blue-400 transition-colors ml-1">Access Terminal</Link>
                        </p>
                    </div>
                </div>

                {/* System Footer Decoration */}
                <div className="mt-8 flex justify-center gap-4 opacity-30">
                    <div className="h-1 w-12 bg-slate-800 rounded-full"></div>
                    <div className="h-1 w-4 bg-blue-600 rounded-full"></div>
                    <div className="h-1 w-12 bg-slate-800 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}