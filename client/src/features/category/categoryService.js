import axios from "../../api/axios";

const fetchCategories = async (abortController) => {
  const response = await axios.get(`/categories`, {
    signal: abortController.signal,
  });

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
  deleteCategory,
  updateCategory,
  createCategory,
};

export default categoryService;
