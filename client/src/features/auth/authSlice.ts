import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { User } from "../../types/user";
import axios from "axios";
import { LoginPayload, RegisterPayload } from "../../types/payloads";

const initialState: {
  user: User | null;
  loading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  errors: string[];
} = {
  user: null,
  loading: false,
  isError: false,
  isSuccess: false,
  message: "",
  errors: [],
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user: RegisterPayload, thunkAPI) => {
    try {
      const data = await authService.registerUser(user);
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
        message =
          (error.response &&
            error.response.data &&
            (error.response.data.message || error.response?.data.errors)) ||
          error.message ||
          error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user: LoginPayload, thunkAPI) => {
    try {
      const data = await authService.loginUser(user);
      return data;
    } catch (error) {
      let message = "";
      if (axios.isAxiosError(error)) {
        message =
          (error.response &&
            error.response.data &&
            (error.response.data.message || error.response.data.errors)) ||
          error.message ||
          error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logoutUser();
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
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.errors = action.payload;
          state.message = "";
        }
        if (typeof action.payload === "string") {
          state.message = action.payload;
          state.errors = [];
        }
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
        state.loading = true;
        state.errors = [];
        state.message = "check your email inbox to activate your account";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isSuccess = false;
        state.isError = true;
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isSuccess = true;
        state.isError = false;
        state.loading = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.errors = action.payload;
          state.message = "";
        }
        if (typeof action.payload === "string") {
          state.message = action.payload;
          state.errors = [];
        }
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSuccess = true;
        state.isError = false;
        state.loading = false;
        state.errors = [];
        state.user = action.payload;
      });
  },
});

export const { reset, setUser } = authSlice.actions;

export default authSlice.reducer;
