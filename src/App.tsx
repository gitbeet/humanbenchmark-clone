import NumberMemory from "./components/NumberMemory";
import ReactionTime from "./components/ReactionTime";
import AimTrainer from "./components/AimTrainer";
import ChimpTest from "./components/ChimpTest";
import VisualMemory from "./components/VisualMemory";
import SequenceMemory from "./components/SequenceMemory";
import VerbalMemory from "./components/VerbalMemory";
import TypingSpeed from "./components/TypingSpeed";
import GameGrid from "./components/GameGrid";
import { useState } from "react";

function App() {
  const [currentGame, setCurrentGame] = useState<
    | "typing"
    | "reactionTime"
    | "sequenceMemory"
    | "aimTrainer"
    | "numberMemory"
    | "verbalMemory"
    | "chimpTest"
    | "visualMemory"
    | null
  >(null);
  const displayedGame =
    currentGame === "aimTrainer" ? (
      <AimTrainer />
    ) : currentGame === "chimpTest" ? (
      <ChimpTest />
    ) : currentGame === "numberMemory" ? (
      <NumberMemory />
    ) : currentGame === "reactionTime" ? (
      <ReactionTime />
    ) : currentGame === "sequenceMemory" ? (
      <SequenceMemory />
    ) : currentGame === "typing" ? (
      <TypingSpeed />
    ) : currentGame === "verbalMemory" ? (
      <VerbalMemory />
    ) : currentGame === "visualMemory" ? (
      <VisualMemory />
    ) : (
      <TypingSpeed />
    );
  return (
    <div className="flex flex-col space-y-8 min-w-[100dvw] min-h-[100dvh]  bg-neutral-100">
      {/* <NumberMemory /> */}
      {/* <ReactionTime /> */}
      {/* <AimTrainer /> */}
      {/* <ChimpTest /> */}
      {/* <VisualMemory /> */}
      {/* <SequenceMemory /> */}
      {/* <VerbalMemory /> */}
      {/* <TypingSpeed /> */}
      <div>{displayedGame}</div>
      <GameGrid setCurrentGame={setCurrentGame} />
    </div>
  );
}

export default App;
