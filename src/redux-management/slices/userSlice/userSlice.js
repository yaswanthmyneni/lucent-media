import { createSlice } from "@reduxjs/toolkit";
import {
  bookmarkPost,
  getAllBookmarkedPosts,
  removeBookmark,
} from "./userServices/bookmarkServices";
import { followUser, unFollowUser } from "./userServices/followServices";
import {
  editUserProfile,
  getAllUsers,
  getUserDetails,
} from "./userServices/userServices";

const initialState = {
  allUsers: [],
  user: {},
  bookmarkedPosts: [],
};

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
