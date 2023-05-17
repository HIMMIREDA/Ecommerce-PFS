import  { useEffect } from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";
import {
  fetchProducts,
  setRatingFilter,
} from "../../../../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";

function FilterByRating() {
  const { ratingFilter } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchProducts({ abortController, page: 1 }));
    return () => {
      abortController.abort();
    };
  }, [ratingFilter]);
  return (
    <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
        <span className="text-sm font-medium">Rating (more than)</span>
        <span className="transition group-open:-rotate-180">
          <FaChevronDown />
        </span>
      </summary>
      <div className="border-t border-base-200">
        <ul className="space-y-1 border-t border-gray-200 p-4">
          {[...Array(5).keys()].map((i) => (
            <li key={i}>
              <label
                htmlFor="FilterRating"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="rating"
                  id="FilterRating"
                  className="radio checked:bg-blue-500"
                  checked={ratingFilter === i + 1}
                  onChange={() => dispatch(setRatingFilter(i+1))}
                />
                <span className="font-medium text-base flex">
                  {[...Array(i + 1).keys()].map((j) => (
                    <FaStar
                      className="text-yellow-500"
                      key={`star-${i}-${j}`}
                    />
                  ))}
                </span>
              </label>
            </li>
          ))}
        </ul>
        <div className="w-full my-3 flex justify-center">
          <button
            className="btn"
            onClick={() => dispatch(setRatingFilter(null))}
          >
            Clear
          </button>
        </div>
      </div>
    </details>
  );
}

export default FilterByRating;
