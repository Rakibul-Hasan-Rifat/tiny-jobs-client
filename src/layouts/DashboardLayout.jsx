import { Outlet } from "react-router";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <section className="w-[20%]">
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default DashboardLayout;
