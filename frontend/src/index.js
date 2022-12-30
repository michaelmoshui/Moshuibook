import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./styles//icons/icons.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//// Redux
//// a global "store" that stores the state...wrap <Provider> around everything
//// store contains multiple reducers
//// A specific reducer can change a specific state

ReactDOM.render(
  // <Router> allows for multiple routes being rendered
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
