import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  allUsers: [],
  user: {},
  bookmarkedPosts: [],
};

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

export const userSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [getUserDetails.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [followUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [followUser.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [unFollowUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [unFollowUser.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [editUserProfile.rejected]: (state, action) => {
      console.error(action.payload);
    },
    [getAllBookmarkedPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.bookmarkedPosts = action.payload;
    },
    [getAllBookmarkedPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error =
        "api call (getAllBookmarkedPosts) got rejected, check console";
      console.error(action.payload);
    },
    [bookmarkPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.bookmarkedPosts = action.payload;
    },
    [bookmarkPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (bookmarkPost) got rejected, check console";
      console.error(action.payload);
    },
    [removeBookmark.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.bookmarkedPosts = action.payload;
    },
    [removeBookmark.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (removeBookmark) got rejected, check console";
      console.error(action.payload);
    },
  },
});

export default userSlice.reducer;
