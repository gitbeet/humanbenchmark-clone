import GameGrid from "./components/GameGrid";
import HomeScreenGame from "./components/HomeScreenGame";

function App() {
  return (
    <div className="flex flex-col space-y-8 min-w-[100dvw] min-h-[100dvh]  md:bg-neutral-100">
      <div>{<HomeScreenGame />}</div>
      <GameGrid />
    </div>
  );
}

export default App;
