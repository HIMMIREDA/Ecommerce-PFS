import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setPriceFilter,
} from "../../../../features/product/productSlice";

function FilterByPrice() {
  const { priceFilter } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState({
    minPrice: null,
    maxPrice: null,
  });

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchProducts({ abortController, page: 1 }));

    return () => {
      abortController.abort();
    };
  }, [priceFilter]);

  return (
    <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
        <span className="text-sm font-medium"> Price </span>

        <span className="transition group-open:-rotate-180">
          <FaChevronDown />
        </span>
      </summary>

      <div className="border-t border-gray-200 ">
        <header className="flex items-center justify-between p-4">
          <button
            type="button"
            className="btn"
            onClick={() => {
              dispatch(setPriceFilter({ maxPrice: null, minPrice: null }));
              setPriceRange({ maxPrice: null, minPrice: null });
            }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(setPriceFilter(priceRange))}
          >
            Apply
          </button>
        </header>

        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between gap-4">
            <label
              htmlFor="FilterPriceFrom"
              className="flex items-center gap-2"
            >
              <span className="text-base">$</span>

              <input
                type="number"
                id="FilterPriceFrom"
                placeholder="From"
                className="input w-24 h-10"
                value={priceRange.minPrice || ""}
                onChange={(e) =>
                  setPriceRange((state) => ({
                    ...state,
                    minPrice: e.target.value,
                  }))
                }
              />
            </label>

            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
              <span className="text-base">$</span>

              <input
                type="number"
                id="FilterPriceTo"
                placeholder="To"
                className="input w-24 h-10"
                value={priceRange.maxPrice || ""}
                onChange={(e) =>
                  setPriceRange((state) => ({
                    ...state,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </label>
          </div>
        </div>
      </div>
    </details>
  );
}

export default FilterByPrice;
