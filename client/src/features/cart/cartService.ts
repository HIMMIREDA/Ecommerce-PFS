import axios, { axiosPrivate } from "../../api/axios";
import { AddToCartPayload } from "../../types/payloads";

const fetchCartItems = async (abortController: AbortController, token: string | null) => {
  if (token) {
    const response = await axiosPrivate.get(`/cart`, {
      signal: abortController.signal,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
  const response = await axios.get(`/cart`, {
    signal: abortController.signal,
  });

  return response.data;
};

const deleteCartItem = async (cartItemId: string | undefined, token: string | null) => {
  if (token) {
    const response = await axiosPrivate.delete(`/cart/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  const response = await axios.delete(`/cart/${cartItemId}`);

  return response.data;
};

const addToCart = async (cartItem: AddToCartPayload, token: string | null) => {
  if (token) {
    const response = await axiosPrivate.post(`/cart`, cartItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  const response = await axios.post(`/cart`, cartItem);

  return response.data;
};

const updateCartItem = async (cartItemId: string | undefined, cartItem: AddToCartPayload, token: string | null) => {
  if (token) {
    const response = await axiosPrivate.put(`/cart/${cartItemId}`, cartItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  const response = await axios.put(`/cart/${cartItemId}`, cartItem);

  return response.data;
};

const cartService = {
  fetchCartItems,
  addToCart,
  deleteCartItem,
  updateCartItem,
};

export default cartService;
