import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/shop/checkout/CheckoutForm";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCartItems } from "../../features/cart/cartSlice";
import { reset } from "../../features/category/categorySlice";
import { axiosPrivate } from "../../api/axios";
import {
  Appearance,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

const Checkout = () => {
  const [clientSecret, setClientSecret] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message, cartItems, total } =
    useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [searchParams, _] = useSearchParams();

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
          city: searchParams.get("city"),
          country: searchParams.get("country"),
          addressLine: searchParams.get("addressLine"),
          postalCode: searchParams.get("postalCode"),
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
  );
};

export default Checkout;
