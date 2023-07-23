import { initialResults } from "../features/results/resultsSlice";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../utilities/hooks";
import { updateResults } from "../features/results/resultsSlice";
import {
  aimTrainerIcon,
  chimpTestIcon,
  numberMemoryIcon,
  reactionTimeIcon,
  sequenceMemoryIcon,
  typingIcon,
  verbalMemoryIcon,
  visualMemoryIcon,
} from "../assets/icons";

const icons = [
  aimTrainerIcon,
  chimpTestIcon,
  numberMemoryIcon,
  reactionTimeIcon,
  sequenceMemoryIcon,
  typingIcon,
  verbalMemoryIcon,
  visualMemoryIcon,
];
const Dashboard = () => {
  const { results } = useAppSelector((state) => state.results);
  const { user } = useAppSelector((state) => state.user);
  // const results: any = user ? userResults : initialResults;
  return (
    <div className="bg-neutral-100 w-full min-h-[100dvh] p-8">
      <div className="flex gap-6">
        <div className="bg-white flex flex-col items-center rounded-md py-4">
          {icons.map((icon) => (
            <div className="text-neutral-blue">{icon}</div>
          ))}
        </div>
        <div className="w-full  space-y-6">
          {/* USER INFO SECTION */}
          <div className="bg-white p-8 rounded-md shadow-md space-y-4">
            <div className="">
              <p className="text-xl opacity-50">Username</p>
              <p className="text-4xl font-bold">
                {user ? user.email : "Guest user"}
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
          <div className="bg-white p-8 rounded-md shadow-md space-y-4">
            <table className="w-full ">
              <tbody>
                <tr>
                  <th>Test</th>
                  <th>Actions</th>
                  <th>Score</th>
                  <th>Percentile</th>
                </tr>
                {Object.entries(results)
                  // .sort((a: string, b: string) => a[0] > b[0])
                  .map((res: any, index) => (
                    <tr key={index}>
                      <td className=" text-center">{res[0]}</td>
                      <td className=" text-center">actions...</td>
                      <td className=" text-center">
                        {(
                          res[1].reduce(
                            (acc: number, x: number) => acc + x,
                            0
                          ) /
                          (res[1].length | 1)
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
