import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  allPosts: [],
  userPosts: [],
  postId: null,
  error: null,
  isEdit: false,
  content: "",
};

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

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (content, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/api/posts",
        headers: { authorization: localStorage.getItem("token") },
        data: { postData: { content } },
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
        data: { postData: { content: data.editedContent } },
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
  },
});

export const { setPostId, setIsEdit, setContent } = postSlice.actions;

export default postSlice.reducer;
