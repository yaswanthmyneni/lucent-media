import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import "./index.css";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
