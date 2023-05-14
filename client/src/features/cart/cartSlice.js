import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";

export const fetchCartItems = createAsyncThunk(
  "cart/fetch",
  async (abortController, thunkAPI) => {
    try {
      const data = await cartService.fetchCartItems(abortController);

      return data;
    } catch (error) {
      let message = "";
      if (error.name !== "CanceledError") {
        message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ cartItem }, thunkAPI) => {
    // const { accessToken: token } = thunkAPI.getState().auth.user || null;
    const token = null;
    try {
      const data = await cartService.addToCart(token, cartItem);
      return data;
    } catch (error) {
      let message = "";
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async ({ cartItemId }, thunkAPI) => {
    // const { accessToken: token } = thunkAPI.getState().auth.user || null;
    const token = null;
    try {
      const data = await cartService.deleteCartItem(token, cartItemId);
      return data;
    } catch (error) {
      let message = "";
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async ({ cartItemId, cartItem }, thunkAPI) => {
    // const { accessToken: token } = thunkAPI.getState().auth.user || null;
    const token = null;
    try {
      const data = await cartService.updateCartItem(
        token,
        cartItemId,
        cartItem
      );
      return data;
    } catch (error) {
      let message = "";
      message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  cartItems: [],
  total: 0,
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
  isOpenCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    toggleOpenCart: (state) => {
      state.isOpenCart = !state.isOpenCart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.total = action.payload?.total || 0;
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = action.payload?.items;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.total = action.payload?.total || 0;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "product deleted from cart successfully";
        state.cartItems = action.payload?.items;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.total = action.payload?.total || 0;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "product added to cart successfully";
        state.cartItems = action.payload?.items;
      })
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.total = action.payload?.total || 0;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "cart item updated successfully";
        state.cartItems = action.payload?.items;
      });
  },
});

export const { reset, toggleOpenCart } = cartSlice.actions;

export default cartSlice.reducer;
