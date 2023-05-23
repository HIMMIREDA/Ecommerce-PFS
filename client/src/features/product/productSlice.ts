import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import productService from "./productService";
import { RootState } from "../../app/store";
import axios from "axios";
import { AddProductPayload, UpdateProductPayload } from "../../types/payloads";
import { Product } from "../../types/product";

export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async (
    {
      abortController,
      page,
      limit,
    }: {
      abortController: AbortController;
      page?: number;
      limit?: number;
    },
    thunkAPI
  ) => {
    const {
      brandFilter,
      categoryFilter,
      ratingFilter,
      priceFilter,
      sortBy,
      sortOrder,
      search,
    } = (thunkAPI.getState() as RootState).product;

    const filterOptions = {
      brandFilter,
      categoryFilter,
      ratingFilter,
      sortBy,
      sortOrder,
      priceFilter,
      search,
    };
    try {
      const data = await productService.fetchProducts(
        abortController,
        page,
        limit,
        filterOptions
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

export const fetchProduct = createAsyncThunk(
  "product/fetchOne",
  async (
    {
      abortController,
      productId,
    }: { abortController: AbortController; productId: string | undefined },
    thunkAPI
  ) => {
    try {
      const data = await productService.fetchProduct(
        abortController,
        productId
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

export const createProduct = createAsyncThunk(
  "product/create",
  async ({ product }: { product: AddProductPayload }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await productService.createProduct(token, product);
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

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ productId }: { productId: string | undefined }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await productService.deleteProduct(token, productId);
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

export const updateProduct = createAsyncThunk(
  "product/update",
  async (
    {
      productId,
      product,
    }: {
      productId: string | undefined;
      product: UpdateProductPayload;
    },
    thunkAPI
  ) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await productService.updateProduct(
        token,
        productId,
        product
      );
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
  categoryFilter: string | null;
  brandFilter: string | null;
  ratingFilter: number | null;
  priceFilter: { minPrice: number | null; maxPrice: number | null };
  sortBy: string | null;
  sortOrder: string | null;
  search: string | null;
  products: Product[];
  product: Product | null;
  isSuccess: boolean;
  isError: boolean;
  message: string;
  isLoading: boolean;
} = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  categoryFilter: null,
  brandFilter: null,
  ratingFilter: null,
  priceFilter: { minPrice: null, maxPrice: null },
  sortBy: null,
  sortOrder: null,
  search: null,
  products: [],
  product: null,
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
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
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setBrandFilter: (state, action) => {
      state.brandFilter = action.payload;
    },
    setSortOptions: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        fetchProducts.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: Product[];
            currentPage: number;
            totalPages: number;
            totalItems: number;
          }>
        ) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = action.payload?.items;
          state.currentPage = action.payload?.currentPage;
          state.totalItems = action.payload?.totalItems;
          state.totalPages = action.payload?.totalPages;
        }
      )
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        fetchProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.product = action.payload;
        }
      )
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.payload?.id
        );
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.products = [...state.products, action.payload];
        }
      )
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.map((product) =>
          product.id == action.payload?.id ? action.payload : product
        );
      });
  },
});

export const {
  reset,
  setCurrentPage,
  setBrandFilter,
  setCategoryFilter,
  setPriceFilter,
  setRatingFilter,
  setSortOptions,
  setSearchQuery,
} = productSlice.actions;

export default productSlice.reducer;
