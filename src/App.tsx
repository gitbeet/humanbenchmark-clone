import NumberMemory from "./components/NumberMemory";
import ReactionTime from "./components/ReactionTime";
import AimTrainer from "./components/AimTrainer";
import ChimpTest from "./components/ChimpTest";
import VisualMemory from "./components/VisualMemory";

function App() {
  return (
    <div className="flex flex-col space-y-8">
      {/* <NumberMemory />
      <ReactionTime />
      <AimTrainer />
      <ChimpTest /> */}
      <VisualMemory />
    </div>
  );
}

export default App;
