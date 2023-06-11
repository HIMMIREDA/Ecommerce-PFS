import { toggleOpenCart } from "../../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Link } from "react-router-dom";

const CartFooter = () => {
  const { total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
      <div className="flex justify-between text-base font-medium ">
        <p>Subtotal</p>
        <p>${total}</p>
      </div>
      <p className="mt-0.5 text-sm">
        Shipping and taxes calculated at checkout.
      </p>
      <div className="mt-6 space-y-2">
        <Link
          to={"/cart"}
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          View Cart
        </Link>
        <Link
          to={"/checkout/addressForm"}
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </Link>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        <p>
          {"or "}
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500"
            onClick={() => dispatch(toggleOpenCart())}
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default CartFooter;
