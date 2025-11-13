import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
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
    <div className="flex flex-1 justify-center items-center px-10 relative">
      <Link
        to={"/"}
        className="text-xl md:text-3xl absolute top-4 right-4 text-red-700"
      >
        X
      </Link>
      <div className="card bg-[#357fa7] my-25 text-white w-full max-w-lg shrink-0 shadow-2xl">
        <h2 className="text-3xl font-bold text-center my-4 md:my-8">
          LogIn Your Account
        </h2>

        <div className="card-body pt-0">
          <div className="border border-gray-200 w-full mb-5"></div>
          <form onSubmit={handleSignin}>
            <fieldset className="fieldset">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm mb-1">Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input font-semibold input-bordered w-full bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={() => setShow(!show)}
                  className="absolute right-2 top-9 text-lg cursor-pointer z-50 text-white bg-transparent border-none"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </button>
              </div>

              <div className="mt-3">
                <Link
                  state={{ email: email }}
                  to={"/forgot-password"}
                  className="link  link-hover text-amber-500"
                >
                  Forgot Password?
                </Link>
                <Link
                  to={"/signup"}
                  className="link link-hover text-green-500 float-right"
                >
                  New? 👉Sign Up
                </Link>
              </div>
              <button
                type="submit"
                className="btn btn-outline btn-success mt-4"
              >
                Login
              </button>
              <button
                onClick={handleGoogleSignin}
                type="button"
                className="flex items-center justify-center gap-3 bg-white text-gray-800 mt-4 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

// onClick={handleGoogleSignin}
// onClick={handleGithubSignin}
