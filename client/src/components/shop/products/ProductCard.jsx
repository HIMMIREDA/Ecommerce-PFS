import React from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="group relative block overflow-hidden">
      <button className="absolute right-4 top-4 z-10  rounded-full  p-1.5 transition hover:text-gray-900/75">
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

        <p className="mt-1.5 text-sm">{product?.price} $</p>

        <form className="mt-4">
          <button className="block w-full rounded bg-pink-400 p-4 text-sm font-medium transition hover:scale-105 text-base-100">
            Add to Cart
          </button>
        </form>
      </div>
    </div>
   
  );
};

export default ProductCard;
