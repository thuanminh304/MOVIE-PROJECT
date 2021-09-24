import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { store } from "../src/store";
=======
import "jquery/dist/jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
>>>>>>> updateAmin

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
=======
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
>>>>>>> updateAmin
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

<<<<<<< HEAD
=======
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
>>>>>>> updateAmin
reportWebVitals();
