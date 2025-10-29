import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import logoImage from "../../assets/pulsora_logo.jpg";
import userImage from "../../assets/user.png";

const PulsoraLogo = () => (
  <Link to="/" className="flex items-center space-x-2">
    <img
      src={logoImage}
      alt="Pulsora Logo"
      className="w-40 h-20 object-contain shrink-0"
    />
  </Link>
);

// Placeholder User Avatar
const UserAvatar = () => (
  <button className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
    <img
      class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
      src={userImage}
      alt="Bordered avatar"
    />
  </button>
);

function MainLayout() {
  const navLinkClass = ({ isActive }) =>
    `flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150 ${
      isActive ? "bg-gray-700 text-white shadow-inner" : ""
    }`;

  return (
    // Outer container: Flex column, min-h-screen, dark background
    <div className="flex min-h-screen w-full bg-gray-900 text-gray-200">
      {/* Sidebar: Fixed width, high z-index, dark background, flex column for sticky nav*/}
      <aside className="w-64 shrink-0 bg-[#111827] p-4 flex flex-col z-10 shadow-xl border-r border-gray-800">
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-start shrink-0 mb-4">
          <PulsoraLogo />
        </div>

        {/* Navigation - Takes up available space */}
        <nav className="flex-grow space-y-1">
          <NavLink to="/" end className={navLinkClass}>
            <span className="mr-3 w-5 text-center">📊</span> Dashboard
          </NavLink>
          <NavLink to="/alerts" className={navLinkClass}>
            <span className="mr-3 w-5 text-center">🔔</span> Alerts
          </NavLink>
          <NavLink to="/reports" className={navLinkClass}>
            <span className="mr-3 w-5 text-center">📈</span> Reports
          </NavLink>
          <NavLink to="/settings" className={navLinkClass}>
            <span className="mr-3 w-5 text-center">⚙️</span> Settings
          </NavLink>
          {/* Add more links here */}
        </nav>

        {/* Optional Footer/User Area */}
        <div className="mt-auto flex-shrink-0 pt-4 border-t border-gray-700">
          {/* Example: User profile link */}
        </div>
      </aside>

      {/* Main Content Wrapper: Takes remaining width, scrollable */}
      <div className="flex-grow flex flex-col overflow-y-auto">
        {/* Top Bar: Fixed position, flex-shrink-0 to prevent collapsing */}
        <header className="bg-gray-800 shadow-lg p-4 flex justify-end items-center flex-shrink-0 border-b border-gray-700">
          {/* Right side - User avatar, notifications icon, etc. */}
          <div className="flex items-center space-x-4">
            {/* Notifications placeholder */}
            <UserAvatar />
          </div>
        </header>

        {/* Page Content Area: Background applied here, full flex-grow */}
        <main className="flex-grow p-6 bg-[#1F2937]">
          {/* Outlet renders the matched child route component (e.g., DashboardPage) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
