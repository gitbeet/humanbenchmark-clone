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

// TODO : - 1 object instead of 2
interface IconsDataInterface {
  [key: string]: JSX.Element;
}

interface NamesDataInterface {
  [key: string]: string;
}

const namesData: NamesDataInterface = {
  aimTrainer: "Aim Trainer",
  chimpTest: "Chimp Test",
  numberMemory: "Number Memory",
  reactionTime: "Reaction Time",
  sequenceMemory: "Sequence Memory",
  typing: "Typing",
  verbalMemory: "Verbal Memory",
  visualMemory: "Visual Memory",
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
  return (
    <div className="bg-neutral-100 container-transparent min-h-[100dvh]">
      <div className="flex gap-6">
        <div className="bg-white flex flex-col items-center rounded-md py-4">
          {Object.entries(iconsData).map((icon: [string, JSX.Element]) => (
            <div className="text-light-blue opacity-50 hover:opacity-100  hover:text-orange transition-[opacity,colors] duration-50 ease-in-out scale-50">
              <Link to={`/test/${icon[0]}`}> {icon[1]}</Link>
            </div>
          ))}
        </div>
        <div className="w-full  space-y-6">
          {/* USER INFO SECTION */}
          <div className="bg-white p-8 rounded-md shadow-md space-y-4">
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
              <p className="text-xl font-semibold">TODO : 3 hours ago</p>
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
          <div className="bg-white p-12 rounded-md shadow-md space-y-4">
            <table className="w-full">
              <tbody>
                <tr className="text-lg">
                  <th className="pb-8">Test</th>
                  <th className="pb-8">Actions</th>
                  <th className="pb-8">Score</th>
                  <th className="pb-8">Percentile</th>
                </tr>
                {Object.entries(results || {})
                  .sort()
                  .map((res: any, index) => (
                    <tr key={index}>
                      <td className="text-center text-lg py-2">
                        {namesData[res[0] as keyof NamesDataInterface]}
                      </td>
                      <td className=" text-center flex gap-4 justify-center items-center">
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
