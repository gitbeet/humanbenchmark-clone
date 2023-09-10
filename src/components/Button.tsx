import React from "react";
// test
interface Props {
  text: string | JSX.Element;
  color?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
  width?: string;
}

const Button = ({
  text,
  color = "blue",
  onClick,
  type = "button",
  width = "fit",
}: Props) => {
  return (
    <button
      type={type}
      className={`${
        color === "yellow"
          ? "bg-yellow text-neutral-900  hover:bg-white"
          : "bg-blue text-white  hover:bg-dark-blue"
      } w-${width} py-3 px-8  text-xl font-bold   rounded-sm  transition-colors duration-150 ease-in-out`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
