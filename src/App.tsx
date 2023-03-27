import NumberMemory from "./components/NumberMemory";
import ReactionTime from "./components/ReactionTime";
import AimTrainer from "./components/AimTrainer";
import ChimpTest from "./components/ChimpTest";
import VisualMemory from "./components/VisualMemory";
import SequenceMemory from "./components/SequenceMemory";
import VerbalMemory from "./components/VerbalMemory";
import TypingSpeed from "./components/TypingSpeed";

function App() {
  return (
    <div className="flex flex-col space-y-8">
      {/* <NumberMemory />
      <ReactionTime />
      <AimTrainer />
      <ChimpTest />
      <VisualMemory />
      <SequenceMemory /> */}
      {/* <VerbalMemory /> */}
      <TypingSpeed />
    </div>
  );
}

export default App;
