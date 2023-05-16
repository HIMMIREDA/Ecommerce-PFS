import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const fetchProducts = createAsyncThunk(
  "product/fetch",
  async ({ abortController, page, limit }, thunkAPI) => {
    const {
      brandFilter,
      categoryFilter,
      ratingFilter,
      priceFilter,
      sortBy,
      sortOrder,
      search
    } = thunkAPI.getState().product;

    const filterOptions = {
      brandFilter,
      categoryFilter,
      ratingFilter,
      sortBy,
      sortOrder,
      priceFilter,
      search
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

export const createProduct = createAsyncThunk(
  "product/create",
  async ({ axiosPrivate, product }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await productService.createProduct(
        axiosPrivate,
        token,
        product
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

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async ({ axiosPrivate, productId }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await productService.deleteProduct(
        axiosPrivate,
        token,
        productId
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

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ axiosPrivate, productId, product }, thunkAPI) => {
    const { accessToken: token } = thunkAPI.getState().auth.user;

    try {
      const data = await productService.updateProduct(
        axiosPrivate,
        token,
        productId,
        product
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
    }
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
        state.message = action.payload;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.items;
        state.currentPage = action.payload?.currentPage;
        state.totalItems = action.payload?.totalItems;
        state.totalPages = action.payload?.totalPages;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
        state.message = action.payload;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
  setSearchQuery
} = productSlice.actions;

export default productSlice.reducer;
