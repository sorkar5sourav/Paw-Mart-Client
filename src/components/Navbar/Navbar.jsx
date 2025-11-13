import MyLink from "../../styles/MyLink";
import { AuthContext } from "../../context/AuthContext";
import { RingLoader } from "react-spinners";
import { Link, NavLink } from "react-router";
import MyContainer from "../MyContainer";
// import ThemeToggle from "../ThemeToggle/ThemeToggle";

import { toast } from "react-hot-toast";
import { useContext } from "react";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const { user, signoutUserFunc, setUser, loading } = useContext(AuthContext);

  // console.log(user);
  const handleSignout = () => {
    signoutUserFunc()
      .then(() => {
        toast.success("Signout successful");
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="bg-[#f5f6f8] shadow-sm w-full ">
      <MyContainer className=" navbar p-4">
        <div className="navbar-start">
          <div className="dropdown dropdown-hover dropdown-start">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow"
            >
              <li>
                <MyLink to={"/"}>Home</MyLink>
              </li>
              <li>
                <MyLink to={"/pets-supply"}>Pets & Supplies</MyLink>
              </li>
              {user && (
                <>
                  <li>
                    <MyLink to={"/listing"}>Add Listing</MyLink>
                  </li>
                  <li>
                    <MyLink to={"/my-listings"}>My Listings</MyLink>
                  </li>
                  <li>
                    <MyLink to={"/my-orders"}>My Orders</MyLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <NavLink to="/">
            <div className="flex items-center text-xl font-bold text-emerald-600">
              <img
                src="https://i.ibb.co.com/KjQ1LCtV/Gemini-Generated-Image-qf5rsjqf5rsjqf5r.png"
                className="h-10 mr-2 w-10 rounded-full"
              />
              PAW MART
            </div>
          </NavLink>
        </div>
        <div className="navbar-center menu menu-horizontal gap-10 hidden lg:flex">
          <MyLink to={"/"} className={"text-black"}>
            Home
          </MyLink>
          <MyLink to={"/pets-supply"} className={"text-black"}>
            Pets & Supplies
          </MyLink>
          {user && (
            <>
              <MyLink to={"/listing"} className={"text-black"}>
                Add Listing
              </MyLink>
              <MyLink to={"/my-listings"} className={"text-black"}>
                My Listings
              </MyLink>
              <MyLink to={"/my-orders"} className={"text-black"}>
                My Orders
              </MyLink>
            </>
          )}
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {loading ? (
            <RingLoader color="#e74c3c" />
          ) : user ? (
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-hover dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <img
                    className="h-10 rounded-full hover:scale-110 transition-transform duration-200"
                    src={user?.photoURL}
                  />
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
                >
                  <li>
                    <h2 className="btn bg-white border-none h-10 text-lg">
                      {user?.displayName}
                    </h2>
                  </li>
                </ul>
              </div>
              <button onClick={handleSignout} className="my-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={"/login"} className="my-btn">
                Login
              </Link>
              <Link to={"/register"} className="my-btn">
                Register
              </Link>
            </div>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;

//
//
