import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import CartItemList from "./CartItemList";
import CartFooter from "./CartFooter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCartItems,
  reset,
  toggleOpenCart,
} from "../../../features/cart/cartSlice";
import { toast } from "react-toastify";

function Cart() {
  const { isLoading, isSuccess, isError, message, isOpenCart } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    if (isOpenCart) {
      dispatch(fetchCartItems(abortController));
    }
    return () => {
      abortController.abort();
    };
  }, [dispatch, isOpenCart]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message, {
        toastId: "cartErrorToast",
      });
    }
    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, isLoading]);

  return (
    <Transition.Root show={isOpenCart} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => dispatch(toggleOpenCart())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-opacity-100 bg-base-100 ">
                  <div className="flex h-full flex-col overflow-y-scroll  shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 hover:text-gray-500"
                            onClick={() => dispatch(toggleOpenCart())}
                          >
                            <span className="sr-only">Close panel</span>
                            <AiOutlineClose
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      <CartItemList />
                    </div>

                    <CartFooter />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Cart;
