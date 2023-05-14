import axios from "../../api/axios";

const fetchCartItems = async (abortController) => {
  const response = await axios.get(`/cart`, {
    signal: abortController.signal,
  });

  return response.data;
};

const deleteCartItem = async (token, cartItemId) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
  const response = await axios.delete(`/cart/${cartItemId}`, headers);

  return response.data;
};

const addToCart = async (token, cartItem) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
  const response = await axios.post(`/cart`, cartItem, headers);

  return response.data;
};

const updateCartItem = async (token, cartItemId, cartItem) => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
  const response = await axios.put(`/cart/${cartItemId}`, cartItem, headers);

  return response.data;
};

const cartService = {
  fetchCartItems,
  addToCart,
  deleteCartItem,
  updateCartItem,
};

export default cartService;
