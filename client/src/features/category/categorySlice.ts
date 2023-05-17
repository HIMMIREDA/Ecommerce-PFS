import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
import axios from "axios";
import { RootState } from "../../app/store";
import {
  AddCategoryPayload,
  UpdateCategoryPayload,
} from "../../types/payloads";
import { Category } from "../../types/category";

export const fetchCategories = createAsyncThunk(
  "category/fetch",
  async (abortController: AbortController, thunkAPI) => {
    try {
      const data = await categoryService.fetchCategories(abortController);

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

export const fetchGrandChildCategories = createAsyncThunk(
  "category/fetchgrandchild",
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
      all: boolean;
    },
    thunkAPI
  ) => {
    try {
      const data = await categoryService.fetchGrandChildCategories(
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

export const createCategory = createAsyncThunk(
  "category/create",
  async ({ category }: { category: AddCategoryPayload }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState)?.auth?.user?.accessToken || null;

    try {
      const data = await categoryService.createCategory(token, category);
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

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async ({ categoryId }: { categoryId: string | undefined }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await categoryService.deleteCategory(token, categoryId);
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

export const updateCategory = createAsyncThunk(
  "category/update",
  async (
    {
      categoryId,
      category,
    }: { categoryId: string | undefined; category: UpdateCategoryPayload },
    thunkAPI
  ) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await categoryService.updateCategory(
        token,
        categoryId,
        category
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
  currentPage: number;
  totalPages: number;
  totalItems: number;
  categories: Category[];
  grandChildCategories: Category[];
  isSuccess: boolean;
  isError: boolean;
  message: string;
  isLoading: boolean;
} = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  categories: [],
  grandChildCategories: [],
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
        state.message = action.payload as string;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(fetchGrandChildCategories.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchGrandChildCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(fetchGrandChildCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.grandChildCategories = action.payload?.items;
        state.currentPage = action.payload?.currentPage;
        state.totalItems = action.payload?.totalItems;
        state.totalPages = action.payload?.totalPages;
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
        state.message = action.payload as string;
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
        state.message = action.payload as string;
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
        state.message = action.payload as string;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = state.categories.map((category) =>
          category.id == action.payload?.id ? action.payload : category
        );
      });
  },
});

export const { reset } = categorySlice.actions;

export default categorySlice.reducer;
