import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import axios from "axios";
import { RootState } from "../../app/store";
import { AddToCartPayload } from "../../types/payloads";
import { CartItem } from "../../types/cartItem";

export const fetchCartItems = createAsyncThunk(
  "cart/fetch",
  async (abortController: AbortController, thunkAPI) => {
    try {
      const token =
        (thunkAPI.getState() as RootState).auth?.user?.accessToken || null;

      const data = await cartService.fetchCartItems(abortController, token);
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error) && error.name !== "CanceledError") {
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
  async ({ cartItem }: { cartItem: AddToCartPayload }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth?.user?.accessToken || null;

    try {
      const data = await cartService.addToCart(cartItem, token);
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error) && error.name !== "CanceledError") {
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

export const deleteCartItem = createAsyncThunk(
  "cart/delete",
  async ({ cartItemId }: { cartItemId: string | undefined }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth?.user?.accessToken || null;

    try {
      const data = await cartService.deleteCartItem(cartItemId, token);
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error) && error.name !== "CanceledError") {
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

export const updateCartItem = createAsyncThunk(
  "cart/update",
  async (
    {
      cartItemId,
      cartItem,
    }: { cartItemId: string | undefined; cartItem: AddToCartPayload },
    thunkAPI
  ) => {
    const token =
      (thunkAPI.getState() as RootState).auth?.user?.accessToken || null;

    try {
      const data = await cartService.updateCartItem(
        cartItemId,
        cartItem,
        token
      );
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error) && error.name !== "CanceledError") {
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

const initialState: {
  cartItems: CartItem[];
  total: number;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  isLoading: boolean;
  isOpenCart: boolean;
} = {
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
        state.message = action.payload as string;
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
        state.message = action.payload as string;
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
        state.message = action.payload as string;
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
        state.message = action.payload as string;
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
