import MyLink from "../../styles/MyLink";
import { AuthContext } from "../../context/AuthContext";
import { RingLoader } from "react-spinners";
import { Link, NavLink } from "react-router";
import MyContainer from "../MyContainer";
import { toast } from "react-hot-toast";
import { useContext, useState, useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, signoutUserFunc, setUser, loading } = useContext(AuthContext);
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };
    const onClick = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return (
    <div className="sticky top-0 z-50 bg-base-200 shadow-sm w-full transition-colors duration-300">
      <MyContainer className=" navbar p-4">
        <div className="navbar-start">
          <div
            ref={mobileMenuRef}
            className={`dropdown dropdown-start ${
              mobileOpen ? "dropdown-open" : ""
            }`}
          >
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((s) => !s)}
              className="btn btn-ghost lg:hidden"
            >
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
            </button>
            <ul
              id="mobile-menu"
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow"
            >
              <li>
                <MyLink to="/">Home</MyLink>
              </li>
              <li>
                <MyLink to="/pets-supply">Pets & Supplies</MyLink>
              </li>
              <li>
                <MyLink to="/about">About</MyLink>
              </li>
              <li>
                <MyLink to="/blog">Blog</MyLink>
              </li>
              <li>
                <MyLink to="/contact">Contact</MyLink>
              </li>
            </ul>
          </div>
          <NavLink
            to="/"
            className="flex items-center text-xl font-bold"
            aria-label="PawMart home"
          >
            <img
              src="https://i.ibb.co.com/KjQ1LCtV/Gemini-Generated-Image-qf5rsjqf5rsjqf5r.png"
              className="h-10 mr-2 w-10 rounded-full object-cover"
              alt="PawMart"
            />
            <span style={{ color: "var(--color-primary)" }}>PAW MART</span>
          </NavLink>
        </div>
        <div className="navbar-center menu menu-horizontal gap-10 hidden lg:flex">
          <MyLink to="/" className={"text-base-content"}>
            Home
          </MyLink>
          <MyLink to="/pets-supply" className={"text-base-content"}>
            Pets & Supplies
          </MyLink>
          <MyLink to="/about" className={"text-base-content"}>
            About
          </MyLink>
          <MyLink to="/blog" className={"text-base-content"}>
            Blog
          </MyLink>
          <MyLink to="/contact" className={"text-base-content"}>
            Contact
          </MyLink>
        </div>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {loading ? (
            <RingLoader color={"var(--color-primary)"} />
          ) : user ? (
            <div className="flex items-center gap-2">
              <div
                ref={profileMenuRef}
                className={`dropdown dropdown-end ${
                  profileOpen ? "dropdown-open" : ""
                }`}
              >
                <button
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded={profileOpen}
                  aria-label={
                    profileOpen ? "Close profile menu" : "Open profile menu"
                  }
                  onClick={() => setProfileOpen((s) => !s)}
                  className="btn btn-ghost rounded-full p-0"
                >
                  {user?.photoURL ? (
                    <img
                      className="h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200 object-cover"
                      src={user.photoURL}
                      alt={user?.displayName || user?.email || "User"}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {(user?.displayName ||
                        user?.email ||
                        "?")[0].toUpperCase()}
                    </div>
                  )}
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-50 w-56 p-2 shadow-lg"
                  role="menu"
                >
                  <li className="px-2 py-1 text-sm text-muted">
                    {user?.displayName || user?.email}
                  </li>
                  <li>
                    <Link to="/dashboard" className="menu-item">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/profile" className="menu-item">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleSignout}
                      className="w-full text-left"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <MyLink to={"/login"} className="btn btn-sm">
                Login
              </MyLink>
              <MyLink
                to={"/register"}
                className="btn btn-primary text-white btn-sm"
              >
                Sign up
              </MyLink>
            </div>
          )}
        </div>
      </MyContainer>
    </div>
  );
};

export default Navbar;
