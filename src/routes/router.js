import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "./../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashBoardPage from "../pages/DashBoardPage";
import AddTask from "../components/dashboard/Buyer/AddTask";
import MyTasks from "../components/dashboard/Buyer/MyTasks";
import BuyCoin from "../components/dashboard/Buyer/BuyCoin";
import TaskList from "../components/dashboard/Worker/TaskList";
import MySubmits from "../components/dashboard/Worker/MySubmits";
import Withdraws from "../components/dashboard/Worker/Withdraws";
import TaskDetails from "../components/dashboard/Worker/TaskDetails";
import ManageUsers from "../components/dashboard/Admin/ManageUsers";
import ManageTasks from "../components/dashboard/Admin/ManageTasks";

let router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      // dashoard routes for all users
      { index: true, path: ":role", Component: DashBoardPage },
      // admin routes
      {
        path: "manage-users",
        Component: ManageUsers,
        loader: async () =>
          await fetch(`${import.meta.env.VITE_SERVER_URL}/users`, {
            method: "GET",
            credentials: "include",
          }),
      },
      {
        path: "manage-tasks",
        Component: ManageTasks,
        loader: async () =>
          await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/tasks`, {
            method: "GET",
            credentials: "include",
          }),
      },
      // buyer routes
      { path: "add-task", Component: AddTask },
      {
        path: "my-tasks",
        Component: MyTasks,
      },
      { path: "buy-coin", Component: BuyCoin },
      // worker routes
      {
        path: "task-list",
        children: [
          { index: true, Component: TaskList },
          {
            path: ":taskId",
            Component: TaskDetails,
            loader: async ({ params }) => {
              const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/tasks/${params.taskId}`
              );
              return res;
            },
          },
        ],
      },
      {
        path: "my-submits",
        Component: MySubmits,
        loader: async () =>
          await fetch(`${import.meta.env.VITE_SERVER_URL}/submission`, {
            method: "GET",
            credentials: "include",
          }),
      },
      {
        path: "withdraws",
        Component: Withdraws,
        loader: async () =>
          await fetch(`${import.meta.env.VITE_SERVER_URL}/withdraws`, {
            credentials: "include",
          }),
      },
    ],
  },
]);

export default router;
