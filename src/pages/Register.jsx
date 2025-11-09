import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Register = () => {
  const [show, setShow] = useState(false);
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    setLoading,
    setUser,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const handleRegister = (e) => {
    e.preventDefault();
    const displayName = e.target.name?.value;
    const photoURL = e.target.photoURL?.value;
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    console.log("signup function entered", {
      email,
      displayName,
      photoURL,
      password,
    });

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{8,}$/;

    // console.log(regExp.test(password));

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        updateProfileFunc(displayName, photoURL)
          .then(() => {
            console.log(res);
            setLoading(false);
            setUser(res.user);
            toast.success("Signup successful");
            navigate(from);
          })
          .catch((e) => {
            console.log(e);
            toast.error(e.message);
          });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.code);
        if (e.code === "auth/email-already-in-use") {
          toast.error(
            "User already exists in the database. Etai bastob haahahahaha"
          );
        } else if (e.code === "auth/weak-password") {
          toast.error("Bhai tomake at least 6 ta digit er pass dite hobe");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };
  return (
    <form
      onSubmit={handleRegister}
      className="flex justify-center relative items-center p-4 flex-1"
    >
      <Link
        to={"/"}
        className="text-xl md:text-3xl absolute top-4 right-4 text-red-700"
      >
        X
      </Link>
      <div className="card bg-[#357fa7] w-full my-25 text-white max-w-lg shrink-0 shadow-2xl">
        <h2 className="text-3xl font-bold text-center my-4 md:my-8">
          Sign Up Now
        </h2>
        <div className="card-body pt-0">
          <div className="border border-gray-200 w-full mb-2"></div>
          <fieldset className="fieldset">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo</label>
              <input
                type="text"
                name="photoURL"
                placeholder="Your photo URL here"
                className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {/* <span
                onClick={() => setShow(!show)}
                className="absolute text-lg right-2 top-9 cursor-pointer z-50"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span> */}
            </div>
            <div>
              <a className="link link-hover text-amber-500">
                Already have an account?
              </a>
              <Link
                to={"/auth/login"}
                state={{ from: from }}
                className="link link-hover text-green-500 float-right"
              >
                👉 Log In
              </Link>
            </div>
            <button type="submit" className="btn btn-outline btn-accent mt-4">
              Sign Up
            </button>
          </fieldset>
        </div>
      </div>
    </form>
  );
};
export default Register;
