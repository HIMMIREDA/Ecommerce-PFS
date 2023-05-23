import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { toast } from "react-toastify";
import { createReview, reset } from "../../../features/review/reviewSlice";

type PropsType = {
  productId: string;
};
const ReviewForm = ({ productId }: PropsType) => {
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.review
  );

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      dispatch(
        createReview({
          review: {
            comment: comment.trim(),
            rating,
            productId,
          },
        })
      );
    }
    setComment("");
    setRating(1);
  };
  return (
    <form
      className="flex flex-col items-center space-y-5"
      onSubmit={handleSubmit}
    >
      <div className="rating">
        <input
          type="radio"
          onClick={() => setRating(1)}
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked={rating === 1}
        />
        <input
          type="radio"
          onClick={() => setRating(2)}
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked={rating === 2}
        />
        <input
          type="radio"
          onClick={() => setRating(3)}
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked={rating === 3}
        />
        <input
          type="radio"
          onClick={() => setRating(4)}
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked={rating === 4}
        />
        <input
          type="radio"
          onClick={() => setRating(5)}
          name="rating-2"
          className="mask mask-star-2 bg-orange-400"
          checked={rating === 5}
        />
      </div>
      <textarea
        placeholder="Comment"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
        value={comment}
        onChange={(e) => setComment(e.currentTarget.value)}
      ></textarea>

      <button className="btn btn-primary" type="submit" disabled={isLoading}>
        Add Review
      </button>
    </form>
  );
};

export default ReviewForm;
