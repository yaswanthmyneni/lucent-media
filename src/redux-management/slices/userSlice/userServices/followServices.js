import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const followUser = createAsyncThunk(
  "posts/followUser",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/users/follow/${data.userId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(data.setFoundUser(response.data.user));
      return response.data.followUser;
    } catch (error) {
      return rejectWithValue(`Error from followUser: ${error.message}`);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  "posts/unFollowUser",
  async (data, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/users/unfollow/${data.userId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      dispatch(data.setFoundUser(response.data.user));
      return response.data.followUser;
    } catch (error) {
      return rejectWithValue(`Error from unFollowUser: ${error.message}`);
    }
  }
);
