import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";

ReactDom.render(
  // store를 사용하기 위해 Provider 컴포넌트에 store prop을 연결시킨다.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
