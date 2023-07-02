import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  return <div>Welcome , {user?.displayName || user?.email}</div>;
};

export default Dashboard;
