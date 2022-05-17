import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  allPosts: [],
  allUsers: [],
  postId: null,
  error: null,
  isEdit: false,
  content: "",
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", () => {
  return (async () => {
    try {
      const response = await axios({
        method: "get",
        url: `/api/posts/`,
      });
      return response.data.posts;
    } catch (error) {
      return error;
    }
  })();
});

// This will go to userSlice later
export const getAllUsers = createAsyncThunk("posts/getAllUsers", () => {
  return (async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/api/users",
      });
      return response.data.users;
    } catch (error) {
      return error;
    }
  })();
});

export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  (content) => {
    return (async () => {
      try {
        const response = await axios({
          method: "post",
          url: "/api/posts",
          headers: { authorization: localStorage.getItem("token") },
          data: { postData: { content } },
        });
        return response.data.posts;
      } catch (error) {
        return error;
      }
    })();
  }
);

export const editPost = createAsyncThunk("posts/editPost", (data) => {
  return (async () => {
    try {
      const response = await axios({
        method: "post",
        url: `/api/posts/edit/${data.postId}`,
        headers: { authorization: localStorage.getItem("token") },
        data: { postData: { content: data.editedContent } },
      });
      return response.data.posts;
    } catch (error) {
      return error;
    }
  })();
});

export const deletePost = createAsyncThunk("posts/deletePost", (postId) => {
  return (async () => {
    try {
      const response = await axios({
        method: "delete",
        url: `/api/posts/${postId}`,
        headers: { authorization: localStorage.getItem("token") },
      });
      return response.data.posts;
    } catch (error) {
      return error;
    }
  })();
});

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
      state.allPosts = action.payload;
      state.status = "fulfilled";
    },
    [getAllPosts.rejected]: (state, action) => {
      state.error = "api call got rejected";
      console.error(action.payload);
      state.status = "rejected";
    },
    [createNewPost.fulfilled]: (state, action) => {
      state.allPosts = action.payload;
      state.status = "fulfilled";
    },
    [createNewPost.rejected]: (state, action) => {
      state.error = "api call (createNewPost) got rejected";
      state.status = "rejected";
      console.error("createNewPost ", action.payload);
    },
    [editPost.fulfilled]: (state, action) => {
      state.allPosts = action.payload;
      state.postId = null;
      state.content = "";
      state.status = "fulfilled";
    },
    [editPost.rejected]: (state, action) => {
      state.error = "api call (editPost) got rejected";
      state.status = "rejected";
      console.error("editPost ", action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
      state.allPosts = action.payload;
      state.postId = null;
      state.status = "fulfilled";
    },
    [deletePost.rejected]: (state, action) => {
      state.error = "api call (deletePost) got rejected";
      state.status = "rejected";
      console.error("deletePost ", action.payload);
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
      state.status = "fulfilled";
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = "api call (getAllUsers) got rejected";
      state.status = "rejected";
      console.error(action.payload);
    },
  },
});

export const { setPostId, setIsEdit, setContent } = postSlice.actions;

export default postSlice.reducer;