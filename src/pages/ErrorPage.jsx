import { Link } from "react-router";
const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex grow flex-col justify-center items-center gap-6 p-4 lg:p-20">
          <img
            src="https://i.ibb.co.com/0p7N5vsY/App-Error.png"
            alt="Error 404"
          />
          <h1 className="text-5xl font-bold text-center">
            Oops, page not found!
          </h1>
          <p className="text-[#627382]">
            The page you are looking for is not available.
          </p>
          <Link
            to="/"
            className="btn btn-outline btn-error py-3 px-8 hover:scale-105 transition ease-in-out rounded-lg"
          >
            Go Back!
          </Link>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
