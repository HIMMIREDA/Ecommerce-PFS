import axios from "../../api/axios";

const PAGE_LIMIT = 10;

const fetchCategories = async (abortController) => {
  const response = await axios.get(`/categories`, {
    signal: abortController.signal,
  });

  return response.data;
};

const fetchGrandChildCategories = async (abortController, page, limit, all) => {
  const response = await axios.get(
    `/categories/grandchilds?page=${page || 1}&count=${
      limit || PAGE_LIMIT
    }&all=${all}`,
    {
      signal: abortController.signal,
    }
  );

  return response.data;
};

const deleteCategory = async (axiosPrivate, token, categoryId) => {
  const response = await axiosPrivate.delete(`/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createCategory = async (axiosPrivate, token, category) => {
  const response = await axiosPrivate.post(`/categories`, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateCategory = async (axiosPrivate, token, categoryId, category) => {
  const response = await axiosPrivate.put(
    `/categories/${categoryId}`,
    category,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const categoryService = {
  fetchCategories,
  fetchGrandChildCategories,
  deleteCategory,
  updateCategory,
  createCategory,
};

export default categoryService;
