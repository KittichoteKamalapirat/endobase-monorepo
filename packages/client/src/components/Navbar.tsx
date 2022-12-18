import { FiLogOut } from "react-icons/fi";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { BsInboxesFill } from "react-icons/bs";
import { GiWaterRecycling } from "react-icons/gi";

import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { brandName, ICON_SIZE } from "../constants";
import { useLogoutMutation } from "../generated/graphql";
import { client as apolloClient } from "../lib/apollo";
import { urlResolver } from "../lib/UrlResolver";

import { ACTIVE_PAGE_CLASSNAMES, primaryColor } from "../theme";
import Button, { ButtonTypes } from "./Buttons/Button";

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
              <div
                className={classNames(
                  "flex gap-1 items-center",
                  "flex-col xl:flex-row"
                )}
              >
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
              <div
                className={classNames(
                  "flex gap-1 items-center",
                  "flex-col xl:flex-row"
                )}
              >
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
              <div
                className={classNames(
                  "flex gap-1 items-center",
                  "flex-col xl:flex-row"
                )}
              >
                <AiFillSetting size={ICON_SIZE} color={primaryColor} />
                <span>Setting</span>
              </div>
            </Link>
          </li>

          <li
            className={classNames(
              "block py-2 pr-4 pl-3 hover:bg-primary-50 hover:cursor-pointer rounded-md"
            )}
          >
            <div
              className={classNames(
                "flex gap-1 items-center",
                "flex-col xl:flex-row"
              )}
            >
              <FiLogOut size={ICON_SIZE} color={primaryColor} />

              <Button
                label="Logout"
                onClick={handleLogout}
                loading={logoutLoading}
                type={ButtonTypes.TEXT}
                fontColor="text-grey-500"
              />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
