import { FaTasks } from "react-icons/fa"
import { MdAddTask, MdManageAccounts } from "react-icons/md"
import { NavLink } from "react-router"

const AdminNav = () => {
  return (
    <>
    <li className="w-full">
            <NavLink
              to={"/dashboard/manage-users"}
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                  isActive
                    ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                    : ""
                }`
              }
            >
              <MdManageAccounts />
              <span className="ml-2">Manage Users</span>
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"/dashboard/manage-tasks"}
              className={({ isActive }) =>
                `flex items-center w-full px-4 py-2 font-semibold rounded-md hover:bg-amber-200/40 hover:text-gray-600 ${
                  isActive
                    ? "bg-yellow-400/60 hover:bg-yellow-400/80 text-cyan-900 hover:text-cyan-950"
                    : ""
                }`
              }
            >
              <FaTasks />
              <span className="ml-2">Manage Tasks</span>
            </NavLink>
          </li>
    </>
  )
}

export default AdminNav