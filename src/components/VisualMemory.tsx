import { useEffect, useState } from "react";
import "../css/VisualMemory.css";
import WelcomeScreen from "./WelcomeScreen";
import { visualMemoryIcon, heartIcon } from "../assets/icons";
import Button from "./Button";
import ResultsScreen from "./ResultsScreen";

interface BoxInterface {
  box: boolean;
  visible: boolean;
}

const generateGrid = (gridSize: number, level: number): BoxInterface[] => {
  const numberOfBlocks = level + 2;
  const arr: BoxInterface[] = new Array(gridSize * gridSize).fill({
    box: false,
    visible: true,
  });
  for (let i = 0; i < numberOfBlocks; i++) {
    let position;
    while (
      arr.reduce((acc, el) => {
        return el.box ? acc + 1 : acc + 0;
      }, 0) < numberOfBlocks
    ) {
      position = Math.floor(Math.random() * arr.length);
      arr.splice(position, 1, { box: true, visible: false });
    }
  }
  return arr;
};

const VisualMemory = () => {
  const [grid, setGrid] = useState(generateGrid(3, 1));
  const [level, setLevel] = useState(1);
  const [initialTurn, setInitialTurn] = useState(true);
  const [resultsScreen, setResultsScreen] = useState(false);
  const [triesLeft, setTriesLeft] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [boardReset, setBoardReset] = useState(false);
  const [clickable, setClickable] = useState(false);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setGrid((prev) => prev.map((box) => ({ ...box, visible: true })));
    }, 1000);
    let timeout2 = setTimeout(() => {
      setGrid((prev) => prev.map((box) => ({ ...box, visible: false })));
      setInitialTurn(false);
      setClickable(true);
    }, 2100);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [boardReset]);

  useEffect(() => {
    if (initialTurn) return;
    const errors = grid.filter((el) => !el.box && el.visible).length;
    const winCondition =
      grid.filter((el) => el.box && el.visible).length === level + 2;
    if (errors >= 3) {
      setClickable(false);
      setInitialTurn(true);
      setGrid(generateGrid(Math.ceil(Math.sqrt((level + 2) * 2)), level));
      setBoardReset((prev) => !prev);
      setTriesLeft((prev) => prev - 1);
      return;
    }
    if (winCondition) {
      setClickable(false);
      setTimeout(() => {
        setInitialTurn(true);
        setGrid(
          generateGrid(Math.ceil(Math.sqrt((level + 2 + 1) * 2)), level + 1)
        );
        setLevel((prev) => prev + 1);
        setBoardReset((prev) => !prev);
      }, 2000);
      return;
    }
  }, [grid]);

  useEffect(() => {
    if (triesLeft >= 1) return;
    setResultsScreen(true);
  }, [triesLeft]);

  const handleClick = (index: number) => {
    if (!clickable) return;
    const isVisible = grid[index].visible;
    if (isVisible || initialTurn) return;
    setGrid((prev) =>
      prev.map((box, i) => {
        return i === index ? { ...box, visible: true } : box;
      })
    );
  };
  return (
    <div className="game-window bg-blue">
      <p className="w-full text-left text-xl text-white absolute z-[100] pointer-events-none">
        grid size -{Math.ceil(Math.sqrt((level + 2) * 2))}
        <br />
        level - {level}
        <br />
        initialTurn - {initialTurn.toString()}
      </p>
      {!gameStarted ? (
        <WelcomeScreen
          logo={visualMemoryIcon}
          heading="Visual Memory Test"
          description="Memorize the squares."
          button={
            <Button
              text="Start"
              color="yellow"
              onClick={() => {
                setGameStarted(true);
                setInitialTurn(true);
                setBoardReset((prev) => !prev);
              }}
            />
          }
        />
      ) : resultsScreen ? (
        <ResultsScreen
          logo={visualMemoryIcon}
          heading="Visual Memory"
          result={<p>Level {level}</p>}
          onClickSave={() => {}}
          onClickTryAgain={() => {
            setTriesLeft(3);
            setGameStarted(false);
            setInitialTurn(true);
            setGrid(generateGrid(3, 1));
            setLevel(1);
            setResultsScreen(false);
            setBoardReset((prev) => !prev);
          }}
        />
      ) : (
        <>
          <div className="flex flex-col gap-12 items-center">
            <div className="flex gap-16">
              <p className="text-4xl text-white">
                <span className="opacity-50">Level</span> {level}
              </p>
              <div className="flex gap-2 items-center">
                <p className="text-white text-4xl opacity-50   ">Lives</p>
                <div className="flex gap-1 items-center   ">
                  <div
                    className={`${
                      triesLeft >= 1 ? "opacity-100" : "opacity-50"
                    } w-[28px] h-[28px] text-white`}
                  >
                    {heartIcon}
                  </div>
                  <div
                    className={`${
                      triesLeft >= 2 ? "opacity-100" : "opacity-50"
                    } w-[28px] h-[28px] text-white`}
                  >
                    {heartIcon}
                  </div>
                  <div
                    className={`${
                      triesLeft >= 3 ? "opacity-100" : "opacity-50"
                    } w-[28px] h-[28px] text-white`}
                  >
                    {heartIcon}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${Math.ceil(
                  Math.sqrt((level + 2) * 2)
                )},minmax(0, 1fr))`,
                gridTemplateRows: `repeat(${Math.ceil(
                  Math.sqrt((level + 2) * 2)
                )},minmax(0, 1fr))`,
              }}
              className={` w-[400px] h-[400px] gap-2 `}
            >
              {grid.map((el, index) => (
                <div
                  onClick={() => handleClick(index)}
                  key={index}
                  // TODO : change width on grid size (to not overflow)
                  className={` w-full h-full rounded-[10%]  overflow-visible relative`}
                >
                  <div
                    className={`${
                      el.box && el.visible && initialTurn
                        ? "bg-white animation_box__turn "
                        : el.box && el.visible && !initialTurn
                        ? "bg-white animation_box__turn__clicked "
                        : !el.box && el.visible && !initialTurn
                        ? "bg-very-dark-blue animation_empty__turn "
                        : "bg-dark-blue  "
                    } w-full h-full rounded-[10%] relative z-10`}
                  ></div>
                  <div className="bg-dark-blue absolute w-full h-full z-0 top-0 bottom-0 left-0 right-0 rounded-[10%]"></div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VisualMemory;
