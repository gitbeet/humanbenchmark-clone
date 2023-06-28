import React from "react";

interface Props {
  text: string | JSX.Element;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({ text, color = "blue", onClick, type = "button" }: Props) => {
  return (
    <button
      type={type}
      className={`${
        color === "yellow" ? "bg-yellow" : "bg-neutral-blue"
      } w-fit hover:bg-white py-3 px-8  text-xl font-bold text-neutral-900  rounded-sm  transition-colors duration-150 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
