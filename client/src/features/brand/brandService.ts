import axios, { axiosPrivate } from "../../api/axios";
import { Brand } from "../../types/brand";
import { AddBrandPayload } from "../../types/payloads";

const PAGE_LIMIT = 10;

const fetchBrands = async (
  abortController: AbortController,
  page: number | undefined,
  limit: number | undefined,
  all: boolean | undefined
) => {
  const response = await axios.get(
    `/brands?page=${page || 1}&count=${limit || PAGE_LIMIT}&all=${
      all || false
    }`,
    {
      signal: abortController.signal,
    }
  );

  return response.data;
};

const deleteBrand = async (
  token: string | null,
  brandId: string | undefined
) => {
  const response = await axiosPrivate.delete(`/brands/${brandId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createBrand = async (token: string | null, brand: AddBrandPayload) => {
  const formData = new FormData();
  formData.append("name",brand.name);
  formData.append("image",brand.image);

  const response = await axiosPrivate.post<Brand>(`/brands`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    },
  });

  return response.data;
};

const updateBrand = async (
  token: string | null,
  brandId: string | undefined,
  brand: any
) => {
  const response = await axiosPrivate.put<Brand>(`/brands/${brandId}`, brand, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const brandService = {
  fetchBrands,
  deleteBrand,
  updateBrand,
  createBrand,
};

export default brandService;
