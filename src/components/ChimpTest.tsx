import { useEffect, useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { chimpTestIcon } from "../assets/icons";
import Button from "./Button";
import ResultsScreen from "./ResultsScreen";

const grid = new Array(40);

const populateGrid = (numberOfBlocks: number) => {
  let arr = [...grid];
  let nums = Array.from(Array(numberOfBlocks).keys());
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
  const [gameStarted, setGameStarted] = useState(false);

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
    <div className="game-window bg-blue">
      {!gameStarted ? (
        <WelcomeScreen
          logo={chimpTestIcon}
          heading={
            <p className="text-5xl">Are You Smarter Than a Chimpanzee?</p>
          }
          description={
            <p>
              Click the squares in order according to their numbers.
              <br />
              The test will get progressively harder.
            </p>
          }
          button={
            <Button
              text="Start Test"
              color="yellow"
              onClick={() => setGameStarted(true)}
            />
          }
        />
      ) : showResultScreen ? (
        <>
          {triesLeft > 0 ? (
            <div className="text-center text-white space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl">NUMBERS</h2>
                <h2 className="text-8xl">{blocks}</h2>
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl">STRIKES</h2>
                <h2 className="text-4xl">{3 - triesLeft} of 3</h2>
              </div>
              <Button
                text="Continue"
                color="yellow"
                onClick={() => {
                  setResultArray([]);
                  setGrid(populateGrid(blocks));
                  setShowNumbers(true);
                  setShowResultScreen(false);
                }}
              />
            </div>
          ) : (
            <>
              <ResultsScreen
                resultToSave={blocks}
                logo={chimpTestIcon}
                result={blocks.toString()}
                heading="Score"
                onClickTryAgain={() => {
                  setGameStarted(false);
                  setBlocks(4);
                  setGrid(populateGrid(4));
                  setResultArray([]);
                  setShowNumbers(true);
                  setShowResultScreen(false);
                  setTriesLeft(3);
                }}
                onClickSave={() => {}}
              />
            </>
          )}
        </>
      ) : (
        <div className="w-fit h-fit px-16 py-12 grid grid-cols-8 grid-rows-5 gap-2">
          {grid.map((box, index) =>
            box.visible ? (
              <div
                key={index}
                onClick={() => onItemClick(box.value, index)}
                className={`${
                  box.value
                    ? "border-4 border-neutral-blue border-opacity-50 hover:border-opacity-100"
                    : ""
                } ${
                  !showNumbers && box.value && "bg-white border-0"
                } w-20 h-20 rounded-xl flex justify-center items-center text-white font-semibold text-5xl cursor-pointer transition-all duration-75 `}
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
