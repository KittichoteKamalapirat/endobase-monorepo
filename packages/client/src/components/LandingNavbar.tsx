import { AiFillHome } from "react-icons/ai";

import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { brandName, ICON_SIZE } from "../constants";
import { urlResolver } from "../lib/UrlResolver";

import { HiInformationCircle } from "react-icons/hi";
import { ACTIVE_PAGE_CLASSNAMES, primaryColor } from "../theme";

const PATH_ENUM = {
  HOME: urlResolver.index(),

  ABOUT: urlResolver.about(),
} as const;
const LandingNavbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col xl:flex-row z-100 bg-grey-0 container px-2 xl:px-10 py-2 justify-between items-center mx-auto top-0">
      <a href={urlResolver.index()} className="mt-4 flex items-center">
        <img src="/logo.svg" className="mr-3 h-8" alt={`${brandName} logo`} />
        {/* <span className="self-center text-xl font-semibold whitespace-nowrap hover:underline">
          {brandName}
        </span> */}
      </a>

      <div className="w-full xl:w-auto" id="navbar-default">
        <ul className="flex justify-between items-center p-4 mt-4 rounded-lg border-gray-100 xl:flex-row xl:space-x-8 xl:mt-0 xl:font-medium xl:border-0 xl:bg-white text-grey-400">
          <li>
            <Link
              to={PATH_ENUM.HOME}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.HOME
                    ? ACTIVE_PAGE_CLASSNAMES
                    : "rounded-md"
                }`
              )}
            >
              <div
                className={classNames(
                  "flex gap-1 items-center",
                  "flex-col xl:flex-row"
                )}
              >
                <AiFillHome size={ICON_SIZE} color={primaryColor} />
                <span>Home</span>
              </div>
            </Link>
          </li>

          <li
            className={classNames(
              "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer rounded-md"
            )}
          >
            <Link
              to={PATH_ENUM.ABOUT}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.ABOUT
                    ? ACTIVE_PAGE_CLASSNAMES
                    : "rounded-md"
                }`
              )}
            >
              <div
                className={classNames(
                  "flex gap-1 items-center",
                  "flex-col xl:flex-row"
                )}
              >
                <HiInformationCircle size={ICON_SIZE} color={primaryColor} />
                <span>About</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavbar;
