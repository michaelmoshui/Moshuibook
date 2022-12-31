import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/login";

export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state })); // get all the state from store (which is only the user) and return it to the variable "user"
  return user ? <Outlet /> : <Login />; // does user exist? <Outlet /> covers all the routes inside the <LoggedInRoutes />, specifically "home" and "profile"
}
