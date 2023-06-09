import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <Router>
    <App />
  </Router>
);
