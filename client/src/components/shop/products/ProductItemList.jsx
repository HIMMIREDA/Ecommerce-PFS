import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, reset } from "../../../features/product/productSlice";
import ProductItem from "./ProductItem";
import { toast } from "react-toastify";
import Spinner from "../../common/Spinner";

const ProductItemList = () => {
  const { products, isLoading } = useSelector(
    (state) => state.product
  );
  

  if(isLoading){
    return <Spinner />
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductItem key={product?.id} product={product} />
      ))}
    </ul>
  );
};

export default ProductItemList;
