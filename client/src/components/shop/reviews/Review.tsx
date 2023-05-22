import { FaStar, FaTrash } from "react-icons/fa";
import { Review as IReview } from "../../../types/review";
import { useAppSelector } from "../../../app/hooks";

type PropsType = {
  review: IReview;
};
const Review = ({ review }: PropsType) => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div key={review.id} className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-col justify-center space-y-2  mb-4">
        <div className="font-bold">{review.user.username}</div>
        <div className="flex items-center">
          {Array.from(Array(review.rating).keys()).map((index) => (
            <FaStar key={index} className="text-yellow-400" />
          ))}
        </div>
      </div>
      <div className="text-gray-600">{review.comment}</div>
      {user?.id === review.id && (
        <button className="text-red-500 hover:text-red-700 mt-2">
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default Review;
