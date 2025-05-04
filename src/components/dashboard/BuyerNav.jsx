import React from "react";
import { FaTasks } from "react-icons/fa";
import { HiOutlineDocumentCurrencyBangladeshi } from "react-icons/hi2";
import { MdAddTask } from "react-icons/md";
import { NavLink } from "react-router";

const BuyerNav = () => {
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
          <MdAddTask />
          <span className="ml-2">Add New Task</span>
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
          <FaTasks />
          <span className="ml-2">My Tasks</span>
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
          <HiOutlineDocumentCurrencyBangladeshi />
          <span className="ml-2">Purchase Coin</span>
        </NavLink>
      </li>
    </>
  );
};

export default BuyerNav;
