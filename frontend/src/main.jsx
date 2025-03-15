// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import RouterPage from "./routes/RouterPage";
import { BrowserRouter } from "react-router";
import "remixicon/fonts/remixicon.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import 'sweetalert2/dist/sweetalert2.js'

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterPage />
    </BrowserRouter>
  </Provider>
);
