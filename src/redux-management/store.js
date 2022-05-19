import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slices/postSlice/postSlice";
import authReducer from "./slices/authSlice/authSlice";
import userReducer from "./slices/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    auth: authReducer,
    user: userReducer,
  },
});
