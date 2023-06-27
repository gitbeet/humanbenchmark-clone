import React from "react";
import Button from "./Button";

interface Props {
  logo: any;
  heading?: string;
  result: string | JSX.Element;
  onClickSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickTryAgain: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ResultsScreen = ({
  logo,
  heading,
  result,
  onClickSave,
  onClickTryAgain: onCLickTryAgain,
}: Props) => {
  return (
    <div className="bg-blue game-window text-white text-center">
      <div className="scale-150 ">{logo}</div>
      <div className="space-y-2">
        <p className="text-3xl">{heading}</p>
        <h2 className=" text-white text-8xl">{result}</h2>
      </div>
      <p>Save your score to see how you compare.</p>
      <div className="flex gap-4">
        <Button text="Save Score" color="yellow" onClick={onClickSave} />
        <Button text="Try Again" onClick={onCLickTryAgain} />
      </div>
    </div>
  );
};

export default ResultsScreen;
