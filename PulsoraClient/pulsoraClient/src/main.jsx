import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // <-- NEW IMPORT
import "./styles/index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* This is the missing piece that creates the routing context */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
