import React from "react";
import { BsBag } from "react-icons/bs";

function Cart() {
  return (
    <div
      className="cursor-pointer flex mr-6 items-center hover:text-gray-600 relative h-fit"
    >
      <BsBag className="text-2xl" />
      <div className="bg-red-500 absolute -right-2 -bottom-2  text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
        5
      </div>
    </div>
  );
}

export default Cart;
