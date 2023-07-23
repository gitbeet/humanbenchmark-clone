import React from "react";

interface Props {
  description: JSX.Element;
}

const GameDescription = ({ description }: Props) => {
  return (
    <div className="w-full bg-white rounded-md p-8 space-y-12">
      <h1 className="text-4xl">About the test</h1>
      {description}
    </div>
  );
};

export default GameDescription;
