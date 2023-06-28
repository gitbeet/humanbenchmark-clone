import { useEffect, useRef, useState } from "react";
import {
  reactionTimeIcon,
  clockIcon,
  exclamationMarkIcon,
} from "../assets/icons";
import ResultsScreen from "./ResultsScreen";
import WelcomeScreen from "./WelcomeScreen";

interface ResultInterface {
  try: number;
  time: number;
}

const waitForGreenMessage = (
  <div className="space-y-16 flex flex-col items-center">
    <div className="flex gap-2">
      <div className="rounded-full bg-white w-6 h-6"></div>
      <div className="rounded-full bg-white w-6 h-6"></div>
      <div className="rounded-full bg-white w-6 h-6"></div>
    </div>{" "}
    <p className="text-8xl font-normal w-full text-center">Wait for green</p>
  </div>
);

const readyToClickMessage = (
  <div className="space-y-16 flex flex-col items-center">
    <div className="flex gap-2">
      <div className="rounded-full bg-white w-6 h-6"></div>
      <div className="rounded-full bg-white w-6 h-6"></div>
      <div className="rounded-full bg-white w-6 h-6"></div>
    </div>
    <p className="text-8xl font-normal w-full text-center">Click!</p>
  </div>
);

const initialMessage = (
  <WelcomeScreen
    logo={reactionTimeIcon}
    description={"When the red box turns green, click as quickly as you can."}
    heading="Reaction Time"
  />
);

const ReactionTime = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [readyToClick, setReadyToClick] = useState(false);
  const [message, setMessage] = useState<JSX.Element>(initialMessage);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [results, setResults] = useState<ResultInterface[]>([]);
  const [resultsStage, setResultsStage] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;
    const delay = Math.floor(1000 + Math.random() * 1000);
    let timeout = setTimeout(() => {
      setReadyToClick(true);
      setStartTime(Date.now());
    }, delay);
    return () => clearTimeout(timeout);
  }, [gameStarted]);

  useEffect(() => {
    if (results.length < 5) return;
    setResultsStage(true);
  }, [results]);

  const startGame = () => {
    console.log("Start game");
    const delay = Math.floor(1000 + Math.random() * 1000);
    setMessage(waitForGreenMessage);
    setReactionTime(null);
    setGameStarted(true);
  };

  const endGame = () => {
    setStartTime(null);
    console.log("End game");
    setGameStarted(false);
    if (!readyToClick) {
      setMessage(
        <div className="flex flex-col items-center gap-8">
          <div className="w-20 h-20"> {exclamationMarkIcon}</div>
          <h2 className="text-7xl">Too soon!</h2>
          <p className="text-xl">Click to try again.</p>
        </div>
      );
      setStartTime(null);
      setReadyToClick(false);
      return;
    }
    if (startTime) {
      setMessage(<></>);
      setStartTime(null);
      setReadyToClick(false);
      if (results.length <= 5) {
        const reactionTime = Date.now() - startTime;
        setReactionTime(reactionTime);

        setResults((prev) => [
          ...prev,
          { try: results.length + 1, time: reactionTime || 0 },
        ]);
      }
      return;
    }
  };

  useEffect(() => {
    if (gameStarted && readyToClick) {
      setMessage(readyToClickMessage);
    }
  }, [gameStarted, readyToClick]);

  return (
    <>
      {!resultsStage ? (
        <div
          className={`${
            !gameStarted ? "bg-blue" : !readyToClick ? "bg-red" : "bg-green"
          } game-window text-center text-white`}
          onClick={!gameStarted ? startGame : endGame}
        >
          {!gameStarted && reactionTime ? (
            <div className="flex flex-col items-center gap-8">
              <div className="w-20 h-20">{clockIcon}</div>
              <p className="text-7xl font-semibold">{reactionTime} ms</p>
              {/* <p className="text-2xl">{results.length}/5</p> */}
              <p className="text-3xl">Click to keep going</p>
            </div>
          ) : null}
          <div className="font-semibold text-5xl text-white">{message}</div>
        </div>
      ) : (
        <ResultsScreen
          onClickSave={() => {}}
          onClickTryAgain={() => {
            setResults([]);
            setMessage(initialMessage);
            setReactionTime(null);
            setGameStarted(false);
            setReadyToClick(false);
            setStartTime(null);
            setResultsStage(false);
          }}
          logo={reactionTimeIcon}
          heading="Reaction Time"
          result={
            <>
              {Math.floor(
                results.reduce((acc, result) => acc + result.time, 0) / 5
              )}
              ms
            </>
          }
        />
      )}
    </>
  );
};

export default ReactionTime;
