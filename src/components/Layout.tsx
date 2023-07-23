import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useUserStatus } from "../features/auth/userAuthStatus";
import { useOnSnapshot } from "../features/results/useOnSnapshot";
import { useStoreResults } from "../features/results/useStoreResults";

const Layout = () => {
  useStoreResults();
  useUserStatus();
  useOnSnapshot();
  return (
    <div className="md:bg-neutral-100 min-h-screen">
      <Header />
      <Outlet />
      <div className="text-right  py-12 container-transparent">
        <p className="text-neutral-200">Copyright 2007-2023 Human Benchmark</p>
        <p className="text-light-blue">contact@humanbenchmark.com</p>
        <p className="text-light-blue">Privacy Policy</p>
        <p className="text-light-blue">Licensing</p>
      </div>
    </div>
  );
};

export default Layout;
