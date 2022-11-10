import { Link } from "react-router-dom";
import { brandName } from "../constants";
import { urlResolver } from "../lib/UrlResolver";
import logo from "../logo.svg";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

enum PATH_ENUM {
  ACTIVITIES = "/activities",
  CONTAINERS = "/containers",
  HOME = "/",
  SNAPSHOTS = "/snapshots",
}
const Navbar = () => {
  const { pathname } = useLocation();

  const currPathClassnames =
    "text-primary-primary font-bold border-solid border-b-2 border-primary-primary rounded-t-md";

  return (
    <nav className="z-100 fixed bg-grey-0 container px-10 py-2 flex flex-wrap justify-between items-center mx-auto top-0">
      <a href={urlResolver.index()} className="flex items-center">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Gomugomu logo" />
        <span className="self-center text-xl font-semibold whitespace-nowrap hover:underline">
          {brandName}
        </span>
      </a>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg  border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 md:bg-white text-grey-400">
          <li>
            <Link
              to={PATH_ENUM.HOME}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.HOME
                    ? currPathClassnames
                    : "rounded-md"
                }`
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to={PATH_ENUM.CONTAINERS}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer",
                `${
                  pathname === PATH_ENUM.CONTAINERS
                    ? currPathClassnames
                    : "rounded-md"
                }`
              )}
            >
              Containers
            </Link>
          </li>
          <li>
            <Link
              to={PATH_ENUM.SNAPSHOTS}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.SNAPSHOTS
                    ? currPathClassnames
                    : "rounded-md"
                }`
              )}
            >
              Data Snapshots
            </Link>
          </li>
          <li>
            <Link
              to={PATH_ENUM.ACTIVITIES}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.ACTIVITIES
                    ? currPathClassnames
                    : "rounded-md"
                }`
              )}
            >
              Activities
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
