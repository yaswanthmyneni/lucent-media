import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommentsOfAPost = createAsyncThunk(
    "posts/getCommentsOfAPost",
    async (postId, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "get",
          url: `/api/comments/${postId}`,
          headers: { authorization: localStorage.getItem("token") },
        });
        return response.data.comments;
      } catch (error) {
        return rejectWithValue(`Error from getCommentsOfAPost: ${error.message}`);
      }
    }
  );
  
  export const addCommentToAPost = createAsyncThunk(
    "posts/addCommentToAPost",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "post",
          url: `/api/comments/add/${data.postId}`,
          headers: { authorization: localStorage.getItem("token") },
          data: { commentData: { text: data.text } },
        });
        return response.data.comments;
      } catch (error) {
        return rejectWithValue(`Error from addCommentToAPost: ${error.message}`);
      }
    }
  );
  
  export const editComment = createAsyncThunk(
    "posts/editComment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "post",
          url: `/api/comments/edit/${data.postId}/${data.commentId}`,
          headers: { authorization: localStorage.getItem("token") },
          data: { commentData: { text: data.text } },
        });
        return response.data.comments;
      } catch (error) {
        return rejectWithValue(`Error from editComment: ${error.message}`);
      }
    }
  );
  
  export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "delete",
          url: `/api/comments/delete/${data.postId}/${data.commentId}`,
          headers: { authorization: localStorage.getItem("token") },
        });
        return response.data.comments;
      } catch (error) {
        return rejectWithValue(`Error from deleteComment: ${error.message}`);
      }
    }
  );
  
  export const upVoteComment = createAsyncThunk(
    "posts/upVoteComment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "post",
          url: `/api/comments/upvote/${data.postId}/${data.commentId}`,
          headers: { authorization: localStorage.getItem("token") },
        });
        return response.data.comments;
      } catch (error) {
        return rejectWithValue(`Error from upVoteComment: ${error.message}`);
      }
    }
  );
  
  export const downVoteComment = createAsyncThunk(
    "posts/downVoteComment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios({
          method: "post",
          url: `/api/comments/downvote/${data.postId}/${data.commentId}`,
          headers: { authorization: localStorage.getItem("token") },
        });
        return response.data.comments;
      } catch (error) {
        return rejectWithValue(`Error from downVoteComment: ${error.message}`);
      }
    }
  );