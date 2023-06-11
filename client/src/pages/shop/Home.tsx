import  { useEffect } from "react";
import Carousel from "../../components/shop/home/Carousel";
import FeaturedProducts from "../../components/shop/home/FeaturedProducts";
import ShopByCategory from "../../components/shop/home/ShopByCategory";
import PopularBrands from "../../components/shop/home/PopularBrands";
import Spinner from "../../components/common/Spinner";
import { toast } from "react-toastify";
import {
  fetchBrands,
  reset as resetBrandSLice,
} from "../../features/brand/brandSlice";
import {
  searchProducts,
  reset as resetProductSLice,
} from "../../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Home = () => {
  const dispatch = useAppDispatch();
  const brandSlice = useAppSelector((state) => state.brand);
  const productSlice = useAppSelector((state) => state.product);

  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchBrands({abortController, page: 1, limit: 3}));
    dispatch(searchProducts({ abortController, page: 1, limit: 10 }));

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

  if (productSlice.isLoading || brandSlice.isLoading) {
    return <Spinner />;
  }
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
