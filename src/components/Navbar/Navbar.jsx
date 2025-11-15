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
    <div className="bg-base-200 shadow-sm w-full transition-colors duration-300">
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
                    <MyLink to={"/add-listing"}>Add Listing</MyLink>
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
            <div className="flex items-center text-xl font-bold text-primary">
              <img
                src="https://i.ibb.co.com/KjQ1LCtV/Gemini-Generated-Image-qf5rsjqf5rsjqf5r.png"
                className="h-10 mr-2 w-10 rounded-full"
              />
              PAW MART
            </div>
          </NavLink>
        </div>
        <div className="navbar-center menu menu-horizontal gap-10 hidden lg:flex">
          <MyLink to={"/"} className={"text-base-content"}>
            Home
          </MyLink>
          <MyLink to={"/pets-supply"} className={"text-base-content"}>
            Pets & Supplies
          </MyLink>
          {user && (
            <>
              <MyLink to={"/add-listing"} className={"text-base-content"}>
                Add Listing
              </MyLink>
              <MyLink to={"/my-listings"} className={"text-base-content"}>
                My Listings
              </MyLink>
              <MyLink to={"/my-orders"} className={"text-base-content"}>
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
              <div className="dropdown dropdown-hover dropdown-center">
                <div tabIndex={0} role="button" className="relative">
                  {user?.photoURL ? (
                    <img
                      className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200 object-cover"
                      src={user.photoURL}
                      alt={user?.displayName || user?.email || "User"}
                      onError={(e) => {
                        // Hide image on error and show fallback
                        e.target.style.display = "none";
                        const fallback = e.target.nextElementSibling;
                        if (fallback) {
                          fallback.classList.remove("hidden");
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className={`rounded-full bg-[#357fa7] text-white font-bold flex items-center justify-center h-10 w-10 hover:scale-110 transition-transform duration-200 ${
                      user?.photoURL ? "hidden absolute top-0 left-0" : ""
                    }`}
                    style={{ fontSize: "16px" }}
                  >
                    {(user?.displayName || user?.email || "?")[0].toUpperCase()}
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow-sm"
                >
                  <li>
                    <h2 className="btn bg-base-100 border-none h-10 text-lg text-base-content">
                      {user?.displayName || user?.email || "User"}
                    </h2>
                  </li>
                </ul>
              </div>
              <button onClick={handleSignout} className="btn btn-outline btn-error py-3 px-8 hover:scale-105 transition ease-in-out rounded-lg">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 btn btn-outline hover:border-primary hover:bg-primary hover:text-primary-content">
              <Link to={"/login"} className="text-base-content">
                Login
              </Link> /
              <Link to={"/register"} className="text-base-content">
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
