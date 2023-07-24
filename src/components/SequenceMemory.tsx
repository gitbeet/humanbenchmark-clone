import { useEffect, useState } from "react";
import Button from "./Button";
import ResultsScreen from "./ResultsScreen";
import { sequenceMemoryIcon } from "../assets/icons";
import WelcomeScreen from "./WelcomeScreen";

//generate a  random number between 1-9
const generateNumber = () => {
  return Math.floor(Math.random() * 9 + 1);
};

//generate a  random number between 1-9 that is different from the last number in the sequence
const generateNumberToAdd = (prevNumber: number) => {
  let number = generateNumber();
  while (number === prevNumber) {
    number = generateNumber();
  }
  return number;
};

// const initGrid = new Array(9).fill({ position: Array.keys() });

const initialGrid = [
  { position: 1, visible: false },
  { position: 2, visible: false },
  { position: 3, visible: false },
  { position: 4, visible: false },
  { position: 5, visible: false },
  { position: 6, visible: false },
  { position: 7, visible: false },
  { position: 8, visible: false },
  { position: 9, visible: false },
];
const SequenceMemory = () => {
  const [sequence, setSequence] = useState<number[]>([generateNumber()]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [resultsScreen, setResultsScreen] = useState(false);
  const [grid, setGrid] = useState(initialGrid);
  const [watchState, setWatchState] = useState(false);
  const [gameState, setGameState] = useState<
    "playing" | "victory" | "defeat" | "idle"
  >("idle");

  useEffect(() => {
    if (gameState === "defeat" || gameState === "idle") return;
    setWatchState(true);
    const p = () => {
      sequence.forEach((element, index) => {
        setTimeout(() => {
          setGrid((prev) =>
            prev.map((el) => {
              return el.position === element ? { ...el, visible: true } : el;
            })
          );
          setTimeout(() => {
            setGrid((prev) =>
              prev.map((el) => {
                if (index === sequence.length - 1) {
                  setWatchState(false);
                }
                return el.position === element ? { ...el, visible: false } : el;
              })
            );
          }, 300);
        }, 500 + (index + 1) * 500);
      });
    };
    p();
    return () => {};
  }, [gameState]);

  useEffect(() => {
    if (playerSequence.length < 1 && sequence.length === 1) return;
    setGameState("playing");
    const isEqual = playerSequence.every((el, index) => el === sequence[index]);
    const isVictory = isEqual && playerSequence.length === sequence.length;
    if (isVictory) {
      setGameState("victory");
      setGrid(initialGrid);
      setPlayerSequence([]);
      setSequence((prev) => [
        ...prev,
        generateNumberToAdd(sequence[sequence.length - 1]),
      ]);
    }
    if (!isEqual) {
      setGameState("defeat");
      setResultsScreen(true);
      return;
    }
  }, [playerSequence]);

  const handleClick = (box: { position: number; visible: boolean }) => {
    setGrid((prev) =>
      prev.map((element) => {
        return element.position === box.position
          ? { ...element, visible: true }
          : element;
      })
    );
    setTimeout(() => {
      setGrid((prev) =>
        prev.map((element) => {
          return element.position === box.position
            ? { ...element, visible: false }
            : element;
        })
      );
      setPlayerSequence((prev) => [...prev, box.position]);
    }, 200);
  };

  return (
    <div className=" game-window bg-blue">
      {!resultsScreen ? (
        gameState === "idle" ? (
          <WelcomeScreen
            logo={sequenceMemoryIcon}
            heading="Sequence Memory Test"
            description="Memorize the pattern."
            button={
              <Button
                text="Start"
                color="yellow"
                onClick={() => setGameState("playing")}
              />
            }
          />
        ) : (
          <>
            <h1 className="text-white text-4xl">
              <span className="opacity-75">Level: </span>
              {sequence.length}
            </h1>
            <div className={` grid grid-cols-3 grid-rows-3 gap-4`}>
              {grid.map((box) => (
                <div
                  onClick={() => handleClick(box)}
                  className={`${
                    watchState ? "pointer-events-none" : ""
                  } w-28 h-28 rounded-md cursor-pointer transition-all duration-[150ms] ${
                    box.visible ? "bg-white" : " bg-dark-blue"
                  }`}
                ></div>
              ))}
            </div>
          </>
        )
      ) : (
        <ResultsScreen
          resultToSave={sequence.length}
          logo={sequenceMemoryIcon}
          heading="Sequence Memory"
          result={<>Level {sequence.length}</>}
          onClickSave={() => {}}
          onClickTryAgain={() => {
            setResultsScreen(false);
            setSequence([generateNumber()]);
            setPlayerSequence([]);
            setGameState("idle");
          }}
        />
      )}
    </div>
  );
};

export default SequenceMemory;
