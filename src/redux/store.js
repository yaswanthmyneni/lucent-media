import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
    user: userReducer,
  },
});
