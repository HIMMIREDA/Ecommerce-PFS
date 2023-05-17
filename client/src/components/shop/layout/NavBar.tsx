import{ useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCategories,
  reset,
} from "../../../features/category/categorySlice";
import { toast } from "react-toastify";
import { toggleOpenCart } from "../../../features/cart/cartSlice";
import { logoutUser } from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { isError, message, isSuccess } = useAppSelector(
    (state) => state.category
  );
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutClickHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  useEffect(() => {
    let abortController = new AbortController();
    dispatch(fetchCategories(abortController));

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isError, message, isSuccess, dispatch]);

  return (
    <nav className="shadow z-20 w-full sticky top-0 bg-base-100">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center  w-32 normal-case text-xl"
            >
              <AiFillShop className="w-auto h-6 sm:h-7" size={40} />
              E-SHOP
            </Link>

            {/* <!-- Mobile menu button --> */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setOpenMenu((prev) => !prev)}
                type="button"
                className=" btn btn-ghost hover  focus:outline-none"
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
                className="mx-2 transition-colors duration-300 transform hover:text-gray-500 "
              >
                <AiOutlineHeart size={30} />
              </Link>
              <a
                className="mx-2 transition-colors duration-300 transform hover:text-gray-500 "
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(toggleOpenCart());
                }}
              >
                <CartIcon />
              </a>
              <div className="mx-2 transition-colors duration-300 transform hover:text-gray-500 ">
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
                    {user ? (
                      <>
                        <Link to="/profile" className="p-2">
                          Profile
                        </Link>
                        <Link onClick={logoutClickHandler} to={"#"} className="p-2">
                          Logout
                        </Link>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link className="p-2" to="/login">
                            Sign In
                          </Link>
                        </li>
                        <li>
                          <Link className="p-2" to="/register">
                            Sign Up
                          </Link>
                        </li>
                      </>
                    )}
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
