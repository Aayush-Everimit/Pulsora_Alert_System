import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; //

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(), // Add Tailwind v4 plugin
        react()
    ],
    server: {
        port: 5175,
        watch: { usePolling: true },
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, "/api"),
            },
        },
    },
});