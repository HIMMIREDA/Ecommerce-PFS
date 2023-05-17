import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const carouselItems = [
  {
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946",
    title: "iphone 14 pro max",
    description: "Check the new iphone for 999$",
    link: "",
  },
  {
    image:
      "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt054c12973dc65d3e/60db71928491e60f790b1b87/f61138da5e0a3af7c7c83b6166f1cb03dbfee30f.jpg?quality=60&format=pjpg&auto=webp&width=1000",
    title: "Playstation 5",
    description: "Play has no limits, for 500$ exclusively",
    link: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    title: "Winter Collection",
    description: "By Luis Vuitton",
    link: "",
  },
  {
    image:
      "https://www.kworldnow.com/wp-content/uploads/2020/07/shallow-focus-photography-of-clothes-994517-scaled-1-1024x683.jpg",
    title: "New Fashion",
    description: "Check styled clothes",
    link: "",
  },
];

function Carousel() {
  return (
    <section className="carousel w-full h-auto lg:h-[700px]">
      {carouselItems?.map((carouselItem, index) => (
        <div
          key={index}
          id={`slide${index}`}
          className="relative carousel-item w-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${carouselItem?.image})`,
            backgroundPosition: "center",
          }}
        >
          <div className="relative mx-auto px-4 py-32 sm:px-6 flex justify-center items-center lg:px-8 w-full bg-black/25">
            <div className="max-w-xl text-center sm:text-left flex flex-col justify-center items-center">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                <strong className="block font-extrabold text-warning">
                  {carouselItem?.title}
                </strong>
              </h1>

              <p className="mt-4 max-w-lg sm:leading-relaxed  font-bold text-2xl lg:text-3xl text-white text-center">
                {carouselItem?.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center  justify-center">
                <Link
                  to={carouselItem?.link}
                  className="btn btn-warning group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md  px-6 py-2 transition"
                >
                  <div className="group flex w-full items-center justify-center rounded py-1 text-center font-bold">
                    Shop now
                    <FiArrowRight className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${
                index - 1 < 0 ? carouselItems.length - 1 : index - 1
              }`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${
                index + 1 >= carouselItems.length ? 0 : index + 1
              }`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Carousel;
