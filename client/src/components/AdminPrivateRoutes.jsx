import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoutes() {
  const { currentUser } = useSelector((state) => state.user);
  const userRole = localStorage.getItem("userRole");   
  return (userRole === "admin" || (currentUser && currentUser.isAdmin)) ? <Outlet /> : <Navigate to={"/signin"} />;
}

export default AdminPrivateRoutes;
