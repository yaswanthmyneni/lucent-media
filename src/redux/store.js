import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
  },
});
