import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getUser, signOut, updateUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (user) => {
    const response = await createUser(user);
    return response.data;
  }
);

export const getUserAsync = createAsyncThunk("user/getUser", async (user) => {
  const response = await getUser(user);
  return response.data;
});

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateItem) => {
    const response = await updateUser(updateItem);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk("user/signOut", async (userID) => {
  const response = await signOut(userID);
  return response.data;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const loggedInUserData = (state) => state.auth.loggedInUser;
export const logInError = (state) => state.auth.error;

export default authSlice.reducer;
