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
const GameScreen = () => {
  const params = useParams();
  const currentGame = params.gameName?.toLowerCase() || "reactiontime";
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
      <div className=" mx-auto container-transparent md:flex md:justify-between gap-8 ">
        <h2 className="w-full bg-white flex justify-center items-center rounded-md">
          stats
        </h2>
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
