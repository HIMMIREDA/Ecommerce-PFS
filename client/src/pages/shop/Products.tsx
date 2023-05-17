import { useEffect } from "react";
import ProductItemList from "../../components/shop/products/ProductItemList";
import Pagination from "../../components/common/Pagination";
import {
  fetchProducts,
  setSearchQuery,
} from "../../features/product/productSlice";
import FilterByCategory from "../../components/shop/products/filters/FilterByCategory";
import FilterByBrand from "../../components/shop/products/filters/FilterByBrand";
import FilterByRating from "../../components/shop/products/filters/FilterByRating";
import SortBy from "../../components/shop/products/filters/SortBy";
import FilterByPrice from "../../components/shop/products/filters/FilterByPrice";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

function Products() {
  const searchParams = useSearchParams()[0];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchQuery(searchParams.get("search")));
    let abortController = new AbortController();
    dispatch(fetchProducts({ abortController, page: 1 }));
    return () => {
      abortController.abort();
    };
  }, [searchParams]);
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="font-bold text-base sm:text-3xl">
              Product Collection
            </h2>

            <p className="mt-4 max-w-md text-base ">Welcome to ESHOP</p>
          </header>

          <div className="mt-8 block">
            <button className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 transition hover:border-gray-600">
              <span className="font-medium"> Filters & Sorting </span>

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
              <SortBy />

              <div>
                <p className="block font-medium text-base">Filters</p>

                <div className="mt-1 space-y-2">
                  <FilterByCategory />

                  <FilterByPrice />

                  <FilterByBrand />

                  <FilterByRating />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 mt-4">
              <ProductItemList />
            </div>
          </div>
          <br></br>
          <br></br>
          <Pagination sliceName={"product"} fetchDataAction={fetchProducts} />
        </div>
      </section>
    </div>
  );
}
export default Products;
