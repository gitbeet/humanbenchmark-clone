import React, { useEffect, useState } from "react";

interface Props {
  logo?: JSX.Element;
  heading?: string | JSX.Element;
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
      <div className="animate-pulse w-fit">{logo}</div>
      <div className="space-y-4 flex flex-col items-center">
        <div className="text-7xl font-normal">{heading}</div>
        {buttonPosition === "above" ? button : null}

        <div className="text-2xl font-normal  text-center w-[min(90%,1000px)]">
          {description}
        </div>
      </div>
      {buttonPosition === "below" ? button : null}
    </div>
  );
};

export default WelcomeScreen;
