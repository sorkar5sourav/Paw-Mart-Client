import { createBrowserRouter } from "react-router";
import MainLayout from "../components/Layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: (
          <div className="text-4xl flex grow justify-center items-center">
            Hello World. <br /> Whats Up
          </div>
        ),
      },
    ],
  },
]);

export default router;
