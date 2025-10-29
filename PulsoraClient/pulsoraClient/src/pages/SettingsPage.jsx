import React, { useState, useEffect } from "react";
const ToggleSwitch = ({ label, enabled, onChange, disabled = false }) => (
  <label
    className={`flex items-center justify-between ${
      disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    }`}
  >
    <span className="text-gray-300">{label}</span>
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={enabled}
        onChange={onChange}
        disabled={disabled}
      />
      <div className="block w-10 h-6 rounded-full bg-gray-600 peer-checked:bg-indigo-600 transition"></div>
      <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform peer-checked:translate-x-4"></div>
    </div>
  </label>
);

function SettingsPage() {
  const [name, setName] = useState("Placeholder Name");
  const [email, setEmail] = useState("user@example.com");
  const [location, setLocation] = useState("Placeholder Location");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const user = await getUserProfile(); // Replace with API call
    //     setName(user.name || '');
    //     setEmail(user.email || '');
    //     setLocation(user.location || '');
    //     // Fetch notification prefs too
    //   } catch (error) {
    //     console.error("Failed to load user data", error);
    //     setSaveMessage({ type: 'error', text: 'Failed to load profile data.' });
    //   }
    // };
    // fetchUserData();
  }, []); // Run once on mount

  // --- Handlers ---
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage({ type: "", text: "" });
    console.log("Saving profile:", { name, email, location });
    try {
      // TODO: Call API (PUT /users/{id}) to update profile
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSaveMessage({
        type: "success",
        text: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Failed to save profile:", error);
      setSaveMessage({
        type: "error",
        text: "Failed to save profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationChange = (setter, settingName) => async (e) => {
    const newValue = e.target.checked;
    setter(newValue);
    console.log(`Updating ${settingName} to: ${newValue}`);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to update ${settingName}`, error);

      setter(!newValue);
      alert(`Failed to update ${settingName}.`);
    }
  };

  return (
    <div className="text-gray-200 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {saveMessage.text && (
        <div
          className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
            saveMessage.type === "success"
              ? "bg-green-700 text-green-100"
              : "bg-red-800 text-red-200"
          }`}
        >
          {saveMessage.text}
        </div>
      )}

      <div className="bg-[#1e293b] p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Profile
        </h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full input-style-settings"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full input-style-settings"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-400"
            >
              Location (City, State)
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full input-style-settings"
              placeholder="e.g., San Francisco, CA"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-wait"
            >
              {isSaving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-[#1e293b] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Notification Settings
        </h2>
        <div className="space-y-4">
          <ToggleSwitch
            label="Email Alerts"
            enabled={emailAlerts}
            onChange={handleNotificationChange(setEmailAlerts, "Email Alerts")}
          />
          <ToggleSwitch
            label="Push Notifications"
            enabled={pushNotifications}
            onChange={handleNotificationChange(
              setPushNotifications,
              "Push Notifications"
            )}
            disabled={true /* Disable if not implemented */}
          />
          <p className="text-xs text-gray-500 pt-2">
            {pushNotifications
              ? ""
              : "Push notifications are not yet available."}
          </p>
        </div>
      </div>

      {/* TODO: Add Appearance Section if needed */}

      {/* Helper CSS */}
      <style jsx>{`
        .input-style-settings {
          background-color: #334155;
          border: 1px solid #475569;
          color: white;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        }
        .input-style-settings:focus {
          outline: none;
          --tw-ring-color: #818cf8;
          border-color: #818cf8;
          box-shadow: 0 0 0 2px var(--tw-ring-color);
        }
      `}</style>
    </div>
  );
}

export default SettingsPage;
