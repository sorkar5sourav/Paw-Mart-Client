import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";
import Homepage from "../pages/Home";
import LogIn from "../pages/Login";
import Register from "../pages/Register";
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
    ],
  },
]);

export default router;
