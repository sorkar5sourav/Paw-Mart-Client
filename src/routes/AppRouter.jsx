import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import Homepage from "../pages/Home";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
import ListingForm from "../pages/ListingForm";
import PetsSupply from "../pages/Pets&Supply";
import ListingDetails from "../pages/ListingDetails";
import MyListings from "../pages/MyListings";
import MyOrders from "../pages/MyOrders";
import ErrorPage from "../pages/ErrorPage";
import API_BASE_URL from "../config/apiBaseUrl";
import PrivateRoute from "./PrivateRoute";

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
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/listing-details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default router;
