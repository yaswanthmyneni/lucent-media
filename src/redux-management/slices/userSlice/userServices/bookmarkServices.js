import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBookmarkedPosts = createAsyncThunk(
  "posts/getAllBookmarkedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/users/bookmark/`,
        headers: { authorization: localStorage.getItem("token") },
      });
      return response.data.bookmarks;
    } catch (error) {
      return rejectWithValue(`Error from dislikePost: ${error.message}`);
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "posts/bookmarkPost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/users/bookmark/${postId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      return response.data.bookmarks;
    } catch (error) {
      return rejectWithValue(`Error from dislikePost: ${error.message}`);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "posts/removeBookmark",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/users/remove-bookmark/${postId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      return response.data.bookmarks;
    } catch (error) {
      return rejectWithValue(`Error from dislikePost: ${error.message}`);
    }
  }
);
