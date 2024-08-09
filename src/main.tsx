import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

import { ConnectProwiders } from "./app/providers";
import "./app/localization";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConnectProwiders>
      <App />
    </ConnectProwiders>
  </React.StrictMode>
);
