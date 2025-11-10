import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import Homepage from "../pages/Home";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
import ListingForm from "../pages/ListingForm";
import PetsSupply from "../pages/Pets&Supply";
import ListingDetails from "../pages/ListingDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path:"/login",
        element: <LogIn />,
      },
      {
        path:"/register",
        element: <Register />,
      },
      {
        path:"/listing",
        element: <ListingForm />,
      },
      {
        path:"/pets-supply",
        element: <PetsSupply />,
      },
      {
        path:"/listing-details/:id",
        element: <ListingDetails />,
      },
    ],
  },
]);

export default router;
