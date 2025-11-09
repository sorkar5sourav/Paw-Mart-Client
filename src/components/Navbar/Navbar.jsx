import MyLink from "../../styles/MyLink";
import { AuthContext } from "../../context/AuthContext";
import { RingLoader } from "react-spinners";
import { Link, NavLink } from "react-router";
import MyContainer from "../MyContainer";
// import ThemeToggle from "../ThemeToggle/ThemeToggle";

import { toast } from "react-hot-toast";
import { useContext } from "react";
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
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <MyLink to={"/"}>Home</MyLink>
              </li>
              <li>
                <MyLink to={"/profile"}>Profile</MyLink>
              </li>
            </ul>
          </div>
          <NavLink to="/">
            <div className="flex items-center text-xl font-bold text-blue-600">
              <img
                src="https://i.ibb.co/39pZGd84/Gemini-Generated-Image-xhlddwxhlddwxhld.png"
                className="h-10 mr-2 w-10"
              />
              PET CARE
            </div>
          </NavLink>
          {/* <input
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
          /> */}
        </div>
        <div className="navbar-center menu menu-horizontal gap-10 hidden lg:flex">
          <MyLink to={"/"}>Home</MyLink>

          <MyLink to={"/profile"} className={"text-black"}>
            Profile
          </MyLink>
        </div>
        <div className="navbar-end">
          {loading ? (
            <RingLoader color="#e74c3c" />
          ) : user ? (
            <div className="dropdown dropdown-hover dropdown-end">
              <div tabIndex={0} role="button" className="">
                <img
                  className="h-10 rounded-full hover:scale-110 transition-transform duration-200 mx-auto"
                  src={user.photoURL}
                  alt={user.displayName}
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
                <li>
                  <div onClick={handleSignout} className="my-btn w-full">
                    Sign Out
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <button className="my-btn">
              <Link className="hover:underline" to={"/register"}>
                Register
              </Link>
              /
              <Link className="hover:underline" to={"/login"}>
                Log In
              </Link>
            </button>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;

//
//
