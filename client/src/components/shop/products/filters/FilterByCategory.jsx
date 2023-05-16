import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  fetchGrandChildCategories,
  reset,
} from "../../../../features/category/categorySlice";
import { FaChevronDown } from "react-icons/fa";

const FilterByCategory = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, grandChildCategories } =
    useSelector((state) => state.category);

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchGrandChildCategories({ abortController, all: true }));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isLoading, isError, isSuccess, message]);

  return (
    <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
        <span className="text-sm font-medium"> Category </span>

        <span className="transition group-open:-rotate-180">
          <FaChevronDown />
        </span>
      </summary>

      <div className="border-t border-base-200 ">
        <ul className="space-y-1 border-t border-gray-200 p-4">
          {grandChildCategories?.map((cat) => (
            <li key={cat?.id} className="form-control">
              <label className="inline-flex items-center gap-2">
              <input
                  type="radio"
                  name="category"
                  id="FilterCategory"
                  className="radio checked:bg-blue-500"
                />

                <span className=" font-medium text-base">{cat?.name}</span>
              </label>
              
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
};

export default FilterByCategory;
