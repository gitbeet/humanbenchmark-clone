import React from "react";
import { reactionTimeIcon } from "../assets/icons";

const Header = () => {
  return (
    <div className="container-mine shadow-lg">
      <div className="py-3 px-8 flex justify-between  text-neutral-900 wrapper">
        <div className="flex gap-6">
          <div className="flex  justify-center items-center w-fit gap-1">
            <svg
              className="opacity-25"
              width="15"
              height="15"
              viewBox="0 0 100 128"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Reaction Time</title>
              <path
                d="M0.719527 59.616L32.8399 2.79148C33.8149 1.06655 35.6429 0 37.6243 0H94.4947C98.9119 0 101.524 4.94729 99.0334 8.59532L71.201 49.357C68.7101 53.0051 71.3225 57.9524 75.7397 57.9524H82.2118C87.3625 57.9524 89.6835 64.4017 85.7139 67.6841L14.34 126.703C9.85287 130.413 3.43339 125.513 5.82845 120.206L25.9709 75.5735C27.6125 71.936 24.9522 67.8166 20.9615 67.8166H5.50391C1.29539 67.8166 -1.35146 63.2798 0.719527 59.616Z"
                fill="currentcolor"
              ></path>
            </svg>
            <p className="font-semibold  text-lg">HUMAN BENCHMARK</p>
          </div>
          <p className="font-semibold text-lg">DASHBOARD</p>
        </div>
        <div className="flex gap-6">
          <p className="font-semibold text-lg">SIGN UP</p>
          <p className="font-semibold text-lg">LOGIN</p>
        </div>
      </div>
    </div>
  );
};

export default Header;