import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const fetchBrands = createAsyncThunk(
  "brand/fetch",
  async ({ abortController, page, limit, all }, thunkAPI) => {
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

export const createBrand = createAsyncThunk(
  "brand/create",
  async ({ axiosPrivate, brand }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await brandService.createBrand(axiosPrivate, token, brand);
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

export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async ({ axiosPrivate, brandId }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await brandService.deleteBrand(axiosPrivate, token, brandId);
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

export const updateBrand = createAsyncThunk(
  "brand/update",
  async ({ axiosPrivate, brandId, brand }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await brandService.updateBrand(
        axiosPrivate,
        token,
        brandId,
        brand
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
        state.message = action.payload;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload?.items;
        state.currentPage = action.payload?.currentPage;
        state.totalPages = action.payload?.totalPages;
        state.totalItems = action.payload?.totalItems;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
        state.message = action.payload;
      })
      .addCase(createBrand.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
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
        state.message = action.payload;
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
