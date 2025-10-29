import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Placeholder Logo
const PulsoraLogo = () => (
  <div className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
    <svg
      className="w-10 h-10 text-indigo-400 mr-2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
    Pulsora
  </div>
);

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState(""); // Simple text for now
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    const userData = {
      username,
      email,
      password,
      location,
      role: "USER", // Default role
    };
    console.log("Registering:", userData);

    // --- TODO: Implement registration API call (POST /users) ---
    // try {
    //   const response = await registerUser(userData); // Replace with your API call from services/usersApi.js
    //   if (response) { // Check for successful response
    //     alert('Registration successful! Please log in.');
    //     navigate('/login'); // Redirect to login page
    //   } else {
    //     setError('Registration failed. Please try again.');
    //   }
    // } catch (err) {
    //   setError(err.response?.data?.message || 'An error occurred during registration.'); // Show backend error if available
    //   console.error("Registration error:", err);
    // }
    // --- End TODO ---

    // Simulate registration for now
    if (username && email && password && location) {
      alert("Simulating successful registration!");
      navigate("/login"); // Redirect to login
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1a2e] px-4 py-8">
      <div className="max-w-md w-full">
        <PulsoraLogo />
        <div className="bg-[#1e293b] shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">
            Create an Account
          </h2>
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Form Fields */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-400"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full input-style"
                placeholder="Choose a username"
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
                required
                className="mt-1 block w-full input-style"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full input-style"
                placeholder="********"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-400"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full input-style"
                placeholder="********"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-400"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1 block w-full input-style"
                placeholder="e.g., City, State"
              />
              {/* TODO: Use a better location input? Map / Autocomplete */}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 btn-primary mt-2"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {/* Scoped styles */}
      <style jsx>{`
        .input-style {
          background-color: #334155;
          border: 1px solid #475569;
          color: white;
          border-radius: 0.375rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          padding: 0.6rem 0.75rem;
          font-size: 0.875rem;
        }
        .input-style::placeholder {
          color: #94a3b8;
        }
        .input-style:focus {
          outline: none;
          --tw-ring-color: #818cf8;
          border-color: #818cf8;
          box-shadow: 0 0 0 2px var(--tw-ring-color);
        }
        .btn-primary {
          border: 1px solid transparent;
          border-radius: 0.375rem;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          background-color: #4338ca; /* Indigo 700 */
        }
        .btn-primary:hover {
          background-color: #3730a3; /* Indigo 800 */
        }
      `}</style>
    </div>
  );
}

export default RegistrationPage;
