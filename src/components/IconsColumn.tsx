import React from "react";
import {
  aimTrainerIcon,
  chimpTestIcon,
  numberMemoryIcon,
  reactionTimeIcon,
  sequenceMemoryIcon,
  typingIcon,
  verbalMemoryIcon,
  visualMemoryIcon,
} from "../assets/icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
interface IconsDataInterface {
  [key: string]: JSX.Element;
}

const iconsData: IconsDataInterface = {
  aimtrainer: aimTrainerIcon,
  chimptest: chimpTestIcon,
  numbermemory: numberMemoryIcon,
  reactiontime: reactionTimeIcon,
  sequencememory: sequenceMemoryIcon,
  typing: typingIcon,
  verbalmemory: verbalMemoryIcon,
  visualmemory: visualMemoryIcon,
};

const IconsColumn = () => {
  return (
    <div className="hidden md:flex md:flex-col md:items-center  bg-white  rounded-md py-4">
      {Object.entries(iconsData).map(
        (icon: [string, JSX.Element], index: number) => (
          <div
            key={index}
            className="text-light-blue opacity-50 hover:opacity-100  hover:text-orange transition-[opacity,colors] duration-50 ease-in-out scale-50"
          >
            <Link to={`/dashboard/${icon[0]}`}> {icon[1]}</Link>
          </div>
        )
      )}
    </div>
  );
};

export default IconsColumn;
