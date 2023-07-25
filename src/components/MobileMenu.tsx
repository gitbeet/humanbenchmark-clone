import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utilities/hooks";
import * as ReactDOM from "react-dom";
import { toggleMobileMenu } from "../features/modals/modalsSlice";
import { closeButtonIcon } from "../assets/icons";
import { Link } from "react-router-dom";
const MobileMenu = () => {
  const [isBrowser, setIsBrowser] = useState(false);
  const { showMobileMenu } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const portal = (
    <>
      <div
        className={`${
          showMobileMenu ? "translate-x-0" : "-translate-x-full"
        }   fixed z-[1000] w-[300px] h-[100dvh] bg-[rgba(255,255,255,0.7)]  backdrop-blur-sm text-neutral-900 font-semibold   pl-12 p-8 
         transition-all duration-[350ms] `}
      >
        <div
          onClick={() => dispatch(toggleMobileMenu())}
          className="absolute left-[90%] -translate-x-full w-fit"
        >
          {closeButtonIcon}
        </div>
        <div className="mt-24 flex flex-col space-y-8 text-lg font-semibold">
          <Link onClick={() => dispatch(toggleMobileMenu())} to="/dashboard">
            DASHBOARD
          </Link>
          <Link onClick={() => dispatch(toggleMobileMenu())} to="/register">
            SIGN UP
          </Link>
          <Link onClick={() => dispatch(toggleMobileMenu())} to="/login">
            LOGIN
          </Link>
        </div>
      </div>
      <div
        onClick={() => dispatch(toggleMobileMenu())}
        className={`${
          showMobileMenu
            ? "opacity-25 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } fixed z-[9] w-screen h-screen top-0 bottom-0 left-0 right-0 bg-neutral-900`}
      ></div>
    </>
  );
  if (!isBrowser) return null;
  return ReactDOM.createPortal(
    portal,
    document.getElementById("modal-root") as Element | DocumentFragment
  );
};

export default MobileMenu;
