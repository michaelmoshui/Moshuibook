import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";

const store = configureStore(
  {
    reducer: {
      user: userReducer,
    },
  },
  composeWithDevTools()
);

export default store;
