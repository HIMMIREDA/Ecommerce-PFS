import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import wishListService from "./wishlistService";
import axios from "axios";
import { RootState } from "../../app/store";
import { Product } from "../../types/product";

export const fecthFavorites = createAsyncThunk(
  "wishlist/fetch",
  async (abortController: AbortController, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState)?.auth?.user?.accessToken || null;

    try {
      const data = await wishListService.fecthFavorites(abortController, token);
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

export const deleteFavorite = createAsyncThunk(
  "wishlist/delete",
  async ({ productId }: { productId: string | undefined }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await wishListService.deleteFavorite(token, productId);
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

export const addFavorite = createAsyncThunk(
  "wishlist/add",
  async ({ productId }: { productId: string | undefined }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await wishListService.addFavorite(token, productId);
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
  products: Product[];
  isSuccess: boolean;
  isError: boolean;
  message: string;
  isLoading: boolean;
} = {
  products: [],
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

const wsihlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthFavorites.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fecthFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        fecthFavorites.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload;
        }
      )
      .addCase(deleteFavorite.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.payload?.id
        );
      })
      .addCase(addFavorite.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = [...state.products, action.payload];
      });
  },
});

export const { reset } = wsihlistSlice.actions;

export default wsihlistSlice.reducer;
