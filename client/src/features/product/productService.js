import axios from "../../api/axios";

const fetchProducts = async (abortController) => {
  const response = await axios.get(`/products`, {
    signal: abortController.signal,
  });

  return response.data?.items;
};

const fetchProduct = async (abortController, productId) => {
  const response = await axios.get(`/products/${productId}`, {
    signal: abortController.signal,
  });

  return response.data;
};

const deleteProduct = async (axiosPrivate, token, productId) => {
  const response = await axiosPrivate.delete(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createProduct = async (axiosPrivate, token, product) => {
  const response = await axiosPrivate.post(`/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateProduct = async (axiosPrivate, token, productId, product) => {
  const response = await axiosPrivate.put(`/products/${productId}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const productService = {
  fetchProducts,
  fetchProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};

export default productService;
