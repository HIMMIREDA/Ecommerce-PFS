import React, { useState } from "react";
import Carousel from "../../components/shop/home/Carousel";
import FeaturedProducts from "../../components/shop/home/FeaturedProducts";
import ShopByCategory from "../../components/shop/home/ShopByCategory";
import PopularBrands from "../../components/shop/home/PopularBrands";


const Home = () => {
  return (
    <>
    <Carousel />
    <ShopByCategory />
    <FeaturedProducts />
    <PopularBrands />
      {/* <Footer /> */}
    </>
  );
};

export default Home;
