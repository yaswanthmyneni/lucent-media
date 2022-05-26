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
  userStatus: "idle",
  allUsers: [],
  user: {},
  searchValue: '',
  bookmarkedPosts: [],
};

export const userSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers[state.allUsers.length] = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.userStatus = "loading";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.allUsers = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.userStatus = "rejected";
      console.error(action.payload);
    },
    [getUserDetails.pending]: (state) => {
      state.userStatus = "loading";
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.user = action.payload;
    },
    [getUserDetails.rejected]: (state, action) => {
      state.userStatus = "rejected";
      console.error(action.payload);
    },
    [followUser.pending]: (state) => {
      state.userStatus = "loading";
    },
    [followUser.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.user = action.payload;
    },
    [followUser.rejected]: (state, action) => {
      state.userStatus = "rejected";
      console.error(action.payload);
    },
    [unFollowUser.pending]: (state) => {
      state.userStatus = "loading";
    },
    [unFollowUser.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.user = action.payload;
    },
    [unFollowUser.rejected]: (state, action) => {
      state.userStatus = "rejected";
      console.error(action.payload);
    },
    [editUserProfile.pending]: (state) => {
      state.userStatus = "loading";
    },
    [editUserProfile.fulfilled]: (state, action) => {
      state.allUsers = [...state.allUsers].map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        }
        return user;
      });
      state.userStatus = "fulfilled";
    },
    [editUserProfile.rejected]: (state, action) => {
      state.userStatus = "rejected";
      console.error(action.payload);
    },
    [getAllBookmarkedPosts.pending]: (state) => {
      state.userStatus = "loading";
    },
    [getAllBookmarkedPosts.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.bookmarkedPosts = action.payload;
    },
    [getAllBookmarkedPosts.rejected]: (state, action) => {
      state.userStatus = "rejected";
      state.error =
        "api call (getAllBookmarkedPosts) got rejected, check console";
      console.error(action.payload);
    },
    [bookmarkPost.pending]: (state) => {
      state.userStatus = "loading";
    },
    [bookmarkPost.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.bookmarkedPosts = action.payload;
    },
    [bookmarkPost.rejected]: (state, action) => {
      state.userStatus = "rejected";
      state.error = "api call (bookmarkPost) got rejected, check console";
      console.error(action.payload);
    },
    [removeBookmark.pending]: (state) => {
      state.userStatus = "loading";
    },
    [removeBookmark.fulfilled]: (state, action) => {
      state.userStatus = "fulfilled";
      state.bookmarkedPosts = action.payload;
    },
    [removeBookmark.rejected]: (state, action) => {
      state.userStatus = "rejected";
      state.error = "api call (removeBookmark) got rejected, check console";
      console.error(action.payload);
    },
  },
});

export const { setAllUsers, setSearchValue } = userSlice.actions;

export default userSlice.reducer;
