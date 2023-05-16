import React from "react";
import { FaChevronDown, FaStar } from "react-icons/fa";

function FilterByRating() {
  return (
    <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
        <span className="text-sm font-medium">Rating</span>
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
                />
                <span className="font-medium text-base flex">
                  {[...Array(i+1).keys()].map((j) => (
                    <FaStar className="text-yellow-500" key={`star-${i}-${j}`} />
                  ))}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default FilterByRating;
