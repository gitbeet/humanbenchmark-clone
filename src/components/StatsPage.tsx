import { Link, useParams } from "react-router-dom";
import IconsColumn from "./IconsColumn";
import { useAppSelector } from "../utilities/hooks";
import { namesData } from "./Dashboard";
import { GameResultInterface } from "../models";
import returnGameData from "../utilities/returnGameData";
import IconLink from "./IconLink";
import { playButtonIcon } from "../assets/icons";
import StatsPageGraph from "./StatsPageGraph";
import NotFound from "./NotFound";

const StatsPage = () => {
  const params = useParams();
  const path = params.gameNameStats;
  const { user } = useAppSelector((state) => state.user);
  const { results, globalResults } = useAppSelector((state) => state.results);
  const currentGameResultsArray =
    results?.[path as keyof GameResultInterface] || [];
  const currentGameResults = parseFloat(
    // .splice() to get the last 5 results as in the original website
    (currentGameResultsArray.length > 5
      ? [...currentGameResultsArray]
          .splice(-5)
          .reduce((acc: number, x: number) => acc + x, 0) /
        (currentGameResultsArray.length || 1)
      : currentGameResultsArray.reduce((acc: number, x: number) => acc + x, 0) /
        (currentGameResultsArray.length || 1)
    ).toFixed(1)
  );

  if (!path) return <h1>loading...</h1>;
  if (!namesData[path]) return <NotFound />;
  const gameName = namesData[path].name;
  const { percentile, result } = returnGameData(
    path,
    currentGameResultsArray,
    globalResults
  );
  const gameMeasurement = namesData[path].measurement;
  return (
    <div className="md:bg-neutral-100 container-transparent min-h-[100dvh]">
      <div className="flex justify-center items-stretch gap-4 ">
        {/* LEFT SIDE ICONS */}
        <IconsColumn />
        {/* RIGHT SIDE */}
        <div className="w-full space-y-4 md:space-y-4">
          {/* USER INFO SECTION */}
          <div className="bg-white md:p-8 space-y-4 rounded-md text-3xl ">
            <Link to="/dashboard" className=" font-semibold text-light-blue">
              {user ? user.displayName : "Guest user"}
            </Link>
            <span className="ml-2">&gt; {gameName}</span>
            {!user ? (
              <div className="text-lg">
                <Link className="text-light-blue" to="/../login">
                  Log in
                </Link>
                <span>
                  {" "}
                  or{" "}
                  <Link className="text-light-blue" to="/../register">
                    Sign up
                  </Link>{" "}
                  to save your results
                </span>
              </div>
            ) : null}
          </div>
          {/* GAME INFO SECTION */}
          <div className="bg-white md:p-8 space-y-4 rounded-md text-center">
            <p className="text-3xl">{gameName}</p>
            <div>
              <p className="text-8xl font-semibold">
                {currentGameResultsArray.length > 0 ? result : "?"}
              </p>
              <p className="text-xl ">{gameMeasurement}</p>
            </div>
            <p className="text-xl font-semibold">
              {percentile === "?" ? "0.0" : percentile}% percentile
            </p>
            <IconLink
              icon={playButtonIcon}
              link={`../../test/${path}`}
              text="Play"
            />
          </div>
          <StatsPageGraph gameName={path} />
          <div className="bg-white md:p-8 space-y-4 rounded-md">
            recent graph
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
