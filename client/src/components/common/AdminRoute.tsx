import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Role } from "../../types/role";
import AdminSidebar from "../admin/Layout/AdminSidebar";
const AdminRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user?.roles.includes(Role.ADMIN) ? (
    <div className="flex flex-row h-screen w-screen space-x-3">
      <AdminSidebar />
      <div className="w-full h-full overflow-scroll">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
