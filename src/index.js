import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { positions, Provider as ALertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const container = document.getElementById("root");
const root = createRoot(container);

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ALertProvider template={AlertTemplate} {...options}>
        <App />
      </ALertProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
