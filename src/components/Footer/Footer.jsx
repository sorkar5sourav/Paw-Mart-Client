import React, { useContext } from "react";
import MyContainer from "../MyContainer";
import { NavLink } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import twitterIcon from "../../assets/icons8-x-50.png";
const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-base-300 text-base-content transition-colors duration-300">
      <MyContainer className="p-10 md:px-0 lg:p-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <img
                className="h-12 w-12 rounded-full"
                src="https://i.ibb.co.com/KjQ1LCtV/Gemini-Generated-Image-qf5rsjqf5rsjqf5r.png"
                alt="PawMart logo"
              />
              <div>
                <NavLink to="/" className="text-xl font-bold text-gray-800">
                  PawMart
                </NavLink>
                <p className="text-sm text-gray-600">
                  Connecting pets with loving homes
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              PawMart connects local pet owners and buyers for adoption and pet
              care products.
            </p>

            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} PawMart. All rights reserved.
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 ">
            {" "}
            <nav className="flex flex-col">
              <h6 className="footer-title">Useful Links</h6>
              <NavLink to="/" className="link link-hover">
                Home
              </NavLink>
              <NavLink to="/contact" className="link link-hover">
                Contact
              </NavLink>
              <NavLink to="/terms" className="link link-hover">
                Terms
              </NavLink>
            </nav>
            <nav className="mt-4">
              <h6 className="footer-title">Account</h6>
              <NavLink to={"/login"} className="link link-hover">
                {user ? "Switch Account" : "Log In"}
              </NavLink>
            </nav>
          </div>
          <div>
            <h6 className="footer-title">Contact</h6>
            <p className="text-sm text-gray-600">Got Question? Call us 24/7</p>
            <a
              href="tel:+8801713267313"
              className="block text-gray-800 font-semibold mt-1"
            >
              +8801713267313
            </a>
            <p className="text-gray-600 mt-3">
              3rd Floor, Bashundara R/A Road,
              <br /> Opposite of Jamuna Future Park Pocket Gate.
            </p>

            <div className="grid grid-flow-col gap-4 mt-4">
              <a aria-label="twitter">
                <img src={twitterIcon} alt="twitter" className="w-6 h-6" />
              </a>
              <a aria-label="youtube">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a aria-label="facebook">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Footer;
