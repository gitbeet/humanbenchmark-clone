import { useEffect, useState } from "react";
import "../css/VisualMemory.css";

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
  const [gridSize, setGridSize] = useState(3);
  const [level, setLevel] = useState(1);
  const [initialTurn, setInitialTurn] = useState(true);
  const [resultsScreen, setResultsScreen] = useState(false);
  const [result, setResult] = useState<"playing" | "won" | "lost">("playing");
  const [triesLeft, setTriesLeft] = useState(3);

  useEffect(() => {
    if (resultsScreen) return;
    let timeout = setTimeout(() => {
      setGrid((prev) => prev.map((box) => ({ ...box, visible: true })));
      //   setInitialTurn(false);
    }, 1000);
    let timeout2 = setTimeout(() => {
      setGrid((prev) => prev.map((box) => ({ ...box, visible: false })));
      setInitialTurn(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [resultsScreen]);

  useEffect(() => {
    if (initialTurn) return;
    const errors = grid.filter((el) => !el.box && el.visible).length;
    const winCondition =
      grid.filter((el) => el.box && el.visible).length === level + 2;
    if (errors >= 3) {
      setResult("lost");
      setTriesLeft((prev) => prev - 1);
      setResultsScreen(true);
      setInitialTurn(true);
      return;
    }
    if (winCondition) {
      setResult("won");
      setGridSize((prev) => {
        return (level + 2) * 2 > (gridSize * gridSize) / 2 ? prev + 1 : prev;
      });
      setLevel((prev) => prev + 1);
      setInitialTurn(true);
      setResultsScreen(true);
      return;
    }
  }, [grid]);

  useEffect(() => {
    if (triesLeft >= 1) return;
    setResultsScreen(true);
  }, [triesLeft]);

  const handleClick = (index: number) => {
    const isVisible = grid[index].visible;
    if (isVisible || initialTurn) return;
    setGrid((prev) =>
      prev.map((box, i) => {
        return i === index ? { ...box, visible: true } : box;
      })
    );
  };
  // use style
  let gridClass = `grid-cols-${gridSize.toString()} grid-rows-${gridSize.toString()}`;

  console.log(grid);
  return (
    <div className="bg-blue-400 w-full h-[500px] flex flex-col justify-center items-center">
      {!resultsScreen ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
            }}
            className={`grid w-fit h-fit gap-2 grid-cols-5`}
          >
            {grid.map((el, index) => (
              <div
                onClick={() => handleClick(index)}
                key={index}
                className={`${
                  el.box && el.visible
                    ? "bg-white animation_box__turn "
                    : !el.box && el.visible && !initialTurn
                    ? "bg-blue-900 animation_empty__turn "
                    : "bg-blue-500 "
                } w-20 h-20 rounded-md `}
              ></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Visual memory</h2>
          <p>Level {level}</p>
          {result === "won" ? (
            <button
              onClick={() => {
                setGrid(generateGrid(gridSize, level));
                setResultsScreen(false);
              }}
            >
              Continue
            </button>
          ) : result === "lost" ? (
            <button
              onClick={() => {
                setGrid(generateGrid(gridSize, level));
                setResultsScreen(false);
              }}
            >
              Try again
            </button>
          ) : null}
        </>
      )}
    </div>
  );
};

export default VisualMemory;
