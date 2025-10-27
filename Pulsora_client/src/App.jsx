// We don't need the other imports for this simple test yet.

export default function App() {
    return (
        // If Tailwind is working, this div will have a dark background
        // and will center its content both vertically and horizontally.
        <div className="bg-slate-900 h-screen flex justify-center items-center">

            {/* This h1 will be very large, bold, and have a light blue color. */}
            <h1 className="text-5xl font-bold text-sky-400">
                Tailwind CSS is working! 🎉
            </h1>

        </div>
    )
}

