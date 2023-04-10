import React from "react";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";


const Product = ({product}) => {
  return (
    <Link to={`products/${product?.id}`} className="group relative block overflow-hidden">
      <button className="absolute right-4 top-4 z-10  rounded-full  p-1.5 transition hover:text-gray-900/75">
        <span className="sr-only">Wishlist</span>

        <FiHeart className="hover:text-red-500" />
      </button>


      <img
        src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
        alt=""
        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border border-gray-100 p-6">
        <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium text-base-100">
          New
        </span>

        <h3 className="mt-4 text-lg font-medium">Robot Toy</h3>

        <p className="mt-1.5 text-sm">$14.99</p>

        <form className="mt-4">
          <button className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 text-base-100">
            Add to Cart
          </button>
        </form>
      </div>
    </Link>
  );
};

export default Product;
