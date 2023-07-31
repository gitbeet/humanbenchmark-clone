import { Link } from "react-router-dom";
import { useAppSelector } from "../utilities/hooks";
import {
  aimTrainerIcon,
  chimpTestIcon,
  numberMemoryIcon,
  playButtonIcon,
  reactionTimeIcon,
  sequenceMemoryIcon,
  statsIcon,
  typingIcon,
  verbalMemoryIcon,
  visualMemoryIcon,
} from "../assets/icons";
import IconLink from "./IconLink";
import { calculateTimeElapsed } from "../utilities/timeLapsed";
import { useEffect, useState } from "react";
import roundToNearestProduct from "../utilities/roundToNearestProduct";
import { GlobalResults } from "../models";

// TODO : - 1 interface with name icon and everything we need
interface IconsDataInterface {
  [key: string]: JSX.Element;
}

interface GameInfoInterface {
  [key: string]: GameInfoElement;
}

interface GameInfoElement {
  name: string;
  measurement: string;
}

const namesData: GameInfoInterface = {
  aimtrainer: { name: "Aim Trainer", measurement: "ms" },
  chimptest: { name: "Chimp Test", measurement: "points" },
  numbermemory: { name: "Number Memory", measurement: "digits" },
  reactiontime: { name: "Reaction Time", measurement: "ms" },
  sequencememory: { name: "Sequence Memory", measurement: "points" },
  typing: { name: "Typing(not finished)", measurement: "WPM" },
  verbalmemory: { name: "Verbal Memory", measurement: "points" },
  visualmemory: { name: "Visual Memory", measurement: "points" },
};

const iconsData: IconsDataInterface = {
  aimtrainer: aimTrainerIcon,
  chimptest: chimpTestIcon,
  numbermemory: numberMemoryIcon,
  reactiontime: reactionTimeIcon,
  sequencememory: sequenceMemoryIcon,
  typing: typingIcon,
  verbalmemory: verbalMemoryIcon,
  visualmemory: visualMemoryIcon,
};

const Dashboard = () => {
  const { results, globalResults, isLoading } = useAppSelector(
    (state) => state.results
  );
  const { user } = useAppSelector((state) => state.user);
  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    if (!user?.metadata.creationTime) return;
    setCreatedAt(calculateTimeElapsed(user.metadata.creationTime));
  }, [user]);

  if (isLoading || globalResults.length < 1) return <h1>Loading...</h1>;
  return (
    <div className="md:bg-neutral-100 container-transparent min-h-[100dvh]">
      <div className="flex items-stretch gap-6">
        <div className="hidden md:flex md:flex-col md:items-center  bg-white  rounded-md py-4">
          {Object.entries(iconsData).map((icon: [string, JSX.Element]) => (
            <div className="text-light-blue opacity-50 hover:opacity-100  hover:text-orange transition-[opacity,colors] duration-50 ease-in-out scale-50">
              <Link to={`/test/${icon[0]}`}> {icon[1]}</Link>
            </div>
          ))}
        </div>
        <div className="w-full space-y-12 md:space-y-6">
          {/* USER INFO SECTION */}
          <div className="bg-white md:p-6  container-menu space-y-4">
            <div className="">
              <p className="text-xl opacity-50">Username</p>
              <p className="text-4xl font-bold">
                {user && user.displayName
                  ? user.displayName
                  : user && user.email
                  ? user.email
                  : "Guest user"}
              </p>
            </div>
            <div className={user ? `block` : "hidden"}>
              <p className="opacity-50 text-xl">Joined</p>
              <p className="text-xl font-semibold">{createdAt}</p>
            </div>
            {!user && (
              <p className="text-xl">
                <Link className="text-blue" to="/login">
                  Log in
                </Link>{" "}
                or{" "}
                <Link className="text-blue" to="/login">
                  sign up
                </Link>{" "}
                to save your results
              </p>
            )}
          </div>
          {/* RESULTS SECTION */}
          <div className="bg-white md:p-12 container-menu space-y-4">
            <table className="w-full">
              <tbody>
                <tr className="text-lg hidden md:table-row">
                  <th className=" pb-8">Test</th>
                  <th className=" pb-8">Actions</th>
                  <th className=" pb-8">Score</th>
                  <th className=" pb-8">Percentile</th>
                </tr>
                {Object.entries(results || {})
                  .sort()
                  .map((res: any, index) => {
                    const result = parseFloat(
                      // .splice() to get the last 5 results as in the original website
                      (res[1].length > 5
                        ? [...res[1]]
                            .splice(-5)
                            .reduce((acc: number, x: number) => acc + x, 0) /
                          (res[1].length || 1)
                        : res[1].reduce(
                            (acc: number, x: number) => acc + x,
                            0
                          ) / (res[1].length || 1)
                      ).toFixed(1)
                    );
                    const gameLink = `../test/${res[0]
                      .toString()
                      .toLowerCase()}`;
                    const gameName = namesData[res[0]].name;
                    const gameMeasurement = namesData[res[0]].measurement;
                    // array with the results for the mapped game
                    const globalResultsCurrentGame = Object.entries(
                      globalResults.filter(
                        (result) => result.game === res[0]
                      )[0].result
                    );
                    // accounting  for the aim and reaction time games modification of the result
                    const percentileResult =
                      res[0] === "aimtrainer"
                        ? roundToNearestProduct(result, 50)
                        : res[0] === "reactiontime"
                        ? roundToNearestProduct(result, 25)
                        : res[0] === "verbalmemory"
                        ? roundToNearestProduct(result, 10)
                        : roundToNearestProduct(result, 1);
                    const totalResults = globalResultsCurrentGame.reduce(
                      (acc, x) => acc + x[1],
                      0
                    );
                    const sameResultAsMe = globalResultsCurrentGame
                      .filter((res) => parseInt(res[0]) === percentileResult)
                      .reduce((acc, x) => acc + x[1], 0);

                    // index of the global  result array where we cut left and right
                    const resultIndex = globalResultsCurrentGame.findIndex(
                      (res) => parseInt(res[0]) === percentileResult
                    );
                    const rightSide = [...globalResultsCurrentGame]
                      .splice(resultIndex)
                      .filter((res) => parseInt(res[0]) !== percentileResult);
                    const rightSideResultsNumber = rightSide.reduce(
                      (acc, x) => acc + x[1],
                      0
                    );
                    // display "?" if we haven't played the game yet
                    let percentile: number | string;
                    if (res[1].length < 1) {
                      percentile = "?";
                    } else {
                      // we pass half of the results that are same as ours to the left and half to the right
                      percentile = parseFloat(
                        (
                          100 -
                          ((sameResultAsMe / 2 + rightSideResultsNumber) /
                            totalResults) *
                            100
                        ).toFixed(1)
                      );
                    }
                    return (
                      <tr key={index}>
                        <td className="text-center text-lg py-2">{gameName}</td>
                        <td className=" text-center flex flex-col md:flex-row gap-4 justify-center items-center">
                          <IconLink
                            text="Play"
                            icon={playButtonIcon}
                            link={gameLink}
                          />
                          <IconLink text="Stats" icon={statsIcon} link={`#`} />
                        </td>
                        <td className="text-center">
                          {res[1].length < 1 ? "?" : result}{" "}
                          {res[1].length < 1 ? "" : gameMeasurement}
                        </td>
                        <td className=" text-center">{percentile}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
