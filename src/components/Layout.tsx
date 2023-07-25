import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useUserStatus } from "../features/auth/userAuthStatus";
import { useOnSnapshot } from "../features/results/useOnSnapshot";
import { useStoreResults } from "../features/results/useStoreResults";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";

const Layout = () => {
  useStoreResults();
  useUserStatus();
  useOnSnapshot();
  return (
    <div className="md:bg-neutral-100 min-h-screen">
      <MobileMenu />
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
