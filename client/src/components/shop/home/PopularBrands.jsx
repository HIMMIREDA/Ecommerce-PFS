import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const popularBrands = [
  {
    id: 1,
    name: "lenovo",
    image:
      "https://www.evetech.co.za/repository/ProductImages/lenovo-laptops-on-special-980px-v02.jpg",
  },
  {
    id: 2,
    name: "asus",
    image:
      "https://www.asus.com/media/Odin/Websites/uk/SiteSetting/20230104014044.jpg?webp",
  },
  {
    id: 3,
    name: "zara",
    image:
      "https://i2-prod.dailyrecord.co.uk/lifestyle/fashion-beauty/article26953652.ece/ALTERNATES/s810/0_Zara-shopping.jpg",
  },
];

const PopularBrands = () => {

  const {brands, isError, isLoading, isSuccess, message} = useSelector(state => state.brand);

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold sm:text-3xl">Popular Brands</h2>

          <Link
            to="/brands/popular"
            className="group mt-4 inline-flex  gap-1 text-xl font-medium items-center"
          >
            Most popular brands in our shop
            <span
              aria-hidden="true"
              className="block transition group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </header>

        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
          {brands?.slice(0, 3)?.map((brand, index) => (
            <li
              key={brand?.id}
              className={
                index == 2
                  ? "lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1"
                  : ""
              }
            >
              <Link
                to={`brand/${brand?.id}`}
                className="relative block group"
              >
                <img
                  src={brand?.image?.url}
                  alt={brand?.name}
                  className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl  font-bold text-base-content">
                    {brand?.name}
                  </h3>

                  <span className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PopularBrands;
