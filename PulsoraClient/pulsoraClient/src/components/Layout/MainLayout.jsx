import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutDashboard, Bell, BarChart3, Settings, LogOut, ShieldAlert } from "lucide-react";
import logoImage from "../../assets/pulsora_logo.jpg";
import userImage from "../../assets/user.png";
import { useAuth } from "../../context/AuthContext";

const PulsoraLogo = () => (
    <Link to="/" className="flex items-center group transition-all duration-300">
        <img
            src={logoImage}
            alt="Pulsora Logo"
            className="w-32 h-14 object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
        />
    </Link>
);

const UserAvatar = () => {
    const { user } = useAuth();
    return (
        <div className="flex items-center space-x-4 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md">
            <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{user?.username || "Operator"}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-mono font-bold">Authenticated</p>
            </div>
            <div className="relative group">
                <img
                    className="w-9 h-9 rounded-full border-2 border-blue-500/50"
                    src={userImage}
                    alt="Avatar"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

function MainLayout() {
    const { logout } = useAuth();

    const navLinkClass = ({ isActive }) =>
        `flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
            isActive
                ? "text-blue-400 bg-blue-500/10 border-r-4 border-blue-500"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
        }`;

    return (
        <div className="flex h-screen w-full bg-[#020617] text-slate-200 font-sans">
            {/* Sidebar */}
            <aside className="w-72 shrink-0 bg-[#0f172a]/60 backdrop-blur-xl p-6 flex flex-col z-20 border-r border-slate-800/50 shadow-2xl">
                <div className="mb-10 px-2">
                    <PulsoraLogo />
                </div>

                <nav className="flex-grow space-y-2 font-mono">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 px-4">Monitoring</p>
                    <NavLink to="/" end className={navLinkClass}><LayoutDashboard size={18} className="mr-3" /> Dashboard</NavLink>
                    <NavLink to="/alerts" className={navLinkClass}><Bell size={18} className="mr-3" /> Live Alerts</NavLink>
                    <NavLink to="/my-alerts" className={navLinkClass}><ShieldAlert size={18} className="mr-3" /> My Alerts</NavLink>
                    <NavLink to="/reports" className={navLinkClass}><BarChart3 size={18} className="mr-3" /> Reports</NavLink>

                    <div className="pt-6">
                        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 px-4">System</p>
                        <NavLink to="/settings" className={navLinkClass}><Settings size={18} className="mr-3" /> Settings</NavLink>
                    </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800/50">
                    <button onClick={logout} className="flex w-full items-center px-4 py-3 text-sm font-bold text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all">
                        <LogOut size={18} className="mr-3" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-grow flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="h-20 bg-[#020617]/80 backdrop-blur-md px-8 flex justify-between items-center shrink-0 border-b border-slate-800/50 z-10">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] font-mono">STATUS: SYSTEM_NOMINAL</span>
                    </div>
                    <UserAvatar />
                </header>

                <main className="flex-grow overflow-y-auto p-8 relative">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>
                    <div className="relative z-10 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout;