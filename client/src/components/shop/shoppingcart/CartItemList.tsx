import CartItem from "./CartItem";
import Spinner from "../../common/Spinner";
import { useAppSelector } from "../../../app/hooks";

const CartItemList = () => {
  const { isLoading, cartItems } = useAppSelector((state) => state.cart);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cartItems?.map((item) => (
            <CartItem key={item?.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CartItemList;
