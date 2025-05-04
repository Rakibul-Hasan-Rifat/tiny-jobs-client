import React from "react";
import { Link, NavLink } from "react-router";
import logo from "./../../assets/logo.png";
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
    const { user } = useAuth();
  return (
    <aside className="flex flex-col justify-between bg-white px-10 py-4 shadow-md">
      <Link to={"/"}>
        <div>
          <img
            src={logo}
            className="w-full px-4 bg-amber-200/30 hover:bg-amber-200/50 rounded-xl"
            alt=""
          />
        </div>
      </Link>
      <hr />
      <ul className="my-12 flex flex-col items-center justify-between gap-4 font-semibold text-gray-700">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                isActive
                  ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                    isActive
                      ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                      : ""
                  }`
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                    isActive
                      ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                      : ""
                  }`
                }
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink
                to={"/dashboard"}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                    isActive
                      ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                      : ""
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  `px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                    isActive
                      ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                      : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
