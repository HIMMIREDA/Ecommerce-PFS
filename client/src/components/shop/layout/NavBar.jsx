import React, { useState } from "react";
import {
  AiFillShop,
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import SearchBar from "./SearchBar";
import CartIcon from "./CartIcon";
import NavigationLinks from "./NavigationLinks";
import { Link } from "react-router-dom";

function NavBar({setOpenCart}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    
    <nav className="shadow z-20 bg-base-100 w-full sticky top-0">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center  w-32 normal-case text-xl"
            >
              <AiFillShop className="w-auto h-6 sm:h-7" size={40} />
              STORE
            </Link>

            {/* <!-- Mobile menu button --> */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setOpenMenu((prev) => !prev)}
                type="button"
                className=" btn btn-ghost hover:text-gray-600  focus:outline-none"
                aria-label="toggle menu"
              >
                {!openMenu ? (
                  <AiOutlineMenu size={25} />
                ) : (
                  <AiOutlineClose size={25} />
                )}
              </button>
            </div>
          </div>

          <div
            className={`${
              openMenu
                ? "translate-x-0 opacity-100 bg-base-100"
                : "opacity-0 -translate-x-full"
            } absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}
          >
            <SearchBar />
            <NavigationLinks />
            <div className="flex justify-center items-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
              <Link
                to={"/wishlist"}
                className="mx-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-500 "
              >
                <AiOutlineHeart size={30} />
              </Link>
              <a
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-500 "
                onClick={() => setOpenCart(isOpen => !isOpen)}
              >
                <CartIcon />
              </a>
              <div
                href="#"
                className="mx-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-500 "
              >
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 rounded-full">
                      <AiOutlineUser size={30} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                  >
                    
                    <li>
                      <Link to="/login">Sign In</Link>
                    </li>
                    <li>
                      <Link to="/register">Sign Up</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
