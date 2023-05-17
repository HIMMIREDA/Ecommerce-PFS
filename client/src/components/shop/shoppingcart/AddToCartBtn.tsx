import { useEffect } from "react";
import { addToCart, reset } from "../../../features/cart/cartSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

const AddToCartBtn = ({ productId }: { productId: string }) => {
  const { message, isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  const addItemToCart = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(
      addToCart({
        cartItem: {
          productId,
          quantity: 1,
        },
      })
    );
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        toastId: "cartErrorToast",
      });
    }

    if (isSuccess && message) {
      toast.success(message, {
        toastId: "createUpdateDeleteCartToast",
      });
    }
    dispatch(reset());
  }, [isError, isLoading, isSuccess, dispatch, message]);

  return (
    <button
      disabled={isLoading}
      className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600 dark:text-gray-400"
      onClick={addItemToCart}
    >
      <div className="flex w-full items-center justify-center bg-gray-100 dark:bg-gray-700 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
        Add
      </div>
      <div className="flex items-center justify-center bg-gray-200 dark:bg-gray-600 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
        +
      </div>
    </button>
  );
};

export default AddToCartBtn;
