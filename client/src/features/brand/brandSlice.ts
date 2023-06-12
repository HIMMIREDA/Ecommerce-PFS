import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import brandService from "./brandService";
import axios from "axios";
import { Brand } from "../../types/brand";
import { RootState } from "../../app/store";
import { AddBrandPayload } from "../../types/payloads";

export const fetchBrands = createAsyncThunk(
  "brand/fetch",
  async (
    {
      abortController,
      page,
      limit,
      all,
    }: {
      abortController: AbortController;
      page?: number;
      limit?: number;
      all?: boolean;
    },
    thunkAPI
  ) => {
    try {
      const data = await brandService.fetchBrands(
        abortController,
        page,
        limit,
        all
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

export const createBrand = createAsyncThunk(
  "brand/create",
  async (brand: AddBrandPayload, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth?.user?.accessToken || null;

    try {
      const data = await brandService.createBrand(token, brand);
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

export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async (brandId: string | undefined, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth?.user?.accessToken || null;

    try {
      const data = await brandService.deleteBrand(token, brandId);
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

export const updateBrand = createAsyncThunk(
  "brand/update",
  async (
    { brandId, brand }: { brandId: string | undefined; brand: any },
    thunkAPI
  ) => {
    const token =
      (thunkAPI.getState() as RootState).auth?.user?.accessToken || null;

    try {
      const data = await brandService.updateBrand(token, brandId, brand);
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
  brands: Brand[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  isLoading: boolean;
} = {
  brands: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

const brandSlice = createSlice({
  name: "brand",
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
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        fetchBrands.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: Brand[];
            currentPage: number;
            totalPages: number;
            totalItems: number;
          }>
        ) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.brands = action.payload?.items;
          state.currentPage = action.payload?.currentPage;
          state.totalPages = action.payload?.totalPages;
          state.totalItems = action.payload?.totalItems;
        }
      )
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = state.brands.filter(
          (brand) => brand.id !== action.payload?.id
        );
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createBrand.fulfilled, (state, action: PayloadAction<Brand>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = [...state.brands, action.payload];
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = state.brands.map((brand) =>
          brand.id == action.payload?.id ? action.payload : brand
        );
      });
  },
});

export const { reset } = brandSlice.actions;

export default brandSlice.reducer;
