import React from "react";
import { Link, NavLink } from "react-router";
import logo from "./../../assets/logo.png";
import useDetails from "../../hooks/useDetails";
import { FaHome } from "react-icons/fa";
import WorkerNav from "./Worker/WorkerNav";
import BuyerNav from "./Buyer/BuyerNav";
import AdminNav from "./Admin/AdminNav";

const Sidebar = () => {
  const { role } = useDetails() || {};
  return (
    <aside className="h-[100vh] w-[20vw] flex flex-col  bg-white px-8 py-4 shadow-md">
      <Link to={"/"}>
        <div>
          <img
            src={logo}
            className="w-full px-4 bg-amber-200/30 hover:bg-amber-200/50 rounded-xl"
            alt=""
          />
        </div>
      </Link>
      {/* divider */}
      <div className="w-full h-[1px] bg-gray-300 my-6"></div>
      <ul className="my-2 flex flex-col items-center justify-between gap-3 font-semibold text-gray-700">
        <li className="w-full">
          <NavLink
            to={`/dashboard/${role}`}
            className={({ isActive }) =>
              `flex items-center w-full px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                isActive
                  ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                  : ""
              }`
            }
          >
            <FaHome />
            <span className="ml-2">Home</span>
          </NavLink>
        </li>
        {role === "worker" && <WorkerNav />}
        {role === "buyer" && <BuyerNav />}
        {role === "admin" && <AdminNav />}
      </ul>
    </aside>
  );
};

export default Sidebar;
