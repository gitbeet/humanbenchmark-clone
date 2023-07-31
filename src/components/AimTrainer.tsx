import { useEffect, useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import { aimTrainerIcon } from "../assets/icons";
import ResultsScreen from "./ResultsScreen";

const AimTrainer = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [pos, setPos] = useState<[number, number]>([50, 50]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [showResultsScreen, setShowResultsScreen] = useState(false);
  const [shot, setShot] = useState(false);
  // test
  useEffect(() => {
    if (results.length < 11) return;
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
      // not sure if correct amount
      setResults((prev) => [...prev, endT - startTime - 90]);
    }
    setStartTime(endT);
    setPos([Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)]);
  };
  const positionClass = `top-[${pos[0]}] left-[${pos[1]}]`;
  return (
    <div className="game-window bg-blue">
      {!gameStarted ? (
        <WelcomeScreen
          buttonPosition="above"
          heading="Aim Trainer"
          button={
            <div
              onClick={() => {
                shoot();
                setGameStarted(true);
              }}
              className="relative flex items-center justify-center w-24 h-24 border-2 border-white bg-neutral-blue  rounded-full before:w-full before:h-[2px] before:bg-white before:absolute after:w-[2px] after:h-full after:bg-white after:absolute  "
            >
              <div className="flex justify-center items-center w-16 h-16 border-2 border-white rounded-full">
                <div className="absolute w-8 h-8 border-2 border-white rounded-full"></div>
              </div>
            </div>
          }
          description="Hit 10 targets as quickly as you can.Click the target above to begin."
        />
      ) : (
        <>
          {!showResultsScreen ? (
            <div className="w-full h-full relative">
              <p className="text-white text-3xl w-full text-center pt-6">
                <span className="opacity-75">Remaining</span>{" "}
                {11 - results.length}
              </p>
              <div
                style={{
                  top: `${pos[0] < 40 ? 20 : pos[0] > 80 ? 80 : pos[0]}%`,
                  left: `${pos[1] < 35 ? 35 : pos[1] > 65 ? 65 : pos[1]}%`,
                }}
                onClick={() => {
                  shoot();
                  setShot(true);
                }}
                onAnimationEnd={() => setShot(false)}
                className={`
                  ${
                    shot ? "animation-appear" : ""
                  } absolute flex items-center justify-center w-24 h-24 border-2 border-white bg-neutral-blue  rounded-full  before:w-full before:h-[2px] before:bg-white before:absolute after:w-[2px] after:h-full after:bg-white after:absolute origin-center`}
              >
                <div className="flex justify-center items-center w-16 h-16 border-2 border-white rounded-full">
                  <div className="absolute w-8 h-8 border-2 border-white rounded-full"></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ResultsScreen
                resultToSave={Math.floor(
                  results.reduce((acc, result) => acc + result, 0) / 10
                )}
                logo={aimTrainerIcon}
                result={
                  <>
                    {Math.floor(
                      results.reduce((acc, result) => acc + result, 0) / 10
                    )}
                    ms
                  </>
                }
                heading="Average shooting time is"
                onClickSave={() => {}}
                onClickTryAgain={() => {
                  setResults([]);
                  setShowResultsScreen(false);
                  setGameStarted(false);
                  setStartTime(null);
                  setEndTime(null);
                }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AimTrainer;
