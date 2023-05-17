import React from "react";
import AddToCartBtn from "../shoppingcart/AddToCartBtn";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  return (
    <li>
      <Link
        to={`/products/${product?.id}`}
        className="group block overflow-hidden"
      >
        <img
          src={product?.images[0].url}
          alt=""
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />
        <div className="relative pt-3">
          <h2>{product?.name}</h2>
          <p className="mt-2">
            <span className="tracking-wider text-base">
              {" "}
              ${product?.price}{" "}
            </span>
          </p>
          <br></br>
          <AddToCartBtn productId={product?.id} />
        </div>
      </Link>
    </li>
  );
}

export default ProductItem;
