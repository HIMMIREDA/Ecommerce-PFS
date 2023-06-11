import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  fecthFavorites,
  reset,
} from "../../../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import WishListItem from "./WishListItem";

const WishlistList = () => {
  const { products, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.wishlist
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fecthFavorites(abortController));

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    dispatch(reset());
  }, [message, isError, isSuccess, isLoading, dispatch]);

  console.log(products)
  return (
    <>
        <div className="mt-4">
          <p className="text-2xl tracking-tight leading-6 text-gray-600">
            {products.length} items
          </p>
        </div>
        <div className=" mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0">
          {products?.map(product => (
            <WishListItem product={product} key={product.id} />
          ))}
        </div>
      </>
  );
};

export default WishlistList;
