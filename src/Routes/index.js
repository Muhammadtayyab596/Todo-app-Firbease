import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "../Pages/Login/index";
import Signup from "../Pages/Register/index";
import Todo from '../Pages/Todo/index'
import GuestGuard from "./GuestGuard";
import AuthGuard from "./AuthGuard";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "signup",
          element: (
            <GuestGuard>
              <Signup />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "dashboard",
      children: [
        {
          path: "todo/all",
          element: (
            <AuthGuard>
              <Todo />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <AuthGuard>
          <Navigate to="todo/all" replace />
        </AuthGuard>
      ),
    },
  ]);

  return routes;
};

export default Router;