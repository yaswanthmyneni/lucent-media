import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logInUser = createAsyncThunk(
  "auth/logInUser",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/auth/login",
        data: userDetails,
      });
      if (response.status === 200) {
        return {
          token: response.data.encodedToken,
          foundUser: response.data.foundUser,
        };
      }
    } catch (error) {
      return rejectWithValue(`Error from logInUser: ${error.message}`);
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/api/auth/signup",
        data: data.userDetails,
      });
      dispatch(data.setAllUsers(response.data.createdUser));
      return {
        token: response.data.encodedToken,
        createdUser: response.data.createdUser,
      };
    } catch (error) {
      return rejectWithValue(`Error from signUpUser: ${error.message}`);
    }
  }
);
