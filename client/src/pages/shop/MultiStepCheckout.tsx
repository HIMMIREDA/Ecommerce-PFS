import { Link, Outlet, useLocation } from "react-router-dom";

function MultiStepCheckout() {
  const location = useLocation();

  const isStepActive = (stepPath: string) => {
    return location.pathname.includes(stepPath);
  };

  const isAddressFormActive = isStepActive("/addressForm");
  const isCheckoutFormActive = isStepActive("/checkoutForm");
  const isCheckoutSuccessful = isStepActive("/success");
  return (
    <>
      <div className="flex flex-col items-center border-b  py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Checkout
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="steps">
              <Link to={"/shop"} className="step step-primary">Shop</Link>
              <Link
                to={"/checkout/addressForm"}
                onClick={(e) => {
                  isCheckoutSuccessful ? e.preventDefault() : null;
                }}
                className={`step ${
                  isCheckoutFormActive || isAddressFormActive || isCheckoutSuccessful
                    ? "step-primary"
                    : ""
                }`}
              >
                Address
              </Link>
              <Link
                to={"/checkout/checkoutForm"}
                onClick={(e) => {
                  isCheckoutSuccessful ? e.preventDefault() : null;
                }}
                className={`step ${isCheckoutFormActive || isCheckoutSuccessful ? "step-primary" : ""}`}
              >
                Checkout
              </Link>
              <li
                className={`step ${isCheckoutSuccessful ? "step-primary" : ""}`}
              >
                Success
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default MultiStepCheckout;
