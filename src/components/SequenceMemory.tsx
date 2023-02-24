import { useEffect, useState } from "react";

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

const initGrid = new Array(9).fill({ position: Array.keys() });

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
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([generateNumber()]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [resultsScreen, setResultsScreen] = useState(false);
  const [grid, setGrid] = useState(initialGrid);
  const [watchState, setWatchState] = useState(true);
  const [gameState, setGameState] = useState<"playing" | "victory" | "defeat">(
    "playing"
  );

  useEffect(() => {
    if (gameState === "defeat") return;

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
          }, 500);
        }, 800 + (index + 1) * 800);
      });
    };
    p();
    return () => {};
  }, [gameState]);

  useEffect(() => {
    setGameState("playing");
    const isEqual = playerSequence.every((el, index) => el === sequence[index]);
    const isVictory = isEqual && playerSequence.length === sequence.length;
    if (isVictory) {
      setGameState("victory");
      setLevel((prev) => prev + 1);
      setGrid(initialGrid);
      setPlayerSequence([]);
      setSequence((prev) => [
        ...prev,
        generateNumberToAdd(sequence[sequence.length - 1]),
      ]);
    }
    if (!isEqual) {
      setGameState("defeat");
      setSequence([generateNumber()]);
      setPlayerSequence([]);
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
    <div className=" w-full h-[500px] flex flex-col justify-center items-center bg-blue-400">
      <div>
        <h1>{gameState}</h1>
        <h1>Player sequence - {playerSequence.toString()}</h1>
        <h1>Sequence - {sequence.toString()}</h1>
        <h1>{watchState.toString()}</h1>
      </div>
      {!resultsScreen ? (
        <div className={` grid grid-cols-3 grid-rows-3 gap-2`}>
          {grid.map((box) => (
            <div
              onClick={() => handleClick(box)}
              className={`${
                watchState ? "pointer-events-none" : ""
              } w-20 h-20 rounded-md cursor-pointer transition-all duration-[150ms] ${
                box.visible ? "bg-white" : " bg-blue-500"
              }`}
            ></div>
          ))}
        </div>
      ) : (
        <div>
          <h1>{gameState === "victory" ? "Great job!" : "Game Over"}</h1>
          {gameState === "victory" ? (
            <button onClick={() => setResultsScreen(false)}>Continue</button>
          ) : (
            <button onClick={() => setResultsScreen(false)}>Try Again</button>
          )}
        </div>
      )}
    </div>
  );
};

export default SequenceMemory;
