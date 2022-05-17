import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  foundUser: {},
};

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (userDetails) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/auth/login",
        data: userDetails,
      });
      if (response.status === 200 || 201) {
        return {
          token: response.data.encodedToken,
          foundUser: response.data.foundUser,
        };
      }
    } catch (error) {
      return error;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (userDetails) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/auth/signup",
        data: userDetails,
      });
      return {
        token: response.data.encodedToken,
        createdUser: response.data.createdUser,
      };
    } catch (error) {
      return error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setFoundUser: (state, action) => {
      state.foundUser = action.payload;
    },
  },
  extraReducers: {
    [logInUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.foundUser = action.payload.foundUser;
    },
    [logInUser.rejected]: (state, action) => {
      console.error(action.payload);
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
