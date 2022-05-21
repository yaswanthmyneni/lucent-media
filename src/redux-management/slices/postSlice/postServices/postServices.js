import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/posts/`,
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(`Error from getAllPosts: ${error.message}`);
    }
  }
);

export const getPostsByUsername = createAsyncThunk(
  "posts/getPostsByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/posts/user/${username}`,
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(`Error from getPostsByUsername: ${error.message}`);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/posts/${postId}`,
      });
      return response.data.post;
    } catch (error) {
      return rejectWithValue(`Error from getPostById: ${error.message}`);
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/posts",
        headers: { authorization: localStorage.getItem("token") },
        data: { postData: { ...data } },
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(`Error from createNewPost: ${error.message}`);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/posts/edit/${data.postId}`,
        headers: { authorization: localStorage.getItem("token") },
        data: { postData: { content: data.editedContent, img: data.img } },
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(`Error from editPost: ${error.message}`);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/posts/${postId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      return response.data.posts;
    } catch (error) {
      return rejectWithValue(`Error from deletePost: ${error.message}`);
    }
  }
);
