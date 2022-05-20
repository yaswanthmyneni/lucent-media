import { createSlice } from "@reduxjs/toolkit";
import {
  addCommentToAPost,
  deleteComment,
  downVoteComment,
  editComment,
  getCommentsOfAPost,
  upVoteComment,
} from "./postServices/commentServices";
import { dislikePost, likePost } from "./postServices/likeServices";
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostById,
  getPostsByUsername,
} from "./postServices/postServices";

const initialState = {
  status: "idle",
  allPosts: [],
  userPosts: [],
  postId: null,
  error: null,
  isEdit: false,
  content: "",
  commentsForAPost: [],
  singlePost: {},
  commentId: null,
  sortByDate: "new",
  filterByLikes: "non-trending",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setCommentId: (state, action) => {
      state.commentId = action.payload;
    },
    setDate: (state, action) => {
      state.sortByDate = action.payload;
    },
    setTrending: (state, action) => {
      state.filterByLikes = action.payload;
    },
  },
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.allPosts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call got rejected, check console";
      console.error(action.payload);
    },
    [getPostsByUsername.pending]: (state) => {
      state.status = "loading";
    },
    [getPostsByUsername.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.userPosts = action.payload;
    },
    [getPostsByUsername.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call got rejected, check console";
      console.error(action.payload);
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.allPosts = action.payload;
    },
    [createNewPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (createNewPost) got rejected, check console";
      console.error(action.payload);
    },
    [editPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.allPosts = action.payload;
      state.postId = null;
      state.isEdit = false;
      state.content = "";
    },
    [editPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (editPost) got rejected, check console";
      console.error(action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.allPosts = action.payload;
      state.postId = null;
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (deletePost) got rejected, check console";
      console.error(action.payload);
    },
    [likePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.allPosts = action.payload;
    },
    [likePost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (likePost) got rejected, check console";
      console.error(action.payload);
    },
    [dislikePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.allPosts = action.payload;
    },
    [dislikePost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (dislikePost) got rejected, check console";
      console.error(action.payload);
    },
    [getCommentsOfAPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.commentsForAPost = action.payload;
    },
    [getCommentsOfAPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (getCommentsOfAPost) got rejected, check console";
      console.error(action.payload);
    },
    [getPostById.pending]: (state) => {
      state.status = "loading";
    },
    [getPostById.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.singlePost = action.payload;
    },
    [getPostById.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (getPostById) got rejected, check console";
      console.error(action.payload);
    },
    [addCommentToAPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.commentsForAPost = action.payload;
    },
    [addCommentToAPost.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (addCommentToAPost) got rejected, check console";
      console.error(action.payload);
    },
    [editComment.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.commentsForAPost = action.payload;
      state.commentId = null;
      state.content = "";
    },
    [editComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (editComment) got rejected, check console";
      console.error(action.payload);
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.commentsForAPost = action.payload;
    },
    [deleteComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (deleteComment) got rejected, check console";
      console.error(action.payload);
    },
    [upVoteComment.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.commentsForAPost = action.payload;
    },
    [upVoteComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (upVoteComment) got rejected, check console";
      console.error(action.payload);
    },
    [downVoteComment.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.commentsForAPost = action.payload;
    },
    [downVoteComment.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = "api call (downVoteComment) got rejected, check console";
      console.error(action.payload);
    },
  },
});

export const {
  setPostId,
  setIsEdit,
  setContent,
  setCommentId,
  setDate,
  setTrending,
} = postSlice.actions;

export default postSlice.reducer;
