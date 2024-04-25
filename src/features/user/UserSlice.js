import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrderByUserID, fetchUserData, updateUser } from "./UserApi";

const initialState = {
  userOrders: [],
  userInfo: [],
  status: "idle",
};

export const fetchOrderByUserIdAsync = createAsyncThunk(
  "user/fetchOrderByUserId",
  async (userId) => {
    const response = await fetchOrderByUserID(userId);
    return response.data;
  }
);

export const fetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async (userID) => {
    const response = await fetchUserData(userID);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    console.log("userSLice", update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      });
  },
});

export const loggedInUserOrders = (state) => state.user.userOrders;
export const userInfo = (state) => state.user.userInfo;

export default userSlice.reducer;
