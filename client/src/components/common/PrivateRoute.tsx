import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

function PrivateRoute() {
  const { user } = useAppSelector((state) => state.auth);
  
  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;