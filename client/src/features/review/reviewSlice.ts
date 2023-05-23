import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import reviewService from "./reviewService";
import { RootState } from "../../app/store";
import axios from "axios";
import { Review } from "../../types/review";
import { AddReviewPayload } from "../../types/payloads";

export const fetchProductReviews = createAsyncThunk(
  "review/fetch",
  async (
    {
      abortController,
      productId,
      page,
      limit,
    }: {
      abortController: AbortController;
      productId?: string;
      page?: number;
      limit?: number;
    },
    thunkAPI
  ) => {
    try {
      const data = await reviewService.fetchProductReviews(
        abortController,
        productId,
        page,
        limit
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

export const createReview = createAsyncThunk(
  "review/create",
  async ({ review }: { review: AddReviewPayload }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await reviewService.createReview(token, review);
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
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

export const deleteReview = createAsyncThunk(
  "review/delete",
  async ({ reviewId }: { reviewId: string }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await reviewService.deleteReview(token, reviewId);
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
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
  reviews: Review[];
  isSuccess: boolean;
  isError: boolean;
  message: string;
  isLoading: boolean;
} = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  reviews: [],
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    incrementCurrentPage: (state) => {
      state.currentPage = state.currentPage + 1;
    },
    clearState: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.reviews = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        fetchProductReviews.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: Review[];
            currentPage: number;
            totalPages: number;
            totalItems: number;
          }>
        ) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.reviews = [...state.reviews, ...action.payload?.items];
          state.currentPage = action.payload?.currentPage;
          state.totalItems = action.payload?.totalItems;
          state.totalPages = action.payload?.totalPages;
        }
      )
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.reviews = state.reviews.filter(
          (review) => review.id !== action.payload?.id
        );
        state.totalItems -= 1;
      })
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        createReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.reviews = [...state.reviews, action.payload];
          state.totalItems += 1;
        }
      );
  },
});

export const { reset, incrementCurrentPage, clearState } = reviewSlice.actions;

export default reviewSlice.reducer;
