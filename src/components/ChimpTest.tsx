import { useEffect, useState } from "react";

const grid = new Array(40);

const populateGrid = (numberOfBlocks: number) => {
  let arr = [...grid];
  let nums = Array.from(Array(numberOfBlocks).keys());
  let positions = [];
  //   account for repeating positions
  for (let i = 0; i < numberOfBlocks; i++) {
    let position;
    do {
      position = Math.floor(Math.random() * 40);
    } while (arr[position]);
    arr.splice(position, 1, nums[i] + 1);
  }
  return arr.map((el) => ({ value: el, visible: true }));
};

const compareArr = (arr1: number[], arr2: number[]) => {
  let res = true;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      res = false;
      break;
    }
  }
  return res;
};

const ChimpTest = () => {
  const [showNumbers, setShowNumbers] = useState(true);
  const [blocks, setBlocks] = useState(4);
  const [grid, setGrid] = useState(populateGrid(blocks));
  const [resultArray, setResultArray] = useState<number[]>([]);
  const [showResultScreen, setShowResultScreen] = useState(false);
  const [triesLeft, setTriesLeft] = useState(3);

  let sortedArr = grid
    .map((element) => element.value)
    .filter((element) => element)
    .sort((a, b) => a - b);
  useEffect(() => {
    const isAscending = compareArr(resultArray, sortedArr);

    if (!isAscending) {
      setShowResultScreen(true);
      console.log("YOU LOST");
      setTriesLeft((prev) => prev - 1);
    } else if (isAscending && resultArray.length === blocks) {
      setShowResultScreen(true);
      console.log("YOU WON");
      setBlocks((prev) => prev + 1);
    }
    // ???
    else {
      return;
    }
  }, [resultArray]);

  const onItemClick = (value: number, position: number) => {
    if (showNumbers) {
      setShowNumbers(false);
    }
    setGrid((prev) =>
      prev.map((element, index) => {
        return index === position
          ? { ...element, visible: !element.visible }
          : element;
      })
    );
    setResultArray((prev) => [...prev, value]);
  };

  return (
    <div className="w-full h-[500px] bg-blue-400 flex justify-center items-center">
      {showResultScreen ? (
        <div className="text-center">
          {triesLeft > 0 ? (
            <>
              <h2 className="text-xl">NUMBERS</h2>
              <h2 className="text-xl">{blocks}</h2>
              <br />
              <h2>STRIKES</h2>
              <h2>{3 - triesLeft} / 3</h2>
              <button
                onClick={() => {
                  setResultArray([]);
                  setGrid(populateGrid(blocks));
                  setShowNumbers(true);
                  setShowResultScreen(false);
                }}
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <h2>Score</h2>
              <h1>{blocks}</h1>
              <button
                onClick={() => {
                  setBlocks(4);
                  setGrid(populateGrid(4));
                  setResultArray([]);
                  setShowNumbers(true);
                  setShowResultScreen(false);
                  setTriesLeft(3);
                }}
              >
                Try Again
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="w-fit h-fit px-16 py-12 grid grid-cols-8 grid-rows-5 gap-1">
          {grid.map((box, index) =>
            box.visible ? (
              <div
                key={index}
                onClick={() => onItemClick(box.value, index)}
                className={`${box.value ? "border-4 border-white" : ""} ${
                  !showNumbers && box.value && "bg-white"
                } w-16 h-16 rounded-lg flex justify-center items-center text-white font-semibold text-3xl cursor-pointer`}
              >
                {showNumbers ? box.value : ""}
              </div>
            ) : (
              <div
                key={index}
                className="w-16 h-16 rounded-lg flex justify-center items-center text-white font-semibold text-3xl cursor-pointer"
              ></div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ChimpTest;
