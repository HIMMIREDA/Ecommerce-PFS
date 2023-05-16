import React from "react";

function SortBy() {
  return (
    <div>
      <label htmlFor="SortBy" className="block font-medium text-base mb-4">
        Sort By : 
      </label>
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>
          Sort By
        </option>
        <option value="Title, DESC">Title, DESC</option>
        <option value="Title, ASC">Title, ASC</option>
        <option value="Price, DESC">Price, DESC</option>
        <option value="Price, ASC">Price, ASC</option>
      </select>
    </div>
  );
}

export default SortBy;
