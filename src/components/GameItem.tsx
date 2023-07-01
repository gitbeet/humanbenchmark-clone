import React from "react";

interface Props {
  icon: JSX.Element;
  title: string;
  description: string;
  newGame: boolean;
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

const GameItem = ({
  icon,
  title,
  description,
  newGame,
  setCurrentGame,
  gameId,
}: Props) => {
  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="text-neutral-blue group-hover:text-orange">{icon}</div>
        <h3 className="font-bold text-2xl w-full text-center">{title}</h3>
      </div>
      <p className="text-lg  text-center">{description}</p>
      {newGame ? (
        <div className="absolute top-0 left-full -translate-x-[calc(100%-5px)] -translate-y-[5px] bg-red text-white text-lg px-2 py-1 rounded-lg">
          New
        </div>
      ) : null}
    </>
  );
};

export default GameItem;
