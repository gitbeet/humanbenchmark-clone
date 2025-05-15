import { useParams } from "react-router-dom";
import AimTrainer from "./AimTrainer";
import ChimpTest from "./ChimpTest";
import NumberMemory from "./NumberMemory";
import ReactionTime from "./ReactionTime";
import SequenceMemory from "./SequenceMemory";
import TypingSpeed from "./TypingSpeed";
import VerbalMemory from "./VerbalMemory";
import VisualMemory from "./VisualMemory";
import GameDescription from "./GameDescription";
import { gameDescriptions } from "../utilities/gameDescriptions";
import { GameDescriptionInterface } from "../models";
import Statistics from "./Statistics";
import NotFound from "./NotFound";
import { namesData } from "./Dashboard";
const GameScreen = () => {
  const { gameName } = useParams();
  if (!gameName) return <h1>Loading...</h1>;
  if (!namesData[gameName]) return <NotFound />;
  const currentGame = gameName?.toLowerCase() || "reactiontime";
  const displayedGame =
    currentGame === "aimtrainer" ? (
      <AimTrainer />
    ) : currentGame === "chimptest" ? (
      <ChimpTest />
    ) : currentGame === "numbermemory" ? (
      <NumberMemory />
    ) : currentGame === "reactiontime" ? (
      <ReactionTime />
    ) : currentGame === "sequencememory" ? (
      <SequenceMemory />
    ) : currentGame === "typing" ? (
      <TypingSpeed />
    ) : currentGame === "verbalmemory" ? (
      <VerbalMemory />
    ) : currentGame === "visualmemory" ? (
      <VisualMemory />
    ) : (
      <ReactionTime />
    );
  return (
    <div className="flex flex-col gap-16">
      {displayedGame}
      <div className="container-transparent flex flex-col md:flex-row gap-8">
        <Statistics game={currentGame} />
        <GameDescription
          description={
            gameDescriptions[currentGame as keyof GameDescriptionInterface]
          }
        />
      </div>
    </div>
  );
};

export default GameScreen;
