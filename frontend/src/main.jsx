// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterPage from "./routes/RouterPage";
import { BrowserRouter } from "react-router";
import 'remixicon/fonts/remixicon.css'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RouterPage />
  </BrowserRouter>
);
