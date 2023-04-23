import React, { useRef } from "react";
import ProductCard from "../products/ProductCard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const featuredProducts = [];

const FeaturedProducts = () => {
  const swiperRef = useRef(null);
  return (
    <section>
      <div className=" px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <div className="max-w-7xl  items-center flex flex-col  space-y-3">
          <h2 className="max-w-xl text-xl font-bold tracking-tight sm:text-3xl text-center">
            Featured Products
          </h2>
          <Link to={"/products/featured"} className="group mt-4 inline-flex  gap-1 text-xl font-medium items-center">
            See more now{" "}
            <span
              aria-hidden="true"
              className="block transition group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>

        <div className="mt-8 lg:col-span-2 lg:mx-0">
          <Swiper
            allowTouchMove={true}
            parallax={true}
            slidesPerView={1}
            spaceBetween={32}
            autoplay={{ delay: 8000 }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                centeredSlides: true,
              },
              1024: {
                centeredSlides: false,
                slidesPerView: 2.25,
              },
            }}
            className="!overflow-hidden"
          >
            <SwiperSlide className="swiper-slide max-w-xl">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide max-w-xl">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide max-w-xl">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide max-w-xl">
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide max-w-xl">
              <ProductCard />
            </SwiperSlide>


            {/* Swiper buttons next and prev */}
            <div className="mt-8 flex justify-center gap-4 ">
              <button
                aria-label="Previous slide"
                className="rounded-full border border-pink-600 p-4 text-pink-600 hover:bg-pink-600 hover:text-white"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FiArrowLeft size={20} />
              </button>

              <button
                aria-label="Next slide"
                className="rounded-full border border-pink-600 p-4 text-pink-600 hover:bg-pink-600 hover:text-white"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <FiArrowRight size={20} />
              </button>
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;