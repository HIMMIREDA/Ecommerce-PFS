import axios, { axiosPrivate } from "../../api/axios";
import {
  AddCategoryPayload,
  UpdateCategoryPayload,
} from "../../types/payloads";

const PAGE_LIMIT = 10;

const fetchCategories = async (abortController: AbortController) => {
  const response = await axios.get(`/categories`, {
    signal: abortController.signal,
  });

  return response.data;
};

const fetchGrandChildCategories = async (
  abortController: AbortController,
  page: number | undefined,
  limit: number | undefined,
  all: boolean
) => {
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

const deleteCategory = async (
  token: string | null,
  categoryId: string | undefined
) => {
  const response = await axiosPrivate.delete(`/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createCategory = async (
  token: string | null,
  category: AddCategoryPayload,
  parentCategoryId?: string
) => {
  let API_URL = "/categories"; 
  if(parentCategoryId){
    API_URL += `/${parentCategoryId}`;
  }
  const response = await axiosPrivate.post(API_URL, category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateCategory = async (
  token: string | null,
  categoryId: string | undefined,
  category: UpdateCategoryPayload
) => {
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
