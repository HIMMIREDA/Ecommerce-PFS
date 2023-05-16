import React, { useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchBrands, reset } from "../../../../features/brand/brandSlice";
import { toast } from "react-toastify";
import {
  fetchProducts,
  setBrandFilter,
} from "../../../../features/product/productSlice";

function FilterByBrand() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, brands } = useSelector(
    (state) => state.brand
  );

  const { brandFilter } = useSelector((state) => state.product);

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchBrands({ abortController, all: true }));
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

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchProducts({ abortController, page: 1 }));
    return () => {
      abortController.abort();
    };
  }, [brandFilter]);
  return (
    <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
        <span className="text-sm font-medium"> Brand </span>

        <span className="transition group-open:-rotate-180">
          <FaChevronDown />
        </span>
      </summary>

      <div className="border-t border-gray-200">
        <ul className="space-y-1 border-t border-gray-200 p-4">
          {brands?.map((brand) => (
            <li key={brand?.id}>
              <label
                htmlFor="FilterBrand"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="radio"
                  name="brand"
                  id="FilterBrand"
                  className="radio checked:bg-blue-500"
                  checked={brandFilter === brand?.name}
                  onChange={() => dispatch(setBrandFilter(brand?.name))}
                />

                <span className=" font-medium text-base">{brand?.name}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="w-full my-3 flex justify-center">
          <button
            className="btn"
            onClick={() => dispatch(setBrandFilter(null))}
          >
            Clear
          </button>
        </div>
      </div>
    </details>
  );
}

export default FilterByBrand;
