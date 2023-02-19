import React, { useEffect, useState } from "react";

const generateNumber = (level: number) => {
  let num = "";
  for (var i = 0; i < level; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};

const NumberMemory = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState<number | null>(null);
  const [number, setNumber] = useState(generateNumber(1));
  const [input, setInput] = useState("");
  const [showNumberScreen, setShowNumberScreen] = useState(false);
  const [showInputScreen, setShowInputScreen] = useState(false);
  const [showResultScreen, setShowResultScreen] = useState(false);
  useEffect(() => {
    if (!showNumberScreen) return;
    // setShowNumberScreen(true);
    setShowInputScreen(false);
    setShowResultScreen(false);
    setNumber(generateNumber(level || 1));
    let timeout: ReturnType<typeof setTimeout>;
    timeout = setTimeout(() => {
      setShowNumberScreen(false);
      setShowInputScreen(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [showNumberScreen]);
  // ANY!
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowInputScreen(false);
    setShowResultScreen(true);
  };

  const tryAgain = () => {
    setLevel(null);
    setLevel(1);
    setNumber(generateNumber(1));
    setInput("");
    setGameStarted(true);
    setShowNumberScreen(true);
    setShowInputScreen(false);
    setShowResultScreen(false);
  };

  const next = () => {
    setLevel((prev) => {
      return prev !== null ? prev + 1 : 1;
    });
    setShowNumberScreen(true);
  };

  return (
    <div className="h-64 bg-blue-400 flex flex-col space-y-4 justify-center items-center text-center">
      <h1>{level?.toString() || "level is null"}</h1>
      {!gameStarted ? (
        <>
          <h2 className="text-2xl font-semibold">Number memory</h2>
          <button
            onClick={() => {
              setGameStarted(true);
              setLevel(1);
              setShowNumberScreen(true);
            }}
            className="border-2 p-2"
          >
            Start
          </button>
        </>
      ) : (
        <>
          {showNumberScreen && (
            <div>
              <h1>Try to remember the number</h1>
              <h2>{number}</h2>
            </div>
          )}
          {showInputScreen && (
            <div>
              <h2>Guess the number</h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                  onChange={(e) => setInput(e.target.value)}
                  className="border border-black"
                />{" "}
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
          {showResultScreen && (
            <>
              <div>
                <h2>Number : {number}</h2>
                <p>
                  Your guess:
                  <span className={number === input ? "" : "line-through"}>
                    {" "}
                    {input}
                  </span>
                </p>
              </div>
              {number === input ? (
                <form>
                  <button onClick={next}>Next</button>
                </form>
              ) : (
                <div>
                  <button onClick={tryAgain}>Try again</button>
                </div>
              )}
            </>
          )}
        </>
      )}{" "}
    </div>
  );
};

export default NumberMemory;
