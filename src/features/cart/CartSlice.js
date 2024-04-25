import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCart,
  fetchCartItemsByUserID,
  resetCart,
  updateCart,
} from "./CartAPI";

const initialState = {
  cartItems: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (item) => {
    const response = await updateCart(item);
    return response.data;
  }
);

export const deleteCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async (itemID) => {
    const response = await deleteCart(itemID);
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);

export const fetchCartItemsByUserIDAsync = createAsyncThunk(
  "cart/fetchCartItemsByUserID",
  async (userId) => {
    const response = await fetchCartItemsByUserID(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      })
      .addCase(fetchCartItemsByUserIDAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsByUserIDAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartItems.findIndex(
          (item) => item.id == action.payload.id
        );
        state.cartItems[index] = action.payload;
      })
      .addCase(deleteCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = [];
      });
  },
});

export const cartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
