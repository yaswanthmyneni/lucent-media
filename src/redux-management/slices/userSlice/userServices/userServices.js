import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllUsers = createAsyncThunk(
  "posts/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/users",
      });
      return response.data.users;
    } catch (error) {
      return rejectWithValue(`Error from getAllUsers: ${error.message}`);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "posts/getUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "GET",
        url: `/api/users/${userId}`,
      });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(`Error from getUserDetails: ${error.message}`);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "posts/editUserProfile",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/users/edit",
        headers: { authorization: localStorage.getItem("token") },
        data: { userData: { ...data.profileData } },
      });
      dispatch(data.setFoundUser(response.data.user));
    } catch (error) {
      return rejectWithValue(`Error from editUserProfile: ${error.message}`);
    }
  }
);
