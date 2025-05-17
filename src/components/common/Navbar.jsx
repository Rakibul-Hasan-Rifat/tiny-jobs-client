import React from "react";
import { TbCoinTaka } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import useDetails from "../../hooks/useDetails";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { role, coin } = useDetails() || {};
  console.log(user);

  const handleLogout = () => {
    console.log("logout", logout);
    logout()
      .then(() => {
        console.log("Logout successful");
        toast.success("Logout successful", {
          position: "top center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        console.error("Logout error:", err.message);
      });
  };

  return (
    <>
      <Toaster />
      <nav className="flex justify-between items-center sticky top-0 z-10 bg-white px-10 py-4 shadow-md">
        <Link to={"/"}>
          <img
            src={logo}
            className="w-24 px-4 bg-amber-200/30 hover:bg-amber-200/50 rounded-xl"
            alt=""
          />
        </Link>
        <ul className="flex items-center justify-between gap-4 font-semibold text-gray-700">
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
                  to={`/dashboard/${role}`}
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
              <li>
                <div
                  style={{
                    boxShadow: "inset 2px 2px 6px 1px rgba(0, 0, 0, 0.1)",
                  }}
                  className="flex items-center gap-2 shadow hover:text-amber-500/60 px-4 py-2 rounded font-semibold cursor-pointer"
                >
                  <span>{coin}</span> <TbCoinTaka />
                </div>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="font-semibold bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 px-4 py-2 rounded cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
        <div className="flex items-center gap-2">
          {user && (
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user?.photoURL}
              alt=""
            />
          )}
          <button className="bg-yellow-400/60 hover:bg-yellow-400/80 font-semibold text-cyan-900 cursor-pointer px-3 py-2 rounded">
            Join as a Developer
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
