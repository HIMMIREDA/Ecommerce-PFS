import { useEffect } from "react";
import Review from "./Review";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  clearState,
  fetchProductReviews,
  incrementCurrentPage,
  reset,
} from "../../../features/review/reviewSlice";
import { toast } from "react-toastify";


type PropsType = {
  productId: string | undefined;
};

const ReviewList = ({ productId }: PropsType) => {
  const {
    currentPage,
    totalPages,
    totalItems,
    isLoading,
    isError,
    isSuccess,
    message,
    reviews,
  } = useAppSelector((state) => state.review);
  const dispatch = useAppDispatch();

  // const [pageNum , setPageNum] = useState<number>(1);
  // const handleShowMore = () => {

  // };

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(
      fetchProductReviews({
        abortController,
        productId,
        page: currentPage,
      })
    );

    return () => {
      abortController.abort();
    };
  }, [currentPage]);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        toastId: "cartErrorToast",
      });
    }

    dispatch(reset());
  }, [message, isError, isSuccess, isLoading, dispatch]);
  return (
    <div className="py-8">
      <h2>Reviews ({totalItems})</h2>
      {reviews.map((review) => (
        <Review review={review} key={review.id} />
      ))}

      {currentPage < totalPages && (
        <div className="flex justify-center">
          <button
            disabled={isLoading}
            onClick={() => {
              dispatch(incrementCurrentPage());
            }}
            className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
