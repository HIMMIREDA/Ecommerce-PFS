import React from "react";
import Product from "../products/Product";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";


const featuredProducts = [
  
];


const FeaturedProducts = () => {
  return (
    <section className="px-4 py-12 flex flex-col items-center space-y-3">
      <h2 className="text-3xl font-bold sm:text-4xl">Featured Products</h2>
      <Link
        to="/featured"
        className="group mt-4 inline-flex  gap-1 text-sm font-medium text-amber-600 items-center"
      >
        Browse all
        <span
          aria-hidden="true"
          className="block transition group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </Link>
      <div className="carousel carousel-center w-full p-4 space-x-4 rounded-box bg-base-100">
        <div className="carousel-item">
          <Product />
        </div>
        <div className="carousel-item">
          <Product />
        </div>
        <div className="carousel-item">
          <Product />
        </div>
        <div className="carousel-item">
          <Product />
        </div>
        <div className="carousel-item">
          <Product />
        </div>
        <div className="carousel-item">
          <Product />
        </div>
        <div className="carousel-item">
          <Product />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
