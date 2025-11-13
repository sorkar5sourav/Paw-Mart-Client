import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import Homepage from "../pages/Home";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
import ListingForm from "../pages/ListingForm";
import PetsSupply from "../pages/Pets&Supply";
import ListingDetails from "../pages/ListingDetails";
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import ErrorPage from "../pages/ErrorPage";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://paw-mart-server-side.vercel.app";

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
              console.log(data);
              return data;
            }),
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/listing",
        element: <ListingForm />,
      },
      {
        path: "/pets-supply",
        element: <PetsSupply />,
        loader: () =>
          fetch(`${API_BASE_URL}/listings`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              return data;
            }),
      },
      {
        path: "/my-listings",
        element: <MyListings />,
      },
      {
        path: "/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/listing-details/:id",
        element: <ListingDetails />,
      },
      {
        path: "/category-filtered-product/:categoryName",
        element: <CategoryFilteredProduct />,
        loader: () =>
          fetch(`${API_BASE_URL}/listings`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              return data;
            }),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default router;
