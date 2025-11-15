import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import MyContainer from "../components/MyContainer";
// import { Navigate } from "react-router";

const LogIn = () => {
  const [show, setShow] = useState(false);
  const emailRef = useRef(null);
  const [email, setEmail] = useState(null);

  const {
    signInWithEmailAndPasswordFunc,
    signInWithEmailFunc,
    setLoading,
    setUser,
  } = useContext(AuthContext);

  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();

  // console.log(location);

  const handleSignin = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email?.value;
    const password = form.password?.value;
    // console.log({ email, password });
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        // console.log(res);
        setLoading(false);

        if (!res.user?.emailVerified) {
          toast.error("Your email is not verified.");
          return;
        }
        setUser(res.user);
        toast.success("Signin successful");
        navigate(from);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleGoogleSignin = () => {
    // console.log("google signin");
    signInWithEmailFunc()
      .then((res) => {
        // console.log(res);
        setLoading(false);
        setUser(res.user);
        navigate(from);
        toast.success("Signin successful");
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
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
        LogIn Your Account
      </h3>
      <div className="card bg-base-100 text-base-content w-full max-w-lg shadow-2xl p-10 transition-colors duration-300">
        <form onSubmit={handleSignin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
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
            <Link
              state={{ email: email }}
              to={"/forgot-password"}
              className="link link-hover text-[#357fa7]"
            >
              Forgot Password?
            </Link>
            <Link
              to={"/register"}
              className="link link-hover text-[#357fa7]"
            >
              New? 👉Sign Up
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>

          <button
            onClick={handleGoogleSignin}
            type="button"
            className="btn btn-outline w-full flex items-center justify-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </form>
      </div>
    </MyContainer>
  );
};

export default LogIn;

// onClick={handleGoogleSignin}
// onClick={handleGithubSignin}
