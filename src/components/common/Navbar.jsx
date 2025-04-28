import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.png";
import { TbCoinTaka } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();
  const provider = useAuth();
  console.log(provider);
  return (
    <nav className="flex justify-between items-center bg-white p-4 shadow-md">
      <Link to={"/"}>
        <img
          src={logo}
          className="w-24 px-4 bg-amber-200/30 hover:bg-amber-200/50 rounded-xl"
          alt=""
        />
      </Link>
      <ul className="flex space-x-4">
        <li className="px-4 py-2 hover:bg-amber-200/40 hover:text-gray-600 font-semibold rounded-md">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        {!user && (
          <>
            <li className="px-4 py-2 hover:bg-amber-200/40 hover:text-gray-600 font-semibold rounded-md">
              <NavLink to={"/login"}>Login</NavLink>
            </li>
            <li className="px-4 py-2 hover:bg-amber-200/40 hover:text-gray-600 font-semibold rounded-md">
              <NavLink to={"/register"}>Register</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li className="px-4 py-2 hover:bg-amber-200/40 hover:text-gray-600 font-semibold rounded-md">
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </li>
            <li className="px-4 py-2 hover:bg-amber-200/40 hover:text-gray-600 font-semibold rounded-md">
              <NavLink to={"/profile"}>Profile</NavLink>
            </li>
            <li className="px-4 py-2 hover:text-yellow-600 font-semibold rounded-md shadow-inner shadow-gray-300/50">
              <div className="flex items-center gap-2">
                <span>{120}</span> <TbCoinTaka />
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-amber-200/40 hover:text-gray-600 font-semibold rounded-md">
              <button className="cursor-pointer">Logout</button>
            </li>
          </>
        )}
      </ul>
      <button className="bg-yellow-400/60 hover:bg-yellow-400/80 font-semibold text-cyan-900 cursor-pointer px-3 py-2 rounded">
        Join as a Developer
      </button>
    </nav>
  );
};

export default Navbar;
