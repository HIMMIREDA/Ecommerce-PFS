import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchBrands, reset } from "../../features/brand/brandSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/common/Spinner";
import { Link, createSearchParams } from "react-router-dom";



const Brands = () => {
  const { brands, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.brand
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(
      fetchBrands({
        abortController,
        all: true,
      })
    );

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, message, isLoading, isSuccess, dispatch]);

  return isLoading ? (
    <Spinner />
  ) : (
    <section className=" py-10 px-12">
      <h2 className="text-center m-10 text-3xl font-bold sm:text-4xl">Browse by brand</h2>
      <div className="grid grid-flow-row gap-8  text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {brands?.map((brand) => (
          <div
            key={brand?.id}
            className="rounded-xl border flex flex-col items-center  border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-700/10"
          >
            <h2 className="mt-4 text-xl font-bold ">{brand?.name}</h2>

            <Link
              to={{
                pathname: `/shop`,
                search: `?${createSearchParams({
                  brand: brand.name,
                })}`,
              }}
              className="btn btn-primary m-3"
            >
              Browse
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Brands;
