import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function FIlterByPrice() {
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);

  const resetPrices = () => {
    setMaxPrice(null);
    setMinPrice(null);
  };

  const filterByPrice = () => {
    // setMaxPrice setMinPrice  in dispatch
  };
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
          <button type="button" className="btn" onClick={resetPrices}>
            Reset
          </button>
          <button type="button" className="btn" onClick={filterByPrice}>
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
                value={minPrice || ""}
                placeholder="From"
                className="input w-24 h-10"
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </label>

            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
              <span className="text-base">$</span>

              <input
                type="number"
                id="FilterPriceTo"
                value={maxPrice || ""}
                placeholder="To"
                className="input w-24 h-10"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
    </details>
  );
}

export default FIlterByPrice;
