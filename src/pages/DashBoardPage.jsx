import React from "react";
import useDetails from "../hooks/useDetails";
import AdminHome from "../components/dashboard/Admin/AdminHome";
import BuyerHome from "../components/dashboard/Buyer/BuyerHome";
import WorkerHome from "../components/dashboard/Worker/WorkerHome";

const DashBoardPage = () => {
  const { role } = useDetails() || {};

  if (role === "admin") return <AdminHome />;
  if (role === "buyer") return <BuyerHome />;
  if (role === "worker") return <WorkerHome />;
};

export default DashBoardPage;
