import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import Home from "../Pages/Home/Home";

const Login = lazy(() => import("../Pages/Auth/Login"));
const Register = lazy(() => import("../Pages/Auth/Register"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Home />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <Login />,
    element: <Login />,
  },
  {
    path: "/register",
    errorElement: <Login />,
    element: <Register />,
  },
]);

export default router;
