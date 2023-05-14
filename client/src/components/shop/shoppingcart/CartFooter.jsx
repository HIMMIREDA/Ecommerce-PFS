import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleOpenCart } from "../../../features/cart/cartSlice";

const CartFooter = () => {

  const {total} = useSelector(state => state.cart);
  const dispatch = useDispatch();

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
        <a
          href="#"
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          View Cart
        </a>
        <a
          href="#"
          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </a>
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
