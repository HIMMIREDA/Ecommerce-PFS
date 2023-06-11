import { useState } from "react";
import { Product } from "../../../types/product";
import { Link } from "react-router-dom";
import AddToCartBtn from "../shoppingcart/AddToCartBtn";
import { useAppDispatch } from "../../../app/hooks";
import { deleteFavorite } from "../../../features/wishlist/wishlistSlice";

type PropTypes = {
  product: Product;
};

const WishListItem = ({ product }: PropTypes) => {
  const [show, setshow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col">
      <div className="relative">
        <img
          className="hidden lg:block"
          src={product.images[0].url}
          width={300}
          height={300}
        />
        <img
          className="hidden sm:block lg:hidden"
          src={product.images[0].url}
          width={300}
          height={300}
        />
        <img
          className="sm:hidden"
          src={product.images[0].url}
          width={300}
          height={300}
        />

        <button
          aria-label="close"
          onClick={() => {
            dispatch(
              deleteFavorite({
                productId: product.id,
              })
            );
          }}
          className="top-4 right-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute  p-1.5 bg-red-500 text-white hover:text-gray-400"
        >
          <svg
            className="fil-current"
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 1L1 13"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L13 13"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <p className="tracking-tight text-2xl font-semibold leading-6 text-gray-800">
            {product.name}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <button
            aria-label="show menu"
            onClick={() => setshow((show) => !show)}
            className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-2.5 px-2 bg-gray-800 text-white hover:text-gray-400"
          >
            <svg
              className={`fill-stroke ${show ? "block" : "hidden"}`}
              width={10}
              height={6}
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L5 1L1 5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className={`fill-stroke ${show ? "hidden" : "block"}`}
              width={10}
              height={6}
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        id="menu1"
        className={` flex-col jusitfy-start items-start mt-12 ${
          show ? "flex" : "hidden"
        }`}
      >
        <div>
          <p className="tracking-tight text-xs leading-3 text-gray-800">
            {product.brand?.name}
          </p>
        </div>
        <div className="mt-2">
          <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
            {product.name}
          </p>
        </div>

        <div className="mt-6">
          <p className="tracking-tight text-base font-medium leading-4 text-gray-800">
            ${product.price}
          </p>
        </div>
        <div className="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full  space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
          <div className="w-full">
            <Link to={`/products/${product.id}`} className=" btn btn-primary">
              More information
            </Link>
          </div>
          <div className="w-full">
            <AddToCartBtn productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListItem;
