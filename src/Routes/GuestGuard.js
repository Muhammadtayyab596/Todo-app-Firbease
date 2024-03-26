import { Navigate } from "react-router-dom";

export default function GuestGuard({ children }) {
  if (localStorage.getItem("ACCESSTOKEN")) {
    return <Navigate to="/dashboard/todo/all" />;
  }

  return <> {children} </>;
}