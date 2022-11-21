import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsInboxesFill } from "react-icons/bs";
import { GiWaterRecycling } from "react-icons/gi";

import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { brandName, ICON_SIZE } from "../constants";
import { useLogoutMutation } from "../generated/graphql";
import { client as apolloClient } from "../lib/apollo";
import { urlResolver } from "../lib/UrlResolver";
import logo from "../logo.svg";
import { ACTIVE_PAGE_CLASSNAMES, primaryColor } from "../theme";
import Button, { ButtonTypes } from "./Buttons/Button";
import { CONTAINER_TAB_OBJ } from "./Tabs/CONTAINER_TAB_TYPE";

enum PATH_ENUM {
  ACTIVITIES = "/activities",
  CONTAINERS = "/containers",
  HOME = "/",
  // SNAPSHOTS = "/snapshots",
  SETTING = "/setting",
}
const Navbar = () => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    await apolloClient.resetStore();
  };

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
                    ? ACTIVE_PAGE_CLASSNAMES
                    : "rounded-md"
                }`
              )}
            >
              <div className="flex gap-1 items-center">
                <AiFillHome size={ICON_SIZE} color={primaryColor} />
                <span>Home</span>
              </div>
            </Link>
          </li>
          <li>
            <div
              // to={PATH_ENUM.CONTAINERS}
              onClick={() => {
                navigate(`/containers`, {
                  state: { tab: "current" },
                });
              }}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer",
                `${
                  pathname === PATH_ENUM.CONTAINERS
                    ? ACTIVE_PAGE_CLASSNAMES
                    : "rounded-md"
                }`
              )}
            >
              <div className="flex gap-1 items-center">
                <BsInboxesFill size={ICON_SIZE - 2} color={primaryColor} />
                <span>Containers</span>
              </div>
            </div>
          </li>
          {/* <li>
            <Link
              to={PATH_ENUM.SNAPSHOTS}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.SNAPSHOTS
                    ? ACTIVE_PAGE_CLASSNAMES
                    : "rounded-md"
                }`
              )}
            >
              <div className="flex gap-1 items-center">
                <AiOutlineHistory size={ICON_SIZE} color={primaryColor} />
                <span>Data Snapshots</span>
              </div>
            </Link>
          </li> */}
          <li>
            <Link
              to={PATH_ENUM.ACTIVITIES}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.ACTIVITIES
                    ? ACTIVE_PAGE_CLASSNAMES
                    : "rounded-md"
                }`
              )}
            >
              <div className="flex gap-1 items-center">
                <GiWaterRecycling size={ICON_SIZE} color={primaryColor} />
                <span>Activities</span>
              </div>
            </Link>
          </li>

          <li>
            <Link
              to={PATH_ENUM.SETTING}
              className={classNames(
                "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer ",
                `${
                  pathname === PATH_ENUM.SETTING
                    ? ACTIVE_PAGE_CLASSNAMES
                    : "rounded-md"
                }`
              )}
            >
              <div className="flex gap-1 items-center">
                <AiFillSetting size={ICON_SIZE} color={primaryColor} />
                <span>Setting</span>
              </div>
            </Link>
          </li>

          <li>
            <Button
              label="Logout"
              onClick={handleLogout}
              loading={logoutLoading}
              type={ButtonTypes.TEXT}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
