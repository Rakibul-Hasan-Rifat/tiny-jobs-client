import React from "react";
import { FaHistory, FaTasks } from "react-icons/fa";
import { HiOutlineDocumentCurrencyBangladeshi } from "react-icons/hi2";
import { MdAddTask } from "react-icons/md";
import { NavLink } from "react-router";

const BuyerNav = () => {
  return (
    <>
      <li className="w-full">
        <NavLink
          to={"/dashboard/add-task"}
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
          to={"/dashboard/my-tasks"}
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
          to={"/dashboard/buy-coin"}
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
      <li className="w-full">
        <NavLink
          to={"/dashboard/payment-history"}
          className={({ isActive }) =>
            `flex items-center w-full px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
              isActive
                ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                : ""
            }`
          }
        >
          <FaHistory />
          <span className="ml-2">Pay History</span>
        </NavLink>
      </li>
    </>
  );
};

export default BuyerNav;
