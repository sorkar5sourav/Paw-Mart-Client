import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import MyContainer from "../components/MyContainer";

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
    <MyContainer className="flex-1 flex-col justify-center items-center flex min-h-screen py-8 px-4 relative">
      <Link
        to={"/"}
        className="text-xl md:text-3xl absolute top-4 right-4 text-red-700 z-10"
      >
        X
      </Link>
      <h3 className="font-bold text-4xl mb-4 text-primary">
        Sign Up Now
      </h3>
      <div className="card bg-base-100 text-base-content w-full max-w-lg shadow-2xl p-10 transition-colors duration-300">
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="Your photo URL here (optional)"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              required
              className="input input-bordered w-full pr-10"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-2 top-9 text-lg cursor-pointer z-50 text-base-content/60 hover:text-base-content bg-transparent border-none"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-base-content/70">Already have an account?</span>
            <Link
              to={"/login"}
              state={{ from: from }}
              className="link link-hover text-[#357fa7]"
            >
              👉 Log In
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Sign Up
          </button>
        </form>
      </div>
    </MyContainer>
  );
};
export default Register;
