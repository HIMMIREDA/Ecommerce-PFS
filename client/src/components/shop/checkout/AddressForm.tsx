import { useState } from "react";
import { Link, createSearchParams } from "react-router-dom";

const AddressForm = () => {
  const [addressForm, setAddressForm] = useState<{ [key: string]: string }>({
    city: "",
    country: "morocco",
    postalCode: "",
    addressLine: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={() => {}}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="addressLine"
                className="block text-sm font-medium text-gray-700"
              >
                Address Line
              </label>
              <input
                onChange={onChange}
                type="text"
                name="addressLine"
                id="addressLine"
                autoComplete="email"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block input input-bordered w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country / Region
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm select select-bordered w-full max-w-xs"
              >
                <option>Morocco</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                CIty
              </label>
              <input
                onChange={onChange}
                type="text"
                name="city"
                id="city"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block input input-bordered w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                ZIP / Postal
              </label>
              <input
                onChange={onChange}
                type="number"
                name="postalCode"
                id="postalCode"
                autoComplete="postal-code"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block input input-bordered w-full max-w-xs shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Link
            to={{
              pathname: "../checkoutForm",
              search: `?${createSearchParams({
                city: addressForm.city,
                country: addressForm.country,
                addressLine: addressForm.addressLine,
                postalCode: addressForm.postalCode,
              })}`,
            }}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 btn"
          >
            Save
          </Link>
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
