import React from "react";
import { Link } from "react-router-dom";
import { Unplug, Home } from "lucide-react";

function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white px-4 text-center">
            <div className="relative mb-8">
                <Unplug size={80} className="text-slate-700 animate-pulse" />
                <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
            </div>

            <h1 className="text-8xl font-black text-slate-800 tracking-tighter">404</h1>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-widest italic">Signal Lost / Link Severed</h2>
            <p className="text-slate-400 mb-8 max-w-md font-mono text-sm">
                The requested coordinates do not exist in the Pulsora database.
                Possible unauthorized access or moved directory.
            </p>

            <Link
                to="/"
                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase italic hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20"
            >
                <Home size={18} /> Re-route to Home
            </Link>
        </div>
    );
}

export default NotFoundPage;