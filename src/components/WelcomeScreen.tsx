import React, { useEffect, useState } from "react";

interface Props {
  logo?: JSX.Element;
  heading: string;
  description: string | JSX.Element;
  button?: JSX.Element;
  buttonPosition?: "above" | "below";
}

const WelcomeScreen = ({
  logo,
  heading,
  description,
  button,
  buttonPosition = "below",
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } transition-[transform,opacity] duration-[900ms] ease-out space-y-16 flex flex-col items-center text-white`}
    >
      <div className=" scale-[1.9] animate-pulse w-fit">{logo}</div>
      <div className="space-y-4 flex flex-col items-center">
        <p className="text-7xl font-normal">{heading}</p>
        {buttonPosition === "above" ? button : null}

        <p className="text-2xl font-normal w-full text-center">{description}</p>
      </div>
      {buttonPosition === "below" ? button : null}
    </div>
  );
};

export default WelcomeScreen;
