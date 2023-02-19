import NumberMemory from "./components/NumberMemory";
import ReactionTime from "./components/ReactionTime";

function App() {
  return (
    <div className="flex flex-col space-y-16">
      <NumberMemory />
      <ReactionTime />
    </div>
  );
}

export default App;
