import React from "react";

interface Props {
  text: string;
  color?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, color = "blue", onClick }: Props) => {
  return (
    <button
      className={`${
        color === "yellow" ? "bg-yellow" : "bg-neutral-blue"
      } hover:bg-white py-3 px-8  text-xl font-semibold text-neutral-900  rounded-sm  transition-colors duration-150 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
