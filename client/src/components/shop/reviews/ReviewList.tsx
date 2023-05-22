import { useState } from "react";
import Review from "./Review";

const reviews = [
  {
    id: "1",
    user: {
      id: "1",
      username: "Jhon Doe",
    },
    comment: "Great product! Highly recommended.",
    rating: 4,
  },
  {
    id: "2",
    user: {
      id: "2",
      username: "Jane Dae",
    },
    comment: "I love it! Works like a charm.",
    rating: 5,
  },
  {
    id: "3",
    user: {
      id: "1",
      username: "Jhon Doe",
    },
    comment: "Excellent quality and fast shipping.",
    rating: 4,
  },

  // ... more review objects
];

const ReviewList = () => {
  const [showMore, setShowMore] = useState(false);

  const visibleReviews = showMore ? reviews : reviews.slice(0, 3);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="py-8">
      {visibleReviews.map((review) => (
        <Review review={review} />
      ))}

      {!showMore && (
        <div className="flex justify-center">
          <button
            onClick={handleShowMore}
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
