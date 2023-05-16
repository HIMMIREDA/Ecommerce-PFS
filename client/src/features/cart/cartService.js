import axios, { axiosPrivate } from "../../api/axios";

const fetchCartItems = async (abortController, token) => {
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

const deleteCartItem = async (cartItemId, token) => {
  if (token) {
    const response = await axiosPrivate.delete(`/cart/${cartItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  const response = await axios.delete(`/cart/${cartItemId}`, headers);

  return response.data;
};

const addToCart = async (cartItem, token) => {
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

const updateCartItem = async (cartItemId, cartItem, token) => {
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
