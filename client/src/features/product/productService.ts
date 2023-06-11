import axios, { axiosPrivate } from "../../api/axios";
import { AddProductPayload, UpdateProductPayload } from "../../types/payloads";

const PAGE_LIMIT = 3;

const fetchAllProducts = async (abortController: AbortController) => {
  const response = await axios.get("products", {
    signal: abortController.signal,
  });

  return response.data;
};

const searchProducts = async (
  abortController: AbortController,
  page: number | undefined,
  limit: number | undefined,
  filterOptions: any
) => {
  const {
    sortBy,
    sortOrder,
    priceFilter,
    brandFilter,
    categoryFilter,
    ratingFilter,
    search,
  } = filterOptions;

  const payload: {
    dataOption?: string;
    searchCriteriaList: {
      filterKey: string;
      operation: string;
      value: string | number;
    }[];
  } = {
    dataOption: "all",
    searchCriteriaList: [],
  };

  if (search && search !== "") {
    payload.searchCriteriaList.push({
      filterKey: "name",
      operation: "cn",
      value: search,
    });
  }
  if (brandFilter && brandFilter !== "") {
    payload.searchCriteriaList.push({
      filterKey: "brandName",
      operation: "eq",
      value: brandFilter,
    });
  }
  if (categoryFilter && categoryFilter !== "") {
    payload.searchCriteriaList.push({
      filterKey: "categoryName",
      operation: "eq",
      value: categoryFilter,
    });
  }

  if (ratingFilter && !isNaN(ratingFilter)) {
    payload.searchCriteriaList.push({
      filterKey: "meanRating",
      operation: "ge",
      value: ratingFilter,
    });
  }
  if (priceFilter?.minPrice && !isNaN(priceFilter?.minPrice)) {
    payload.searchCriteriaList.push({
      filterKey: "price",
      operation: "ge",
      value: priceFilter?.minPrice,
    });
  }
  if (priceFilter?.maxPrice && !isNaN(priceFilter?.maxPrice)) {
    payload.searchCriteriaList.push({
      filterKey: "price",
      operation: "le",
      value: priceFilter?.maxPrice,
    });
  }
  const response = await axios.post(
    `/products/search?page=${page || 1}&count=${
      limit || PAGE_LIMIT
    }&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    }
  );

  return response.data;
};

const fetchProduct = async (
  abortController: AbortController,
  productId: string | undefined
) => {
  const response = await axios.get(`/products/${productId}`, {
    signal: abortController.signal,
  });

  return response.data;
};

const deleteProduct = async (
  token: string | null,
  productId: string | undefined
) => {
  const response = await axiosPrivate.delete(`/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createProduct = async (
  token: string | null,
  product: AddProductPayload
) => {
  const response = await axiosPrivate.post(`/products`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateProduct = async (
  token: string | null,
  productId: string | undefined,
  product: UpdateProductPayload
) => {
  const response = await axiosPrivate.put(`/products/${productId}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const productService = {
  fetchAllProducts,
  searchProducts,
  fetchProduct,
  deleteProduct,
  updateProduct,
  createProduct,
};

export default productService;
