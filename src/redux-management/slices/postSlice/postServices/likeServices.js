import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/posts/like/${postId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(`Error from likePost: ${error.message}`);
    }
  }
);

export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/posts/dislike/${postId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(`Error from dislikePost: ${error.message}`);
    }
  }
);
