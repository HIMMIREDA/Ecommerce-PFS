import AddressForm from "../../components/shop/checkout/AddressForm";

const Address = () => {
  return (
    <div className="mt-10 sm:mt-0 p-10">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Order Shipping Information
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Add a shipping address
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <AddressForm />
        </div>
      </div>
    </div>
  );
};

export default Address;
