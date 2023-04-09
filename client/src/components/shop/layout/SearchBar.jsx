import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar() {
  return (
    <>
    
    <div className="relative mt-4 lg:mt-0 lg:mx-4">
    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
      <AiOutlineSearch size={25} />
    </span>

    <input
      type="text"
      className="input w-full  py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 border-b border-gray-600 dark:placeholder-gray-300 lg:w-56 lg:border-transparent focus:outline-none focus:border-gray-600"
      placeholder="Search Product"
    />
    
  </div>
  </>
  );
}

export default SearchBar;
