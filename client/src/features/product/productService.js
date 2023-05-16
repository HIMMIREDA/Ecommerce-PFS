import axios from "../../api/axios";

const PAGE_LIMIT = 3;


const fetchProducts = async (abortController, page, limit) => {
  const response = await axios.get(`/products?page=${page}&count=${limit || PAGE_LIMIT}`, {
    signal: abortController.signal,
  });

  return response.data;
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
