import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import SideBar from "../Layout/SideBar/SideBar";
import AddPodcast from "../Pages/AddPodcast/AddPodcast";
import ComingSoon from "../Pages/ComingSoon/ComingSoon";
import Episode from "../Pages/Episode/Episode";
import Profile from "../Pages/Profile/Profile";

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
      {
        path: "/profile",
        element: (
          <SideBar>
            <Profile />
          </SideBar>
        ),
      },
      {
        path: "podcast/:projectId",
        element: <SideBar />,
        errorElement: <SideBar />,
        children: [
          {
            path: "create",
            element: <ComingSoon />,
          },
          {
            path: "widget",
            element: <ComingSoon />,
          },
          {
            path: "upgrade",
            element: <ComingSoon />,
          },
          {
            path: "help",
            element: <ComingSoon />,
          },
          {
            path: "add-podcast",
            element: <AddPodcast />,
          },
          {
            path: "episode/:episodeId",
            element: <Episode />,
          },
        ],
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
