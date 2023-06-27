import React from "react";
import GameItem from "./GameItem";
import {
  reactionTimeIcon,
  aimTrainerIcon,
  chimpTestIcon,
  numberMemoryIcon,
  sequenceMemoryIcon,
  typingIcon,
  verbalMemoryIcon,
  visualMemoryItem,
} from "../assets/icons";

interface gridItemsInterface {
  title: string;
  description: string;
  icon: any;
  newGame: boolean;
  gameId:
    | "typing"
    | "reactionTime"
    | "sequenceMemory"
    | "aimTrainer"
    | "numberMemory"
    | "verbalMemory"
    | "chimpTest"
    | "visualMemory";
}

const gridItems: gridItemsInterface[] = [
  {
    title: "Reaction Time",
    description: "Test your visual reflexes.",
    icon: reactionTimeIcon,
    newGame: false,
    gameId: "reactionTime",
  },
  {
    title: "Sequence Memory",
    description: "Remember an increasingly long pattern of button presses.",
    icon: sequenceMemoryIcon,
    newGame: true,
    gameId: "sequenceMemory",
  },
  {
    title: "Aim Trainer",
    description: "How quickly can you hit all the targets?",
    icon: aimTrainerIcon,
    newGame: true,
    gameId: "aimTrainer",
  },
  {
    title: "Number Memory",
    description: "Remember the longest number you can.",
    icon: numberMemoryIcon,
    newGame: false,
    gameId: "numberMemory",
  },
  {
    title: "Verbal Memory",
    description: "Keep as many words in short term memory as possible.",
    icon: verbalMemoryIcon,
    newGame: false,
    gameId: "verbalMemory",
  },
  {
    title: "Chimp Test",
    description: "Are you smarter than a chimpanzee?",
    icon: chimpTestIcon,
    newGame: false,
    gameId: "chimpTest",
  },
  {
    title: "Visual Memory",
    description: "Remember an increasingly large board of squares.",
    icon: visualMemoryItem,
    newGame: false,
    gameId: "visualMemory",
  },
  {
    title: "Typing",
    description: "How many words per minute can you type?",
    icon: typingIcon,
    newGame: false,
    gameId: "typing",
  },
];

interface Props {
  setCurrentGame: React.Dispatch<
    React.SetStateAction<
      | "typing"
      | "reactionTime"
      | "sequenceMemory"
      | "aimTrainer"
      | "numberMemory"
      | "verbalMemory"
      | "chimpTest"
      | "visualMemory"
      | null
    >
  >;
}
const GameGrid = ({ setCurrentGame }: Props) => {
  return (
    <div className="container-mine">
      <div className="md:grid grid-cols-3 gap-6 w-[min(100%,1000px)] p-12 wrapper">
        {gridItems.map((item) => (
          <GameItem
            setCurrentGame={setCurrentGame}
            title={item.title}
            description={item.description}
            icon={item.icon}
            newGame={item.newGame}
            gameId={item.gameId}
          />
        ))}
      </div>
    </div>
  );
};

export default GameGrid;