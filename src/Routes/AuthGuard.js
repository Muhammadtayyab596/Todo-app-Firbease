import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  if (!localStorage.getItem("ACCESSTOKEN")) {
    return <Navigate to="/auth/login" />;
  }

  return <> {children} </>;
}