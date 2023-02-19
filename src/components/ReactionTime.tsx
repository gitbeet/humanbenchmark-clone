import { useEffect, useState } from "react";

interface ResultInterface {
  try: number;
  time: number;
}

const ReactionTime = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [readyToClick, setReadyToClick] = useState(false);
  const [message, setMessage] = useState("Click to start");
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
    setMessage("");
    setReactionTime(null);
    setGameStarted(true);
  };

  const endGame = () => {
    setStartTime(null);
    console.log("End game");
    setGameStarted(false);
    if (!readyToClick) {
      setMessage("You clicked too early.");
      setStartTime(null);
      setReadyToClick(false);
      return;
    }
    if (startTime) {
      setMessage("Try again");
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

  return (
    <>
      {!resultsStage ? (
        <div
          className={`${
            !gameStarted
              ? "bg-blue-400"
              : !readyToClick
              ? "bg-red-400"
              : "bg-green-400"
          } w-full h-64 flex flex-col justify-center items-center text-center`}
          onClick={!gameStarted ? startGame : endGame}
        >
          {!gameStarted && reactionTime ? (
            <div className="space-y-12">
              <p>Your reaction time was {reactionTime}ms!</p>
              <p className="text-2xl">{results.length}/5</p>
            </div>
          ) : null}
          <p className="font-semibold">{message}</p>
        </div>
      ) : (
        <div className="bg-blue-400 w-full h-64 flex flex-col justify-center items-center space-y-12 text-center">
          <h2 className="font-semibold">
            Your average reaction time is{" "}
            {results.reduce((acc, result) => acc + result.time, 0) / 5}ms!
          </h2>
          <button
            className="p-2 bg-blue-500 text-white font-bold"
            onClick={() => {
              setResults([]);
              setMessage("");
              setReactionTime(null);
              setGameStarted(false);
              setReadyToClick(false);
              setStartTime(null);
              setResultsStage(false);
            }}
          >
            Play again
          </button>
        </div>
      )}
    </>
  );
};

export default ReactionTime;
