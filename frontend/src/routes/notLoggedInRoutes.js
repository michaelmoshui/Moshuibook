import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../pages/login";

export default function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state })); // get all the state from store (which is only the user) and return it to the variable "user"
  return user ? <Navigate to="/" /> : <Outlet />; // does user exist? if so go directly to home page! else go to whatever the route div covers (which is login)
}
