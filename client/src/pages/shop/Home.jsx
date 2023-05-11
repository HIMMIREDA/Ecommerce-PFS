import React, { useEffect } from "react";
import Carousel from "../../components/shop/home/Carousel";
import FeaturedProducts from "../../components/shop/home/FeaturedProducts";
import ShopByCategory from "../../components/shop/home/ShopByCategory";
import PopularBrands from "../../components/shop/home/PopularBrands";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  reset as resetCategorySLice,
} from "../../features/category/categorySlice";
import Spinner from "../../components/common/Spinner";
import { toast } from "react-toastify";
import {
  fetchBrands,
  reset as resetBrandSLice,
} from "../../features/brand/brandSlice";
import {
  fetchProducts,
  reset as resetProductSLice,
} from "../../features/product/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const brandSlice = useSelector((state) => state.brand);
  const productSlice = useSelector((state) => state.product);

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchBrands(abortController));
    dispatch(fetchProducts(abortController));

    return () => {
      abortController.abort();
    };
  }, [dispatch]);


  useEffect(() => {
    if (brandSlice.isError && brandSlice.message) {
      toast.error(brandSlice.message);
    }

    dispatch(resetBrandSLice());
  }, [brandSlice.isError, brandSlice.message, brandSlice.isSuccess, dispatch]);

  useEffect(() => {
    if (productSlice.isError && productSlice.message) {
      toast.error(productSlice.message);
    }

    dispatch(resetProductSLice());
  }, [
    productSlice.isError,
    productSlice.message,
    productSlice.isSuccess,
    dispatch,
  ]);

  return (
    <>
      <Carousel />
      <ShopByCategory />
      <FeaturedProducts />
      <PopularBrands />
    </>
  );
};

export default Home;
