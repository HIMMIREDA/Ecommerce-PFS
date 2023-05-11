import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";

export default function CategoryDropDown() {
  const { categories } = useSelector((state) => state.category);

  return (
    <>
      <Link
        to={"/categories"}
        className="flex lg:hidden transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-400"
      >
        Categories
      </Link>
      <div className="relative dropdown dropdown-hover hidden lg:block">
        <div
          tabIndex={0}
          className="items-center divide-x divide-gray-100 overflow-hidden"
        >
          <Link
            to={"/categories"}
            className="lg:flex items-center hidden transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-400"
          >
            Categories
            <FiChevronDown />
          </Link>
        </div>

        <ul
          tabIndex={0}
          className="absolute dropdown-content menu right-0 z-10 p-3 w-56 rounded-md border border-base-300 badge-ghost shadow-lg"
        >
          {categories?.map((category) => (
            <li
              key={category?.id}
              className="dropdown dropdown-hover relative"
              tabIndex={0}
            >
              <Link
                tabIndex={0}
                to={`/category/${category?.id}`}
                className="block rounded-lg px-4 py-2 text-sm font-bold hover:bg-gray-50 hover:text-gray-700"
              >
                <span className="flex justify-between">
                  {category?.name} <FiChevronRight />
                </span>
              </Link>
              {category?.subCategories?.length !== 0 && (
                <ul
                  tabIndex={0}
                  className="absolute dropdown-content menu right-0 top-0 z-10 p-3 w-56 rounded-md border border-base-300 badge-ghost shadow-lg"
                >
                  {category?.subCategories?.map((subCategory) => (
                    <li
                      key={subCategory?.id}
                      className="dropdown dropdown-hover relative"
                      tabIndex={0}
                    >
                      <Link
                        to={`/category/${subCategory?.id}`}
                        className="block rounded-lg px-4 py-2 text-sm font-bold hover:bg-gray-50 hover:text-gray-700"
                      >
                        <span className="flex justify-between">
                          {subCategory?.name} <FiChevronRight />
                        </span>
                      </Link>
                      {(subCategory?.subCategories || []).length !== 0 && (
                        <ul
                          tabIndex={0}
                          className="absolute dropdown-content menu right-0 top-0 z-10 p-3 w-56 rounded-md border border-base-300 badge-ghost shadow-lg"
                        >
                          {subCategory?.subCategories?.map((subSubCategory) => (
                            <Link
                              key={subSubCategory?.id}
                              to={`/category/${subSubCategory?.id}`}
                              className="block rounded-lg px-4 py-2 text-sm font-bold hover:bg-gray-50 hover:text-gray-700"
                            >
                              <span className="flex justify-between">
                                {subSubCategory?.name}
                              </span>
                            </Link>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
