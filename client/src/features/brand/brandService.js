import axios from "../../api/axios";

const fetchBrands = async (abortController) => {
  const response = await axios.get(`/brands`, {
    signal: abortController.signal,
  });

  return response.data?.items;
};

const deleteBrand = async (axiosPrivate, token, brandId) => {
  const response = await axiosPrivate.delete(`/brands/${brandId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createBrand = async (axiosPrivate, token, brand) => {
  const response = await axiosPrivate.post(`/brands`, brand, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const updateBrand = async (axiosPrivate, token, brandId, brand) => {
  const response = await axiosPrivate.put(
    `/brands/${brandId}`,
    brand,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const brandService = {
  fetchBrands,
  deleteBrand,
  updateBrand,
  createBrand,
};

export default brandService;
