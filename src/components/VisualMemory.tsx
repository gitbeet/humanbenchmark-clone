import { useEffect, useState } from "react";

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
      arr.splice(position, 1, { box: true, visible: true });
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
  const [triesLeft, setTriesLeft] = useState(3);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setGrid((prev) => prev.map((box) => ({ ...box, visible: false })));
      setInitialTurn(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (initialTurn) return;
    const errors = grid.filter((el) => !el.box && el.visible).length;
    const winCondition =
      grid.filter((el) => el.box && el.visible).length === level + 2;
    console.log("Errors: ", errors);
    if (errors >= 3) {
      alert("You lost!");
      setTriesLeft((prev) => prev - 1);
    }
    if (winCondition) {
      alert("You won!");
      setGridSize((prev) => {
        return (level + 2) * 2 > (gridSize * gridSize) / 2 ? prev + 1 : prev;
      });
      setGrid(generateGrid(gridSize, level));
      setInitialTurn(true);
      setLevel((prev) => prev + 1);
      //   setResultsScreen(true);
    }
  }, [grid]);

  useEffect(() => {
    if (triesLeft >= 1) return;
    setResultsScreen(true);
  }, [triesLeft]);

  const handleClick = (index: number) => {
    const isVisible = grid[index].visible;
    if (isVisible) return;
    setGrid((prev) =>
      prev.map((box, i) => {
        return i === index ? { ...box, visible: true } : box;
      })
    );
  };

  console.log(grid);
  return (
    <div className="bg-blue-400 w-full h-[500px] flex flex-col justify-center items-center">
      {!resultsScreen ? (
        <>
          <h1>Visual memory</h1>
          <div className="grid w-fit h-fit gap-4 grid-cols-3 grid-rows-3">
            {grid.map((el, index) => (
              <div
                onClick={() => handleClick(index)}
                key={index}
                className={`${
                  el.box && el.visible
                    ? "bg-white"
                    : !el.box && el.visible && !initialTurn
                    ? "bg-blue-900"
                    : "bg-blue-500"
                } w-16 h-16`}
              ></div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Visual memory</h2>
          <p>Level {level}</p>
          <button>Try again</button>
        </>
      )}
    </div>
  );
};

export default VisualMemory;
