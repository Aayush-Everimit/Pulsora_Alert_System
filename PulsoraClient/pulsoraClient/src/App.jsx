import { Routes, Route } from "react-router-dom";
// CORRECTED PATH: Check casing to match local file system
import MainLayout from "./components/Layout/MainLayout";
import DashboardPage from "./pages/DashboardPage";
import AlertsNotificationsPage from "./pages/AlertsNotificationsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFoundPage from "./pages/NotFoundPage";

// Simple check for authentication status (Replace with real logic later)
const isAuthenticated = () => {
  // TODO: Implement actual authentication check (e.g., check for stored JWT token)
  return true; // Assuming logged in for layout testing
};

function App() {
  // Determine if the full layout (sidebar + header) should be shown
  const showLayout = isAuthenticated();

  return (
    <Routes>
      {/* 1. Routes WITHOUT the main layout (Public Access: Login, Register) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />

      {/* 2. Routes WITH the main layout (Protected Access) */}
      {/* RESTORED: This nested route renders MainLayout around the child paths */}
      <Route element={showLayout ? <MainLayout /> : <LoginPage />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/alerts" element={<AlertsNotificationsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Uncomment the line below if you create HelpPage.jsx */}
        {/* <Route path="/help" element={<HelpPage />} /> */}
      </Route>

      {/* 3. Catch-all Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
