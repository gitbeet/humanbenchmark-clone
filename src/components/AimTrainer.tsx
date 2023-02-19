import React, { useEffect, useState } from "react";

const AimTrainer = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [pos, setPos] = useState<[number, number]>([50, 50]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [showResultsScreen, setShowResultsScreen] = useState(false);

  useEffect(() => {
    if (results.length < 10) return;
    setShowResultsScreen(true);
  }, [results]);

  const shoot = () => {
    if (!results.length) {
      setStartTime(Date.now());
      setPos([
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
      ]);
      setResults((prev) => [...prev, 0]);
      return;
    }
    const endT = Date.now();
    setEndTime(endT);
    if (startTime) {
      setResults((prev) => [...prev, endT - startTime]);
    }
    setStartTime(endT);
    setPos([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
  };
  const positionClass = `top-[${pos[0]}] left-[${pos[1]}]`;
  return (
    <div className="h-64 w-full bg-blue-400 flex flex-col justify-center items-center">
      {!gameStarted ? (
        <div className="text-center space-y-4">
          <h1>Welcome to aim test</h1>
          <button onClick={() => setGameStarted(true)}>Start game</button>
        </div>
      ) : (
        <>
          {!showResultsScreen ? (
            <div className="w-full h-full relative">
              <p>Remaining: {10 - results.length}</p>
              <div>
                {results.map((res) => (
                  <span className="mr-4">{res}</span>
                ))}
              </div>
              {results.map((res) => (
                <li>{res}</li>
              ))}
              <div
                style={{
                  top: `${pos[0] < 20 ? 20 : pos[0] > 80 ? 80 : pos[0]}%`,
                  left: `${pos[1] < 15 ? 15 : pos[1] > 85 ? 85 : pos[1]}%`,
                }}
                onClick={shoot}
                className="absolute w-16 h-16 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
              ></div>
            </div>
          ) : (
            <>
              <h1>
                Average shooting time is{" "}
                {Math.floor(
                  results.reduce((acc, result) => acc + result, 0) / 9
                )}
                ms
              </h1>
              <button
                onClick={() => {
                  setResults([]);
                  setShowResultsScreen(false);
                  setGameStarted(false);
                  setStartTime(null);
                  setEndTime(null);
                }}
              >
                Try again
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AimTrainer;
