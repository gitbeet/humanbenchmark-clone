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
    <div className="bg-neutral-100 min-h-screen">
      <Header />
      <Outlet />
      <div>footer</div>
    </div>
  );
};

export default Layout;
