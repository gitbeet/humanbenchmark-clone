import GameItem from "./GameItem";
import {
  reactionTimeIcon,
  aimTrainerIcon,
  chimpTestIcon,
  numberMemoryIcon,
  sequenceMemoryIcon,
  typingIcon,
  verbalMemoryIcon,
  visualMemoryIcon,
} from "../assets/icons";
import { Link } from "react-router-dom";

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
    icon: visualMemoryIcon,
    newGame: false,
    gameId: "visualMemory",
  },
  {
    title: "Typing(not finished)",
    description: "How many words per minute can you type?",
    icon: typingIcon,
    newGame: false,
    gameId: "typing",
  },
];

const GameGrid = () => {
  return (
    <div className="">
      <div className="md:grid space-y-6 md:space-y-0 grid-cols-6  gap-6 w-[min(100%,1000px)] container-transparent">
        {gridItems.map((item, index) => (
          <Link
            to={`/test/${item.gameId.toLowerCase()}`}
            key={index}
            className={`group relative rounded-md  bg-white w-full flex flex-col justify-start items-center gap-6 py-8 px-8 cursor-pointer hover:-translate-y-3 hover:shadow-lg md:shadow-md md:hover:shadow-lg transition-position duration-300 ease-in-out ${
              item.gameId === "visualMemory" || item.gameId === "typing"
                ? "col-span-3"
                : "col-span-2"
            }`}
          >
            <GameItem
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
              newGame={item.newGame}
              gameId={item.gameId}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameGrid;
