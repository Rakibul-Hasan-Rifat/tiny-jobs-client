import React from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa6";
import { NavLink } from "react-router";

const WorkerNav = () => {
  return (
    <>
      <li className="w-full">
        <NavLink
          to={"/task-list"}
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
              isActive
                ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                : ""
            }`
          }
        >
          <FaList />
          <span className="ml-2">Task List</span>
        </NavLink>
      </li>
      <li className="w-full">
        <NavLink
          to={"/submission"}
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
              isActive
                ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                : ""
            }`
          }
        >
          <FaFileExport />
          <span className="ml-2">My Submits</span>
        </NavLink>
      </li>
      <li className="w-full">
        <NavLink
          to={"/withdraw"}
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
              isActive
                ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                : ""
            }`
          }
        >
          <BiMoneyWithdraw />
          <span className="ml-2">Withdraw</span>
        </NavLink>
      </li>
    </>
  );
};

export default WorkerNav;
