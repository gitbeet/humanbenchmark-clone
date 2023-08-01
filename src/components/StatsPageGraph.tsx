import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAppSelector } from "../utilities/hooks";
import { GameResultInterface, GlobalResults, SingleResult } from "../models";
import { namesData } from "./Dashboard";
import roundToNearestProduct from "../utilities/roundToNearestProduct";
import initialGlobalResults from "../utilities/initialGlobalResults";
interface Props {
  gameName: string;
}

const StatsPageGraph = ({ gameName }: Props) => {
  const { results, globalResults } = useAppSelector((state) => state.results);
  const { user } = useAppSelector((state) => state.user);
  const currentGameResults =
    results?.[gameName as keyof GameResultInterface] || [];
  const game = namesData[gameName].name;
  const rountToNumber =
    gameName === "reactiontime"
      ? 25
      : gameName === "aimtrainer"
      ? 50
      : gameName === "verbalmemory"
      ? 10
      : 1;
  const userChartResults = currentGameResults.map((res) =>
    roundToNearestProduct(res, rountToNumber)
  );
  let userChartData: [string | number, number][] = Object.entries(
    initialGlobalResults.find((res) => res.game === gameName)?.result || []
  ).map((res) => [res[0], (res[1] = 0)]);
  userChartResults.forEach((res) => {
    const ind = userChartData.findIndex((data) => Number(data[0]) === res);
    if (ind < 0) return;
    userChartData[ind][1] = userChartData[ind][1] + 1;
  });
  const globalChartData = Object.entries(
    globalResults.find((res) => res.game === gameName)?.result || []
  );

  const userMax = Math.max(...userChartData.map((res) => res[1]));
  const globalMax = Math.max(...globalChartData.map((res) => res[1]));

  const scale = globalMax / userMax;

  userChartData = [...userChartData].map((res) => [res[0], res[1] * scale]);
  //   ChartJS
  const data = {
    labels: ["", ""],
    datasets: [
      {
        label: user?.displayName || "Guest user",
        data: userChartData,
        borderColor: "#2b87d1",
        tension: 0.3,
      },
      {
        label: "Average users",
        data: globalChartData,
        borderColor: "rgba(43, 135, 209, 0.4)",
        tension: 0.3,
      },
    ],
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend
  );

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          display: false, // Set this to false to remove y-axis numbers (ticks)
        },
      },
      x: {
        min: "0", // Set this to true to remove empty space before zero
      },
    },
  };
  return (
    <div className="bg-white md:p-8 space-y-4 rounded-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default StatsPageGraph;
