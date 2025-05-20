import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//Importation of Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";

// REACT FRONT END
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
