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
import IconsColumn from "./IconsColumn";

// TODO : - 1 interface with name icon and everything we need

interface GameInfoInterface {
  [key: string]: GameInfoElement;
}

interface GameInfoElement {
  name: string;
  measurement: string;
}

export const namesData: GameInfoInterface = {
  aimtrainer: { name: "Aim Trainer", measurement: "ms" },
  chimptest: { name: "Chimp Test", measurement: "points" },
  numbermemory: { name: "Number Memory", measurement: "digits" },
  reactiontime: { name: "Reaction Time", measurement: "ms" },
  sequencememory: { name: "Sequence Memory", measurement: "points" },
  typing: { name: "Typing(not finished)", measurement: "WPM" },
  verbalmemory: { name: "Verbal Memory", measurement: "points" },
  visualmemory: { name: "Visual Memory", measurement: "points" },
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
      <div className="flex justify-center items-stretch gap-4 ">
        <IconsColumn />
        <div className="w-full space-y-4 md:space-y-4">
          {/* USER INFO SECTION */}
          <div className="bg-white px-4 md:p-8 space-y-4 rounded-md ">
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
                <Link
                  className="text-blue"
                  to="/login"
                >
                  Log in
                </Link>{" "}
                or{" "}
                <Link
                  className="text-blue"
                  to="/login"
                >
                  sign up
                </Link>{" "}
                to save your results
              </p>
            )}
          </div>
          {/* RESULTS SECTION */}
          <div className="bg-white md:p-8 space-y-4 rounded-md">
            <table className="w-full">
              <tbody>
                <tr className="text-xl text-left hidden md:table-row">
                  <th className="font-normal pb-8">Test</th>
                  <th className="font-normal pb-8">Actions</th>
                  <th className="font-normal pb-8">Score</th>
                  <th className="font-normal pb-8">Percentile</th>
                </tr>
                {/* TODO: -type res */}
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
                    const isEven = index % 2 === 0;
                    return (
                      <>
                        <tr
                          key={index}
                          className={`${
                            isEven ? "" : "bg-neutral-50"
                          } hidden md:table-row `}
                        >
                          <td className="px-2 py-3 text-left text-xl font-bold ">
                            {gameName}
                          </td>
                          <td className="md:flex md:flex-row gap-4 justify-center items-center py-3">
                            <IconLink
                              text="Play"
                              icon={playButtonIcon}
                              link={gameLink}
                            />
                            <IconLink
                              text="Stats"
                              icon={statsIcon}
                              link={`/dashboard/${res[0]}`}
                            />
                          </td>
                          <td className="text-left">
                            <span className="text-3xl font-bold">
                              {res[1].length < 1 ? "?" : result}{" "}
                            </span>
                            <span className="">
                              {res[1].length < 1 ? "" : gameMeasurement}
                            </span>
                          </td>
                          <td className="text-center py-1">
                            <div
                              className={`bg-neutral-200  ${
                                typeof percentile === "number" &&
                                percentile > 50
                                  ? "text-neutral-50"
                                  : "text-neutral-900"
                              } font-semibold text-lg rounded-sm`}
                            >
                              <div
                                style={{
                                  width: `${
                                    typeof percentile === "number"
                                      ? percentile
                                      : 0
                                  }%`,
                                }}
                                className="bg-blue flex items-center  h-full py-1 "
                              >
                                <p className="pl-2">
                                  {typeof percentile === "number"
                                    ? `${percentile}%`
                                    : "?"}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        {/* MOBILE ROW */}
                        <tr className="grid grid-cols-2 items-end md:hidden px-4 py-2">
                          <td className="w-full">
                            <p className="text-left text-xl font-bold ">
                              {gameName}
                            </p>
                            <div className="md:flex md:flex-row gap-4 justify-center items-center">
                              <IconLink
                                text="Play"
                                icon={playButtonIcon}
                                link={gameLink}
                              />
                              <IconLink
                                text="Stats"
                                icon={statsIcon}
                                link={`/dashboard/${res[0]}`}
                              />
                            </div>
                          </td>
                          <td className={`flex flex-col`}>
                            <div className="text-left">
                              <span className="text-3xl font-bold">
                                {res[1].length < 1 ? "?" : result}{" "}
                              </span>
                              <span className="">
                                {res[1].length < 1 ? "" : gameMeasurement}
                              </span>
                            </div>
                            {/* percentile graph */}
                            <div className="text-center py-1">
                              <div
                                className={`w-full h-10 bg-neutral-200 ${
                                  typeof percentile === "number" &&
                                  percentile > 50
                                    ? "text-neutral-50"
                                    : "text-neutral-900"
                                } font-semibold text-lg rounded-sm`}
                              >
                                {/* blue  */}
                                <div
                                  style={{
                                    width: `${
                                      typeof percentile === "number"
                                        ? percentile
                                        : 0
                                    }%`,
                                  }}
                                  className="bg-blue h-full py-1 flex items-center"
                                >
                                  <p className="pl-2">
                                    {typeof percentile === "number"
                                      ? `${percentile}%`
                                      : "?"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
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
