import { Link } from "react-router-dom";
import { toggleOpenCart } from "../../../features/cart/cartSlice";
import { CartItem as ICartItem } from "../../../types/cartItem";
import DeleteCartItemBtn from "./DeleteCartItemBtn";
import { useAppDispatch } from "../../../app/hooks";

type PropTypes = {
  item: ICartItem;
};

const CartItem = ({ item }: PropTypes) => {
  const dispatch = useAppDispatch();
  return (
    <li key={item?.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={item?.product?.images[0]?.url}
          alt={item?.product?.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3>
              <Link
                to={`/products/${item?.product?.id}`}
                onClick={() => dispatch(toggleOpenCart())}
              >
                {item?.product?.name}
              </Link>
            </h3>
            <p className="ml-4">${item?.product?.price}</p>
          </div>
          <p className="mt-1 text-sm ">variation opt1</p>
          <p className="mt-1 text-sm ">variation opt2</p>
          <p className="mt-1 text-sm ">variation opt3</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-slate-600">Qty : {item?.quantity}</p>

          <div className="flex">
            <DeleteCartItemBtn cartItemId={item.id} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
