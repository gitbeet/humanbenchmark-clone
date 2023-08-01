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
interface Props {
  game: string;
}

const Statistics = ({ game }: Props) => {
  const { globalResults, isLoading } = useAppSelector((state) => state.results);
  if (isLoading || globalResults.length < 1) return <h1>Loading...</h1>;
  const chartData = Object.entries(
    globalResults.filter((resData: any) => resData.game === game)[0].result
  );
  const data = {
    labels: chartData.map((data) => data[0]),
    datasets: [
      {
        label: "",
        data: chartData.map((data) => data[1]),
        borderColor: "#2b87d1",
        tension: 0.3,
      },
    ],
  };
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const options = {
    responsive: true,
    scales: {
      y: {
        display: false, // Set this to false to remove y-axis numbers (ticks)
      },
    },
  };
  return (
    <h2 className="w-full h-fit p-4 bg-white flex flex-col gap-8 justify-center items-center rounded-md">
      <h1 className="self-start text-3xl">Statistics</h1>
      <Line data={data} options={options} />
    </h2>
  );
};

export default Statistics;
