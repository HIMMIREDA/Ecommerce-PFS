import { Link } from "react-router-dom";
import CategoryDropDown from "./CategoryDropDown";

const navigationLinks = [
  { title: "Home", link: "/" },
  { title: "Categories", link: "/categories", component: <CategoryDropDown /> },
  { title: "Shop", link: "/shop" },
  { title: "Brands", link: "/brands" },
  { title: "Deals", link: "/deals" },
];
const NavigationLinks = () => {
  return (
    <ul className="flex flex-col mt-3 lg:mt-0 space-y-3 lg:space-y-0 capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
      
        {navigationLinks.map((navLink, index) => (
          <li key={index}>
            {navLink?.component || (
              <Link
                to={navLink.link}
                className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-400"
              >
                {navLink.title}
              </Link>
            )}
          </li>
        ))}
    </ul>
  );
};

export default NavigationLinks;
