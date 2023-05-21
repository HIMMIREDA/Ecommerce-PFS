import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { deleteCartItem, reset } from "../../../features/cart/cartSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

type Props = {
  cartItemId: string;
};

const DeleteCartItemBtn = ({ cartItemId }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, message, isError } = useAppSelector(
    (state) => state.cart
  );
  const deleteItemFromCart = () => {
    dispatch(
      deleteCartItem({
        cartItemId: cartItemId,
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
    <button onClick={deleteItemFromCart}>
      <FaTrash className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" />
    </button>
  );
};

export default DeleteCartItemBtn;
