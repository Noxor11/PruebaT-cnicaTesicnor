import { StrictMode } from "react";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";

import { RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";
import { router } from "./routes";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </StrictMode>,
);
