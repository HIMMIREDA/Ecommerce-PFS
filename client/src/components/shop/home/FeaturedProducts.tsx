import { useRef } from "react";
import ProductCard from "../products/ProductCard";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { Swiper as SwiperType } from "swiper/types";

const FeaturedProducts = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const { products } = useAppSelector((state) => state.product);
  return (
    <section>
      <div className=" px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 ">
        <div className="max-w-7xl mx-auto items-center flex flex-col  space-y-3 ">
          <h2 className="max-w-xl text-xl font-bold tracking-tight sm:text-3xl text-center">
            Featured Products
          </h2>
          <Link
            to={"/shop"}
            className="group mt-4 inline-flex  gap-1 text-xl font-medium items-center"
          >
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
            {products?.slice(0, 10)?.map((product) => {
              return (
                <SwiperSlide
                  key={product?.id}
                  className="swiper-slide max-w-xl"
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              );
            })}

            {/* Swiper buttons next and prev */}
            <div className="mt-8 flex justify-center gap-4 ">
              <button
                aria-label="Previous slide"
                className="rounded-full border border-blue-600 p-4 text-blue-600 hover:bg-blue-600 hover:text-white"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <FiArrowLeft size={20} />
              </button>

              <button
                aria-label="Next slide"
                className="rounded-full border border-blue-600 p-4 text-blue-600 hover:bg-blue-600 hover:text-white"
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
