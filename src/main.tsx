// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider as ReduxStore } from "react-redux";
import store from "./redux/store";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  // <StrictMode>
  <ReduxStore store={store}>
    <App />
  </ReduxStore>
  // </StrictMode>
);
