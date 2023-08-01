import React from "react";
import { useAppSelector } from "../utilities/hooks";
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
import { GameResultInterface } from "../models";

interface Props {
  gameName: string;
}

const StatsPageGraphRecent = ({ gameName }: Props) => {
  const { results } = useAppSelector((state) => state.results);
  let currentGameResults: any[] =
    results?.[gameName as keyof GameResultInterface] || [];

  currentGameResults = [...currentGameResults].map((res, index) => [
    index.toString(),
    res,
  ]);
  console.log(currentGameResults);
  const data = {
    labels: [],
    datasets: [
      {
        label:
          gameName === "reactiontime" || gameName === "aimtrainer"
            ? "Time"
            : gameName === "typing"
            ? "WPM"
            : gameName === "verbalmemory" || gameName === "chimptest"
            ? "Points"
            : gameName === "numbermemory"
            ? "Digits"
            : "Level",
        data: currentGameResults,
        borderColor: "#2b87d1",
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
    scales: {},
  };

  return (
    <div className="bg-white md:p-8 space-y-4 rounded-md">
      <Line data={data} options={options} />
    </div>
  );
};

export default StatsPageGraphRecent;
