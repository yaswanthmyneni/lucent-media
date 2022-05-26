import { createSlice } from "@reduxjs/toolkit";
import { logInUser, signUpUser } from "./authServices";

const initialState = {
  status: '',
  foundUser: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFoundUser: (state, action) => {
      state.foundUser = action.payload;
    },
  },
  extraReducers: {
    [logInUser.pending]: (state) => {
      state.status = 'pending';
    },
    [logInUser.fulfilled]: (state, { payload: { foundUser, token } }) => {
      state.status = 'fulfilled';
      localStorage.setItem("token", token);
      sessionStorage.setItem("token", token);
      state.foundUser = foundUser;
    },
    [logInUser.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [signUpUser.pending]: (state) => {
      state.status = 'pending';
    },
    [signUpUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.foundUser = action.payload.createdUser;
    },
    [signUpUser.rejected]: (state, action) => {
      console.error(action.payload);
    },
  },
});

export const { setFoundUser } = authSlice.actions;

export default authSlice.reducer;
