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

// TODO : - 1 interface with name icon and everything we need
interface IconsDataInterface {
  [key: string]: JSX.Element;
}

interface NamesDataInterface {
  [key: string]: string;
}

const namesData: NamesDataInterface = {
  aimtrainer: "Aim Trainer",
  chimptest: "Chimp Test",
  numbermemory: "Number Memory",
  reactiontime: "Reaction Time",
  sequencememory: "Sequence Memory",
  typing: "Typing(not finished)",
  verbalmemory: "Verbal Memory",
  visualmemory: "Visual Memory",
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
  const { results } = useAppSelector((state) => state.results);
  const { user } = useAppSelector((state) => state.user);
  const [createdAt, setCreatedAt] = useState("");
  useEffect(() => {
    if (!user?.metadata.creationTime) return;
    setCreatedAt(calculateTimeElapsed(user.metadata.creationTime));
  }, [user]);
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
            <div>
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
                  .map((res: any, index) => (
                    <tr key={index}>
                      <td className="text-center text-lg py-2">
                        {namesData[res[0] as keyof NamesDataInterface]}
                      </td>
                      <td className=" text-center flex flex-col md:flex-row gap-4 justify-center items-center">
                        <IconLink
                          text="Play"
                          icon={playButtonIcon}
                          link={`../test/${res[0].toString().toLowerCase()}`}
                        />
                        <IconLink text="Stats" icon={statsIcon} link={`#`} />
                      </td>
                      <td className="text-center">
                        {(
                          res[1].reduce(
                            (acc: number, x: number) => acc + x,
                            0
                          ) / (res[1].length || 1)
                        ).toFixed(1)}
                      </td>
                      <td className=" text-center">percentile</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
