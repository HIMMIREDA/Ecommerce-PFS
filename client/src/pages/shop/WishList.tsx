import WishlistList from "../../components/shop/wishlist/WishlistList";

const WishList = () => {
  return (
    <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
      <div className="flex flex-col jusitfy-start items-start">
        <div>
          <p className="text-sm leading-4 text-gray-600">Home</p>
        </div>
        <div className="mt-3">
          <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">
            Favourites
          </h1>
        </div>
        <WishlistList />
      </div>
    </div>
  );
};

export default WishList;
