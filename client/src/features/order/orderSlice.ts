import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import orderService from "./orderService";
import axios from "axios";
import { RootState } from "../../app/store";
import { UpdateOrderPayload } from "../../types/payloads";
import { Order } from "../../types/order";

export const fetchAuthOrders = createAsyncThunk(
  "order/fetchauth",
  async (abortController: AbortController, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState)?.auth?.user?.accessToken || null;

    try {
      const data = await orderService.fetchAuthOrders(abortController, token);
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

export const fetchAllOrders = createAsyncThunk(
  "order/fetchall",
  async (abortController: AbortController, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState)?.auth?.user?.accessToken || null;

    try {
      const data = await orderService.fetchAllOrders(abortController, token);
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

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async ({ orderId }: { orderId: string | undefined }, thunkAPI) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await orderService.deleteOrder(token, orderId);
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

export const updateOrder = createAsyncThunk(
  "order/update",
  async (
    {
      orderId,
      order,
    }: { orderId: string | undefined; order: UpdateOrderPayload },
    thunkAPI
  ) => {
    const token =
      (thunkAPI.getState() as RootState).auth.user?.accessToken || null;

    try {
      const data = await orderService.updateOrder(token, orderId, order);
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
  orders: Order[];
  isSuccess: boolean;
  isError: boolean;
  message: string;
  isLoading: boolean;
} = {
  orders: [],
  isSuccess: false,
  isError: false,
  message: "",
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
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
      .addCase(fetchAuthOrders.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchAuthOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        fetchAuthOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.orders = action.payload;
        }
      )
      .addCase(fetchAllOrders.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.orders = action.payload;
        }
      )
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload?.id
        );
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = state.orders.map((order) =>
          order.id == action.payload?.id ? action.payload : order
        );
      });
  },
});

export const { reset } = orderSlice.actions;

export default orderSlice.reducer;
