import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/shop/checkout/CheckoutForm";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCartItems, reset } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

function Checkout() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message, cartItems, total } =
    useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchCartItems(abortController));
    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isLoading, isError, isSuccess, message, dispatch]);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axiosPrivate
      .post(
        "/payments/create-payment-intent",
        {
          city: "Marrakech",
          country: "Morocco",
          addressLine: "Boulevard amir mly abdellah boustane",
          postalCode: 40000,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
      .then((response) => {
        setClientSecret(response.data.clientSecret);
      });
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <div className="flex flex-col items-center border-b  py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>

          <div className="mt-8 space-y-3 rounded-lg border  px-2 py-4 sm:px-6">
            {cartItems?.map((cartItem) => (
              <div
                className="flex flex-col rounded-lg  sm:flex-row"
                key={cartItem.id}
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={cartItem.product.images[0].url}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">{cartItem.product.name}</span>
                  <span className="float-right text-gray-400">
                    quantity: {cartItem.quantity}
                  </span>
                  <p className="text-lg font-bold">{cartItem.product.price}</p>
                </div>
                <hr />
              </div>
            ))}
            <div className="mt-6 h-full rounded-lg border p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10  px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>

          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
}

export default Checkout;
