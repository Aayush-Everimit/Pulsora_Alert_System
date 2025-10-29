import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for redirection

const PulsoraLogo = () => (
  <div className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
    {/* Replace with actual logo */}
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

function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    console.log("Login attempt:", { identifier, password });

    if (identifier && password) {
      alert("Successfully loggedin!");
      navigate("/");
    } else {
      setError("Please enter email/username and password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1a2e] px-4">
      <div className="max-w-md w-full">
        <PulsoraLogo />
        <div className="bg-[#1e293b] shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-200 mb-6">
            Sign in to your account
          </h2>
          {error && (
            <p className="text-red-400 text-sm text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium text-gray-400"
              >
                Email or Username
              </label>
              <input
                type="text"
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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

            <div className="flex items-center justify-end text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Forgot Password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 btn-primary"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-400 hover:text-indigo-300"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
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

export default LoginPage;
