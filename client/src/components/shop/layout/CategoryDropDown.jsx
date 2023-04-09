import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Electronics",
    subcategories: [
      {
        id: 11,
        name: "Computers",
        subcategories: [
          {
            id: 111,
            name: "Laptops",
            subcategories: [],
          },
          {
            id: 112,
            name: "Desktops",
            subcategories: [],
          },
        ],
      },
      {
        id: 12,
        name: "Phones",
        subcategories: [],
      },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    subcategories: [
      {
        id: 21,
        name: "Men",
        subcategories: [],
      },
      {
        id: 22,
        name: "Women",
        subcategories: [],
      },
    ],
  },
];

export default function CategoryDropDown() {
  return (
    <>
      <Link
        to={"/categories"}
        className="flex lg:hidden transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
      >
        Categories
      </Link>
      <div className="relative dropdown dropdown-hover hidden lg:block">
        <div
          tabIndex={0}
          className="items-center divide-x divide-gray-100 overflow-hidden"
        >
          <Link
            to={"/categories"}
            className="lg:flex items-center hidden transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900"
          >
            Categories
            <FiChevronDown />
          </Link>
        </div>

        <ul
          tabIndex={0}
          className="absolute dropdown-content menu right-0 z-10 p-3 w-56 rounded-md border border-base-300 badge-ghost shadow-lg"
          role="menu"
        >
          {categories?.map((category) => (
            <li
              key={category?.id}
              className="dropdown dropdown-hover relative"
              tabIndex={0}
            >
              <Link
                tabIndex={0}
                to={`/category/${category?.name}`}
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="flex justify-between">
                  {category?.name} <FiChevronRight />
                </span>
              </Link>
              <ul
                tabIndex={0}
                class="absolute dropdown-content menu right-0 top-0 z-10 p-3 w-56 rounded-md border border-base-300 badge-ghost shadow-lg"
              >
                {category?.subcategories?.map((subCategory) => (
                  <li
                    key={subCategory?.id}
                    className="dropdown dropdown-hover relative"
                    tabIndex={0}
                  >
                    <Link
                      to={`/category/${category?.name}/${subCategory?.name}`}
                      className="block rounded-lg px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                    >
                      <span className="flex justify-between">
                        {subCategory?.name} <FiChevronRight />
                      </span>
                    </Link>
                    {(subCategory?.subcategories || []).length !== 0 && (
                      <ul
                        tabIndex={0}
                        class="absolute dropdown-content menu right-0 top-0 z-10 p-3 w-56 rounded-md border border-base-300 badge-ghost shadow-lg"
                      >
                        {subCategory?.subcategories?.map((subSubCategory) => (
                          <Link
                            to={`/category/${category?.name}/${subCategory?.name}/${subSubCategory?.name}`}
                            className="block rounded-lg px-4 py-2 text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          >
                            <span className="flex justify-between">
                              {subSubCategory?.name}
                            </span>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
