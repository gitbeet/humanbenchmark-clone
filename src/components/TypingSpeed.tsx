import React, { useEffect, useRef, useState } from "react";

const initialText =
  "Far from the truth, profound dollars show us how iraqs can be proses. We can assume that any instance of a scanner can be construed as a later softdrink. Those trees are nothing more than lows. A textbook of the january is assumed to be a schmalzy maid.";

const TypingSpeed = () => {
  const [text, setText] = useState<string[]>(initialText.split(""));
  const [userInput, setUserInput] = useState<string[]>([]);
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  return (
    <div className="game-window bg-blue flex flex-col items-center justify-center">
      <h1>Typing speed test</h1>
      <p>{userInput.length}</p>
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 w-[800px] pointer-events-none ">
          <div className="absolute z-[101] w-full  bg-[rgba(255,255,255,0)]  flex flex-wrap ">
            {text.map((letter) => (
              <p className={`text-neutral-900 w-fit h-fit`}>
                {letter === " " ? "\u00A0" : letter}
              </p>
            ))}
          </div>
          <div className="absolute z-[100]     bg-[rgba(255,255,255,0)] bg-orange flex flex-wrap items-start justify-start">
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
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          ref={inputRef}
          value={userInput.join("")}
          onChange={(e) => setUserInput(e.target.value.split(""))}
          className={`pointer-events-none caret-[rgb(255,34,34)] opacity-100 bg-[rgba(255,255,255,0)] text-[rgba(255,255,255,0)]  absolute z-[200] w-full focus:outline-none h-[200px] `}
        />
        <div
          onClick={() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(text.length, text.length);
          }}
          className={`${
            focused ? "opacity-100" : "opacity-50"
          } absolute w-[800px] h-[200px] bg-neutral-blue border border-dark-blue`}
        ></div>
      </div>
    </div>
  );
};

export default TypingSpeed;
