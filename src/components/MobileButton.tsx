import React from "react";

const MobileButton = () => {
  return (
    <div className="block md:hidden relative h-3 w-4 cursor-pointer">
      <div className="absolute  top-0 w-4 h-[2px] bg-neutral-900 "></div>
      <div className="absolute  top-1/2 w-4 h-[2px] bg-neutral-900"></div>
      <div className="absolute  top-full w-4 h-[2px] bg-neutral-900"></div>
    </div>
  );
};

export default MobileButton;
