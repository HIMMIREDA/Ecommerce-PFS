import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import AddToCartBtn from "../shoppingcart/AddToCartBtn";
import { Product } from "../../../types/product";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addFavorite, reset } from "../../../features/wishlist/wishlistSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

type PropTypes = {
  product: Product;
};

const ProductCard = ({ product }: PropTypes) => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, message, isSuccess } = useAppSelector(
    (state) => state.wishlist
  );

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("product added to wishlist successfully");
    }
    dispatch(reset());
  }, [message, dispatch, isError, isSuccess, isLoading]);

  return (
    <div className="group relative block overflow-hidden">
      <button
        onClick={() => {
          dispatch(
            addFavorite({
              productId: product.id,
            })
          );
        }}
        className="absolute right-4 top-4 z-10  rounded-full  p-1.5 transition hover:text-gray-900/75"
      >
        <span className="sr-only">Wishlist</span>

        <FiHeart className="hover:text-red-500" />
      </button>

      <Link to={`/products/${product?.id}`}>
        <img
          src={product?.images[0]?.url}
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />
      </Link>

      <div className="relative border border-gray-100 p-6">
        <Link
          to={`products/${product?.id}`}
          className="mt-4 text-lg font-medium"
        >
          {product?.name}
        </Link>

        <p className="mt-1.5 text-sm p-2">{product?.price} $</p>
        <div className="mt-5">
          <AddToCartBtn productId={product?.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
