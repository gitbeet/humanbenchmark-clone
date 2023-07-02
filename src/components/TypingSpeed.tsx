import React, { useEffect, useRef, useState } from "react";

const initialText =
  "Far from the truth, profound dollars show us how iraqs can be proses. We can assume that any instance of a scanner can be construed as a later softdrink. Those trees are nothing more than lows. A textbook of the january is assumed to be a schmalzy maid.";

const TypingSpeed = () => {
  const [text, setText] = useState<string[]>(initialText.split(""));
  const [userInput, setUserInput] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <div className="game-window bg-blue text-white">
      <div>
        <h1 className="text-7xl text-center">
          {!gameStarted ? "Typing Test" : "92"}
        </h1>
        <h1 className="text-3xl ">How many words per minute can you type?</h1>
      </div>
      <div
        onClick={() => {
          inputRef.current?.focus();
          inputRef.current?.setSelectionRange(text.length, text.length);
        }}
        className="flex flex-col w-[800px] h-[200px] p-4 bg-neutral-100 items-center rounded-lg relative "
      >
        <div className="relative z-10 w-full h-full  pointer-events-none ">
          <div className="absolute z-[101] w-full  bg-[rgba(255,255,255,0)]  flex flex-wrap ">
            {text.map((letter) => (
              <p className={`text-neutral-900 w-fit h-fit`}>
                {letter === " " ? "\u00A0" : letter}
              </p>
            ))}
          </div>
          <div className="absolute z-[100]      bg-[rgba(255,255,255,0)] flex flex-wrap items-start justify-start">
            {userInput.map((letter, index) => (
              <p
                className={`${
                  letter === text[index] ? "bg-green" : " bg-red"
                } text-[rgba(255,255,255,0)] w-fit h-fit`}
              >
                {letter === " " ? "\u00A0" : letter}
              </p>
            ))}
          </div>
        </div>
        <textarea
          autoFocus
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={inputRef}
          value={userInput.join("")}
          onChange={(e) => {
            if (!gameStarted) {
              setGameStarted(true);
            }
            setUserInput(e.target.value.split(""));
          }}
          className={`pointer-events-none caret-[rgb(255,34,34)] opacity-100 bg-[rgba(255,255,255,0)] text-[rgba(255,255,255,0    )]  absolute top-0 rounded-lg z-[200] w-full focus:outline-none h-full p-4`}
        />
      </div>
      <p>{!gameStarted ? "Start typing to begin." : "1:32"}</p>
    </div>
  );
};

export default TypingSpeed;
