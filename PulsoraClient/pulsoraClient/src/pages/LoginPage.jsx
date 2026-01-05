import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ShieldAlert, Zap } from "lucide-react";

const PulsoraLogo = () => (
    <div className="flex flex-col items-center mb-10 group">
        <div className="p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20 mb-4 shadow-2xl transition-all group-hover:bg-blue-600/20">
            <Zap className="w-10 h-10 text-blue-500" />
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Pulsora <span className="text-blue-500 font-normal">OS</span></h1>
        <div className="w-12 h-1 bg-blue-500 mt-2 rounded-full"></div>
    </div>
);

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(identifier, password);
            navigate("/");
        } catch (err) {
            setError("AUTHENTICATION_FAILURE: Invalid credentials.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020617] relative overflow-hidden font-sans">
            <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>

            <div className="max-w-md w-full relative z-10 px-6">
                <PulsoraLogo />

                <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
                    <h2 className="text-xl font-bold text-center text-slate-200 mb-8 uppercase tracking-widest italic">Terminal Access</h2>

                    {error && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-mono text-center rounded-xl uppercase font-bold tracking-tighter">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Channel ID (Email)</label>
                            <input
                                type="email"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                                placeholder="name@pulsora.sys"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Key (Password)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-blue-500 transition-all placeholder:text-slate-700"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" size="text-[11px]" className="text-[11px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest">Forgot Code?</Link>
                        </div>

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl tracking-[0.2em] shadow-xl shadow-blue-600/30 transition-all active:scale-95 uppercase italic">
                            Initialize Login
                        </button>
                    </form>

                    <p className="mt-8 text-center text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                        Unauthorized? <Link to="/register" className="text-blue-500 hover:text-blue-400">Request Access</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;