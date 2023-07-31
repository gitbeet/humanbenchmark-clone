import { useEffect, useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { numberMemoryIcon } from "../assets/icons";
import Button from "./Button";
import {
  updateGlobalResults,
  updateResults,
  updateResultsLocalStorage,
} from "../features/results/resultsSlice";
import { useAppDispatch, useAppSelector } from "../utilities/hooks";
import { useNavigate } from "react-router-dom";
const generateNumber = (level: number) => {
  let num = "";
  for (var i = 0; i < level; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};

const NumberMemory = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
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
    }, 2000);
    return () => clearTimeout(timeout);
  }, [showNumberScreen]);
  // ANY!
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowInputScreen(false);
    setShowResultScreen(true);
  };

  const tryAgain = (e: any) => {
    e.preventDefault();
    setGameStarted(false);
    setLevel(null);
    setShowInputScreen(false);
    setShowResultScreen(false);
  };

  const next = (e: any) => {
    e.preventDefault();
    setLevel((prev) => {
      return prev !== null ? prev + 1 : 1;
    });
    setShowNumberScreen(true);
  };

  const handleUpdateRes = () => {
    if (user) {
      dispatch(
        updateResults({
          game: "numbermemory",
          result: level || 1,
        })
      );
      dispatch(
        updateGlobalResults({ game: "numbermemory", result: level || 1 })
      );
    } else {
      dispatch(
        updateResultsLocalStorage({
          game: "numbermemory",
          result: level || 1,
        })
      );
    }
    navigate("/dashboard");
  };

  useEffect(() => {
    const listenerNext = (e: any) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        e.preventDefault();
        next;
        console.log("listenernext");
      }
    };
    const listenerTryAgain = (e: any) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        e.preventDefault();
        tryAgain;
        console.log("listenertryagain");
      }
    };
    if (showResultScreen && number === input) {
      document.addEventListener("keydown", listenerNext);
    }
    if (showResultScreen && number !== input) {
      document.addEventListener("keydown", listenerTryAgain);
    }
    return () => {
      document.removeEventListener("keydown", listenerNext);
      document.removeEventListener("keydown", listenerTryAgain);
    };
  }, []);

  return (
    <div
      className={`${
        showResultScreen && number === input ? "animation-flash-white" : ""
      } ${
        showResultScreen && number !== input ? "animation-flash-red" : ""
      }  game-window text-center text-white bg-blue`}
    >
      {!gameStarted ? (
        <>
          <WelcomeScreen
            logo={numberMemoryIcon}
            heading="Number Memory"
            description="The average person can remember 7 numbers at once.Can you do more?"
            button={
              <Button
                text="Start"
                color="yellow"
                onClick={() => {
                  setGameStarted(true);
                  setLevel(1);
                  setShowNumberScreen(true);
                  setNumber(generateNumber(1));
                  setInput("");
                }}
              />
            }
          />
        </>
      ) : (
        <>
          {showNumberScreen && (
            <div className="space-y-8">
              <h2 className="text-7xl font-semibold">{number}</h2>
              <div className="w-24 bg-white h-1 origin-left animation-time-left"></div>
            </div>
          )}
          {showInputScreen && (
            <div className="w-full flex flex-col items-center justify-center gap-8">
              <div>
                <h2 className="text-2xl">What was the number?</h2>
                <p className="text-lg opacity-75">Please enter to submit</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center gap-8  w-[min(100%,1000px)] "
              >
                <input
                  autoFocus
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-dark-blue w-[min(100%,1000px)] h-16 text-3xl focus:outline-none active:outline-none focus:border  active:border focus:border-light-blue active:border-light-blue rounded-sm text-center"
                />{" "}
                <Button color="yellow" text="Submit" type="submit" />
              </form>
            </div>
          )}
          {showResultScreen && (
            <>
              <div className="space-y-8">
                <div className="text-center">
                  <p className="opacity-75">Number</p>
                  <h2 className="text-4xl">{number}</h2>
                </div>
                <div className="text-center">
                  <p className="opacity-75">Your answer</p>
                  <h2 className="text-4xl">
                    {" "}
                    {input.split("").map((letter, i) => (
                      <span
                        className={`${
                          letter === number.split("")[i]
                            ? "font-normal"
                            : "text-neutral-900 line-through font-semibold decoration-2"
                        }`}
                      >
                        {letter}
                      </span>
                    ))}
                  </h2>
                </div>
              </div>
              <div className="text-6xl">Level {level}</div>
              {number === input ? (
                <Button
                  text="Next"
                  color="yellow"
                  type="button"
                  onClick={next}
                />
              ) : (
                <div className="flex gap-4">
                  <Button
                    text="Save Score"
                    color="yellow"
                    type="button"
                    onClick={handleUpdateRes}
                  />
                  <Button
                    text="Try Again"
                    color=""
                    type="button"
                    onClick={tryAgain}
                  />
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
