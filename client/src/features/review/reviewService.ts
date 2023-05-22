import axios, { axiosPrivate } from "../../api/axios";
import { AddReviewPayload } from "../../types/payloads";

const PAGE_LIMIT = 3;

const fetchProductReviews = async (
  abortController: AbortController,
  productId: string,
  page: number | undefined,
  limit: number | undefined
) => {
  const response = await axios.get(
    `/products/${productId}/reviews?page=${page || 1}&count=${
      limit || PAGE_LIMIT
    }`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      signal: abortController.signal,
    }
  );

  return response.data;
};

const deleteReview = async (
  token: string | null,
  reviewId: string | null
) => {
  const response = await axiosPrivate.delete(`/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const createReview = async (token: string | null, review: AddReviewPayload) => {
  const response = await axiosPrivate.post(`/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const reviewService = {
  fetchProductReviews,
  createReview,
  deleteReview,
};

export default reviewService;
