import { createReducer } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userReducer = createReducer(
  Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  (builder) => {
    builder
      .addCase("login", (state, action) => {
        return action.payload;
      })
      .addCase("logout", (state, action) => {
        return action.payload;
      });
  }
);

export default userReducer;
