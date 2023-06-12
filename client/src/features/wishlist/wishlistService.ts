import { axiosPrivate } from "../../api/axios";

const fecthFavorites = async (
  abortController: AbortController,
  token: string | null
) => {
  const response = await axiosPrivate.get(`/wishlist`, {
    signal: abortController.signal,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteFavorite = async (
  token: string | null,
  productId: string | undefined
) => {
  const response = await axiosPrivate.delete(`/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const addFavorite = async (
  token: string | null,
  productId: string | undefined,
) => {
  const response = await axiosPrivate.post(`/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const wishListService = {
    fecthFavorites,
    addFavorite,
    deleteFavorite
};

export default wishListService;
