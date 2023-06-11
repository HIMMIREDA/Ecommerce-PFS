import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchGrandChildCategories,
  reset,
} from "../../features/category/categorySlice";
import { toast } from "react-toastify";
import { Link, createSearchParams } from "react-router-dom";
import Spinner from "../../components/common/Spinner";

const Categories = () => {
  const { grandChildCategories, isLoading, isError, isSuccess, message } =
    useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(
      fetchGrandChildCategories({
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
    <section className="dark:bg-gray-900 py-10 px-12">
      <div className="grid grid-flow-row gap-8  text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {grandChildCategories?.map((category) => (
          <div
            key={category?.id}
            className="rounded-xl border flex flex-col items-center  border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-700/10"
          >
            <h2 className="mt-4 text-xl font-bold ">{category?.name}</h2>

            <p className="mt-1 text-sm">{category?.description}</p>
            <Link
              to={{
                pathname: `/shop`,
                search: `?${createSearchParams({
                  category: category.name,
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

export default Categories;
