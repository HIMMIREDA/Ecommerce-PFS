import { FaTrash } from "react-icons/fa";
import { CartItem } from "../../../types/cartItem";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCartItem, reset } from "../../../features/cart/cartSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

type Props = {
  item: CartItem;
};

export default function ShoppingCartItem({ item }: Props) {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, message, isError } = useAppSelector(
    (state) => state.cart
  );
  const deleteItemFromCart = () => {
    dispatch(
      deleteCartItem({
        cartItemId: item?.id,
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
  }, [isError, isSuccess, isLoading, message, dispatch]);
  return (
    <div
      key={item.id}
      className="justify-between mb-6 rounded-lg  p-6 shadow-md sm:flex sm:justify-start"
    >
      <img
        src={item.product.images[0].url}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-base-content">
            {item.product.name}
          </h2>
          <p className="mt-1 text-xs text-base-content bg-base-300 p-2 border rounded-full">
            color: red / size: M / gender: women
          </p>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span className="cursor-pointer rounded-l bg-base-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 border  text-center text-xs outline-none bg-base-100"
              type="number"
              value={item.quantity}
              min={1}
              max={item.product.quantity}
            />
            <span className="cursor-pointer rounded-r bg-base-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">${item.product.price}</p>
            <button onClick={deleteItemFromCart}>
              <FaTrash className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
