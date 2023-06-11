import { axiosPrivate } from "../../api/axios";
import { UpdateOrderPayload } from "../../types/payloads";

const fetchOrders = async (
  abortController: AbortController,
  token: string | null
) => {
  const response = await axiosPrivate.get(`/orders`, {
    signal: abortController.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteOrder = async (
  token: string | null,
  orderId: string | undefined
) => {
  const response = await axiosPrivate.delete(`/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateOrder = async (
  token: string | null,
  orderId: string | undefined,
  order: UpdateOrderPayload
) => {
  const response = await axiosPrivate.put(`/orders/${orderId}`, order, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const categoryService = {
  fetchOrders,
  deleteOrder,
  updateOrder,
};

export default categoryService;
