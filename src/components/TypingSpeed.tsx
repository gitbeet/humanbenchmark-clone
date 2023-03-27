import React, { useEffect, useState } from "react";

const initialText =
  "Far from the truth, profound dollars show us how iraqs can be proses. We can assume that any instance of a scanner can be construed as a later softdrink. Those trees are nothing more than lows. A textbook of the january is assumed to be a schmalzy maid. ";

const TypingSpeed = () => {
  const [text, setText] = useState<string[]>(initialText.split(""));
  const [userInput, setUserInput] = useState<string[]>([]);
  return (
    <div>
      <h1>Typing speed test</h1>
      <p>{userInput.length}</p>
      <div className="relative">
        <div>
          <textarea
            value={text.join("")}
            className="absolute z-20 w-[800px] h-[200px] bg-transparent placeholder:text-black border-2"
          />
          <div className="absolute w-[800px] h-[200px] placeholder:text-black border-2">
            {userInput.map((letter, index) => (
              <span
                className={`${
                  letter === text[index] ? "bg-green-500" : " bg-red-400"
                } text-transparent w-fit`}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        </div>
        <div className="relative">
          <textarea
            value={userInput.join("")}
            onChange={(e) => setUserInput(e.target.value.split(""))}
            className="absolute z-40 w-[800px] h-[200px] bg-transparent text-transparent placeholder:text-black border-2"
          />
        </div>
      </div>
    </div>
  );
};

export default TypingSpeed;
