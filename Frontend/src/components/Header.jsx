import { useState } from "react";
import { Link, NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { scrollToTop } from "../utils/scrollToTop";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [openMenu, setOpenMenu] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [openUser, setOpenUser] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleUserOpen = () => {
    setOpenUser(!openUser);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?name=${encodeURIComponent(searchInput)}`);
  };

  const handleLogout = async () => {
    try {
      await api.post("/users/logout", {
        refreshToken: currentUser?.data?.refreshToken,
      });

      dispatch(logout());
      setOpenSubmenu(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleSubmenu = () => {
    setOpenSubmenu(!openSubmenu);
  };

  const handleToggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <div
      className={`${
        openMenu
          ? "relative md:static"
          : "flex flex-col fixed h-lvh bg-dark  w-full z-20 transition-all ease-linear md:static md:bg-none md:bg-opacity-0 md:h-auto"
      } container fixed mx-auto `}
    >
      <div
        className={`${
          openMenu
            ? "relative flex justify-between items-center m-4 border-2  border-dark border-opacity-20 rounded-full px-6 py-4"
            : " flex justify-between items-center py-4 m-4 md:2xl:mx-auto md:border-2  md:border-dark md:border-opacity-20 md:rounded-full md:px-6 md:w-full"
        }`}
      >
        <Link to="/" className="w-32" onClick={scrollToTop}>
          {openMenu ? (
            <img src="/logo/logo.svg" className="h-full w-full" alt="" />
          ) : (
            <img src="/logo/mobileLogo.svg" className="w-full " alt="" />
          )}
        </Link>
        <div className="">
          <ul className="hidden md:flex md:justify-center md:gap-[24px] md:items-center md:font-semibold md:text-dark md:text-opacity-70 uppercase list-none">
            <NavLink
              className={({ isActive }) =>
                `hover:text-primaryRed transition-all duration-150 ease-in-out ${
                  isActive ? "text-primaryRed" : ""
                }`
              }
              to="/"
              onClick={scrollToTop}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `hover:text-primaryRed transition-all duration-150 ease-in-out ${
                  isActive ? "text-primaryRed" : ""
                }`
              }
              to="/recipes"
              onClick={scrollToTop}
            >
              Recipes
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `hover:text-primaryRed transition-all duration-150 ease-in-out ${
                  isActive ? "text-primaryRed" : ""
                }`
              }
              to="/aboutus"
              onClick={scrollToTop}
            >
              About us
            </NavLink>
          </ul>
        </div>

        <div className="flex  gap-4">
          <div className=" md:relative md:flex md:gap-[16px] justify-center items-center">
            <div className="  md:flex w-full justify-center items-center">
              {searchOpen && (
                <form
                  className={`lg:absolute flex items-center absolute left-0  top-0 w-[200px] md:w-auto  md:-left-[240px] transition-all ease-in duration-200 ${
                    searchOpen ? "w-auto" : "w-0"
                  } ${openMenu ? "h-full" : "h-20 w-16 md:h-0 md:w-0"}`}
                  onSubmit={handleSearch}
                >
                  <input
                    type="search"
                    className="px-4 border border-dark border-opacity-25 rounded-full md:rounded-sm bg-light focus:none h-full md:h-auto w-full md:w-auto"
                    value={searchInput}
                    placeholder="search recipe"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </form>
              )}
              <div
                onClick={handleToggleSearch}
                className="cursor-pointer md:bg-dark md:bg-opacity-10 p-2 h-10 w-10 flex items-center justify-center rounded-full"
              >
                {searchOpen ? (
                  <i
                    className={`fa-solid fa-xmark md:bg-transparent md:bg-dark md:bg-opacity-0 ${
                      !openMenu ? "text-light" : ""
                    }`}
                  ></i>
                ) : (
                  <i
                    className={`fa-solid fa-magnifying-glass md:bg-transparent md:bg-dark md:bg-opacity-0 ${
                      !openMenu ? "text-light" : ""
                    }`}
                  ></i>
                )}
              </div>
            </div>

            <div className="relative hidden  md:flex">
              {currentUser ? (
                <div className="flex gap-4 items-center px-4 py-2 border rounded-full border-dark border-opacity-20 cursor-pointer">
                  <i className="fa-solid fa-user"></i>
                  <span className="relative font-medium text-dark text-opacity-70 capitalize">
                    {currentUser.data.user.username}
                  </span>

                  <i
                    className="fa-solid fa-chevron-down text-dark text-opacity-80 hover:text-primaryRed "
                    onClick={handleSubmenu}
                  ></i>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-primaryRed text-light px-6 py-3 rounded-full uppercase w-28"
                  onClick={scrollToTop}
                >
                  sign in
                </Link>
              )}
              {openSubmenu && (
                <ul
                  className={`flex flex-col bg-background  rounded-xl absolute border border-dark border-opacity-20 w-full left-0 z-30 p-2 list-none text-sm ${
                    currentUser?.data?.user?.role === "admin"
                      ? "-bottom-[196px]"
                      : "-bottom-[124px] "
                  }`}
                >
                  <Link
                    to="/profile"
                    className="py-2 border-b border-dark border-opacity-30 hover:text-primaryRed"
                    onClick={scrollToTop}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/savedrecipes"
                    className="py-2 border-b border-dark border-opacity-30 hover:text-primaryRed"
                    onClick={scrollToTop}
                  >
                    Saved Recipes
                  </Link>
                  {currentUser?.data?.user?.role === "admin" && (
                    <>
                      <Link
                        to="/dashboard/admin/createrecipe"
                        className="py-2 border-b border-dark border-opacity-30 hover:text-primaryRed"
                        onClick={scrollToTop}
                      >
                        Create Recipe
                      </Link>
                      <Link
                        to="/dashboard/admin/managerecipe"
                        className="py-2 border-b border-dark border-opacity-30 hover:text-primaryRed"
                        onClick={scrollToTop}
                      >
                        Manage Recipes
                      </Link>
                    </>
                  )}

                  <li
                    onClick={handleLogout}
                    className="py-1 cursor-pointer hover:text-primaryRed"
                  >
                    Logout
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div
            className={`${
              openMenu ? "bg-dark bg-opacity-10" : "bg-light bg-opacity-20"
            }p-2 h-10 w-10 flex items-center justify-center rounded-full bg-dark bg-opacity-10 md:hidden`}
            onClick={handleToggleMenu}
          >
            {openMenu ? (
              <i className="fa-solid fa-bars"></i>
            ) : (
              <i className="fa-solid fa-xmark text-primaryOrange text-[16px]"></i>
            )}
          </div>
        </div>
      </div>
      {!openMenu && (
        <div className="flex flex-col px-4">
          <ul className="flex flex-col pl-0 md:hidden md:justify-center md:gap-[24px] md:items-center md:font-semibold text-light md:text-opacity-70 uppercase mt-10">
            <Link
              to="/"
              className="px-2 py-4 border-b border-light border-opacity-40 font-semibold"
              onClick={scrollToTop}
            >
              Home
            </Link>
            <Link
              to="/recipes"
              className="px-2 py-4 border-b border-light border-opacity-40 font-semibold"
              onClick={scrollToTop}
            >
              Recipes
            </Link>

            <Link
              to="/aboutus"
              className="px-2 py-4 border-b border-light border-opacity-40  font-semibold"
              onClick={scrollToTop}
            >
              About us
            </Link>
          </ul>
          <div className="flex flex-col pl-0 md:hidden md:justify-center  text-light md:text-opacity-70 uppercase ">
            {currentUser ? (
              <div className="flex flex-col  md:hidden gap-[10px] ">
                <div
                  onClick={handleUserOpen}
                  className="flex px-2 justify-between items-center text-light uppercase font-bold text-base border-light border-b border-opacity-30"
                >
                  <span className=" py-4  w-full  hover:text-primaryRed">
                    {currentUser.data.user.username}
                  </span>
                  <i
                    className={`fa-solid fa-caret-right ${
                      openUser && "rotate-90"
                    }`}
                  ></i>
                </div>
                <ul
                  className={`${
                    openUser ? "flex " : "hidden"
                  } flex-col px-4 text-light uppercase font-bold border border-dark border-opacity-20 w-full left-0 z-30  list-none text-base`}
                >
                  <Link
                    to="/profile"
                    className="py-4 px-2 border-b border-light border-opacity-30 hover:text-primaryRed"
                    onClick={scrollToTop}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/savedrecipes"
                    className="py-4 px-2 border-b border-light border-opacity-30 hover:text-primaryRed"
                    onClick={scrollToTop}
                  >
                    Saved Recipes
                  </Link>
                  {currentUser?.data?.user?.role === "admin" && (
                    <>
                      <Link
                        to="/dashboard/admin/createrecipe"
                        className="py-4 px-2 border-b border-light border-opacity-30 hover:text-primaryRed"
                        onClick={scrollToTop}
                      >
                        Create Recipe
                      </Link>
                      <Link
                        to="/dashboard/admin/managerecipe"
                        className="py-4 px-2 border-b border-light border-opacity-30 hover:text-primaryRed"
                        onClick={scrollToTop}
                      >
                        Manage Recipes
                      </Link>
                    </>
                  )}

                  <li
                    onClick={handleLogout}
                    className="py-4 px-2 cursor-pointer hover:text-primaryRed"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-2 py-4 border-b border-light border-opacity-40  font-semibold w-full"
                onClick={scrollToTop}
              >
                sign in
              </Link>
            )}
          </div>
          <div className="flex md:hidden justify-center items-center gap-4 w-full mt-10">
            <i className="fa-brands fa-tiktok  text-[24px] text-light"></i>
            <i className="fa-brands fa-facebook  text-[24px] text-light"></i>
            <i className="fa-brands fa-instagram  text-[24px] text-light"></i>
            <i className="fa-brands fa-youtube  text-[24px] text-light"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
