import React from "react";
import { FaStar } from "react-icons/fa";
function Products() {
  return (
    <div>
      {/*
    Heads up! 👋
  
    This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
  
    Plugins:
      - @tailwindcss/forms
  */}

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-base sm:text-3xl">
              Product Collection
            </h2>

            <p className="mt-4 max-w-md text-base ">Hello Chez Darif</p>
          </header>

          <div className="mt-8 block lg:hidden">
            <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-base-300 transition hover:border-gray-600">
              <span className="text-sm font-medium"> Filters & Sorting </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-4 w-4 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
            <div className="space-y-4 lg:block">
              <div>
                <label
                  htmlFor="SortBy"
                  className="block text-xs font-medium text-base"
                >
                  Sort By
                </label>

                <select
                  id="SortBy"
                  className="mt-1 rounded border-gray-300 text-sm"
                >
                  <option>Sort By</option>
                  <option value="Title, DESC">Title, DESC</option>
                  <option value="Title, ASC">Title, ASC</option>
                  <option value="Price, DESC">Price, DESC</option>
                  <option value="Price, ASC">Price, ASC</option>
                </select>
              </div>

              <div>
                <p className="block text-xs font-medium text-base">Filters</p>

                <div className="mt-1 space-y-2">
                  <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
                      <span className="text-sm font-medium">
                        {" "}
                        Availability{" "}
                      </span>

                      <span className="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="border-t border-base-200 ">
                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <label
                            htmlFor="FilterInStock"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterInStock"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base ">
                              In Stock (5+)
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterPreOrder"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterPreOrder"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base ">
                              Pre Order (3+)
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterOutOfStock"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterOutOfStock"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base">
                              Out of Stock (10+)
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </details>

                  <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
                      <span className="text-sm font-medium"> Price </span>

                      <span className="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="border-t border-gray-200 ">
                      <header className="flex items-center justify-between p-4">
                        <span className="text-sm text-base">
                          The highest price is $600
                        </span>

                        <button
                          type="button"
                          className="text-sm text-base underline underline-offset-4"
                        >
                          Reset
                        </button>
                      </header>

                      <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between gap-4">
                          <label
                            htmlFor="FilterPriceFrom"
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm text-base">$</span>

                            <input
                              type="number"
                              id="FilterPriceFrom"
                              placeholder="From"
                              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            />
                          </label>

                          <label
                            htmlFor="FilterPriceTo"
                            className="flex items-center gap-2"
                          >
                            <span className="text-sm text-base">$</span>

                            <input
                              type="number"
                              id="FilterPriceTo"
                              placeholder="To"
                              className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </details>

                  <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
                      <span className="text-sm font-medium"> Colors </span>

                      <span className="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div className="border-t border-gray-200">
                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <label
                            htmlFor="FilterRed"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterRed"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base">
                              Red
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterBlue"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterBlue"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base">
                              Blue
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterGreen"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterGreen"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base">
                              Green
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterOrange"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterOrange"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base">
                              Orange
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterPurple"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterPurple"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base">
                              Purple
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            htmlFor="FilterTeal"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterTeal"
                              className="h-5 w-5 rounded border-gray-300"
                            />

                            <span className="text-sm font-medium text-base">
                              Teal
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </details>

                  <details className="overflow rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 text-base transition">
                      <span className="text-sm font-medium">Rating</span>
                      <span className="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>
                    <div className="border-t border-base-200">
                      <ul className="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <label
                            htmlFor="Filter1Star"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="Filter1Star"
                              className="h-5 w-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-base flex">
                              <FaStar className="text-yellow-500" />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label
                            htmlFor="Filter2Stars"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="Filter2Stars"
                              className="h-5 w-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-base flex">
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label
                            htmlFor="Filter3Stars"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="Filter3Stars"
                              className="h-5 w-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-base flex">
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label
                            htmlFor="Filter4Stars"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="Filter4Stars"
                              className="h-5 w-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-base flex">
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                            </span>
                          </label>
                        </li>
                        <li>
                          <label
                            htmlFor="Filter5Stars"
                            className="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="Filter5Stars"
                              className="h-5 w-5 rounded border-gray-300"
                            />
                            <span className="text-sm font-medium text-base flex">
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                              <FaStar className="text-yellow-500" />
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <li>
                  <a href="#" className="group block overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />

                    <div className="relative pt-3">
                      <h3 className="text-xs text-base group-hover:underline group-hover:underline-offset-4">
                        Basic Tee
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-base">
                          {" "}
                          £24.00 GBP{" "}
                        </span>
                      </p>
                      <br></br>
                      <button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 dark:text-gray-400">
                        <div class="flex w-full items-center justify-center bg-gray-100 dark:bg-gray-700 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
                          Add
                        </div>
                        <div class="flex items-center justify-center bg-gray-200 dark:bg-gray-600 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
                          +
                        </div>
                      </button>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#" className="group block overflow-hidden">
                    <img
                      src="https://static.massimodutti.net/3/photos//2023/V/0/2/p/1417/275/820/1417275820_1_1_16.jpg?t=1668598558874&impolicy=massimodutti-itxmediumhigh&imwidth=700&imformat=chrome"
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />

                    <div className="relative pt-3">
                      <h3 className="text-xs text-base group-hover:underline group-hover:underline-offset-4">
                        Basic Tee
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-base">
                          {" "}
                          £24.00 GBP{" "}
                        </span>
                      </p>
                      <br></br>
                      <button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow rounded-md text-gray-600 dark:text-gray-400">
                        <div class="flex w-full items-center justify-center bg-gray-100 dark:bg-gray-700 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
                          Add
                        </div>
                        <div class="flex items-center justify-center bg-gray-200 dark:bg-gray-600 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
                          +
                        </div>
                      </button>
                    </div>
                  </a>
                </li>

                <li>
                  <a href="#" className="group block overflow-hidden">
                    <img
                      src="https://static.massimodutti.net/3/photos//2023/V/0/2/p/1429/277/507/1429277507_1_1_16.jpg?t=1678791549985&impolicy=massimodutti-itxmediumhigh&imwidth=700&imformat=chrome"
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />

                    <div className="relative pt-3">
                      <h3 className="text-xs text-base group-hover:underline group-hover:underline-offset-4">
                        Basic Tee
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-base">
                          {" "}
                          £24.00 GBP{" "}
                        </span>
                      </p>
                      <br></br>
                      <button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow rounded-md text-gray-600 dark:text-gray-400">
                        <div class="flex w-full items-center justify-center bg-gray-100 dark:bg-gray-700 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
                          Add
                        </div>
                        <div class="flex items-center justify-center bg-gray-200 dark:bg-gray-600 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
                          +
                        </div>
                      </button>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <br></br>
          <br></br>
          <ol className="flex justify-center gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-basr bg-base text-base rtl:rotate-180"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-base text-center leading-8 text-base"
              >
                1
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-base text-center leading-8 text-base"
              >
                2
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-base text-center leading-8 text-base"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block h-8 w-8 rounded border border-gray-100 bg-base text-center leading-8 text-base"
              >
                4
              </a>
            </li>

            <li>
              <a
                href="#"
                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-base text-base rtl:rotate-180"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
export default Products;
