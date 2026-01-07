import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import Homepage from "../pages/Home";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import ListingForm from "../pages/ListingForm";
import PetsSupply from "../pages/Pets&Supply";
import ListingDetails from "../pages/ListingDetails";
import ErrorPage from "../pages/ErrorPage";
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct";
import API_BASE_URL from "../config/apiBaseUrl";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../components/Layout/DashboardLayout";
import DashboardHome from "../pages/dashboard/Home";
import DashboardProfile from "../pages/dashboard/Profile";
import DashboardList from "../pages/dashboard/List";
import DashboardOrders from "../pages/dashboard/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
        loader: () =>
          fetch(`${API_BASE_URL}/listings`)
            .then((res) => res.json())
            .then((data) => {
              return data;
            }),
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <ListingForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/pets-supply",
        element: <PetsSupply />,
        loader: () =>
          fetch(`${API_BASE_URL}/listings`)
            .then((res) => res.json())
            .then((data) => {
              return data;
            }),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { path: "", element: <DashboardHome /> },
          { path: "profile", element: <DashboardProfile /> },
          { path: "listings", element: <DashboardList /> },
          { path: "orders", element: <DashboardOrders /> },
        ],
      },
      {
        path: "/listing-details/:id",
        element: <ListingDetails />,
      },
      {
        path: "/explore",
        element: <CategoryFilteredProduct />,
        loader: () =>
          fetch(`${API_BASE_URL}/listings`)
            .then((res) => res.json())
            .then((data) => data),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default router;
