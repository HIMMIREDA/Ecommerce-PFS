import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCartItems, reset } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import ShoppingCartItem from "../../components/shop/shoppingcartpage/ShoppingCartItem";

const ShoppingCart = () => {
  const { isLoading, isSuccess, isError, message, cartItems, total } =
    useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchCartItems(abortController));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

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
  }, [isError, isSuccess, message, dispatch, isLoading]);

  return (
    <div className=" pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Shopping Cart</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems?.map((cartItem) => (
            <ShoppingCartItem key={cartItem.id} item={cartItem} />
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border  p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${total}</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
