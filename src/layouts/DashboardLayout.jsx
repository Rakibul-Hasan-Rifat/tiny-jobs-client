import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <section className="flex gap-8 w-full h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full h-full bg-gray-100 overflow-y-auto px-3 py-4">
        <Outlet />
      </div>
    </section>
  );
};

export default DashboardLayout;
