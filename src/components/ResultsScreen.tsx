import React from "react";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../utilities/hooks";
import {
  updateResults,
  updateResultsLocalStorage,
} from "../features/results/resultsSlice";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
interface Props {
  logo: any;
  heading?: string;
  result: string | JSX.Element;
  resultToSave: number;
  onClickSave: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickTryAgain: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ResultsScreen = ({
  logo,
  heading,
  result,
  resultToSave,
  onClickSave,
  onClickTryAgain: onCLickTryAgain,
}: Props) => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const currentGame = params.gameName;
  if (!currentGame) return <h1>loading...</h1>;
  return (
    <div className="bg-blue game-window text-white text-center">
      <div className="scale-150 ">{logo}</div>
      <div className="space-y-2">
        <p className="text-3xl">{heading}</p>
        <h2 className=" text-white text-8xl">{result}</h2>
      </div>
      <p>Save your score to see how you compare.</p>
      <div className="flex gap-4">
        <Button
          text="Save Score"
          color="yellow"
          onClick={() => {
            user
              ? dispatch(
                  updateResults({
                    game: currentGame,
                    result: resultToSave,
                  })
                )
              : dispatch(
                  updateResultsLocalStorage({
                    game: currentGame,
                    result: resultToSave,
                  })
                );

            navigate("/dashboard");
          }}
        />
        <Button text="Try Again" onClick={onCLickTryAgain} />
      </div>
    </div>
  );
};

export default ResultsScreen;
