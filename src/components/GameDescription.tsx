import React from "react";

interface Props {
  description: JSX.Element;
}

const GameDescription = ({ description }: Props) => {
  return (
    <div className="w-full bg-white rounded-md px-4 md:p-8 space-y-12">
      <h1 className="text-3xl">About the test</h1>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default GameDescription;
