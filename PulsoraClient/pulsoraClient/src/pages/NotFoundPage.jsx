import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 text-center">
      {/* Optional: Add a relevant icon or graphic */}
      <svg
        className="w-16 h-16 text-indigo-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <h1 className="text-5xl md:text-6xl font-bold mb-3 text-gray-100">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-400 mb-8 max-w-md">
        Sorry, we couldn't find the page you were looking for. It might have
        been moved or deleted.
      </p>
      <Link
        to="/" // Link back to the main dashboard
        className="px-6 py-2.5 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition duration-150 ease-in-out"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
