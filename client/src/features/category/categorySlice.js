import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

export const fetchCategories = createAsyncThunk(
  "category/fetch",
  async ( abortController , thunkAPI) => {

    try {
      const data = await categoryService.fetchCategories(
        abortController
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

export const createCategory = createAsyncThunk(
  "category/create",
  async ({axiosPrivate, category}, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await categoryService.createCategory(
        axiosPrivate,
        token,
        category
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

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async ({ axiosPrivate, categoryId }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await categoryService.deleteCategory(
        axiosPrivate,
        token,
        categoryId
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

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ axiosPrivate, categoryId, category }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await categoryService.updateCategory(
        axiosPrivate,
        token,
        categoryId,
        category
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
  categories: null,
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

const categorySlice = createSlice({
  name: "category",
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
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload?.id
        );
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.map((category) => category.id == action.payload?.id ? action.payload : category)
      });
  },
});

export const { reset } = categorySlice.actions;

export default categorySlice.reducer;