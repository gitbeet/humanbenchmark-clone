import React from "react";

const NotFound = () => {
  return (
    <div className="bg-white shadow-md mt-8 w-[min(1000px,90%)] mx-auto flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-[15rem] font-extrabold leading-[220px] ">?</h1>
      <h1 className="text-4xl font-normal">404 Not Found</h1>
      <p className="text-xl">
        If you think this is an error, please{" "}
        <span className="cursor-pointer text-blue">contact us</span> so we can
        fix it!
      </p>
    </div>
  );
};

export default NotFound;
