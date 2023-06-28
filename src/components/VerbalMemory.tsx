import React, { useEffect, useState } from "react";
import Button from "./Button";
import WelcomeScreen from "./WelcomeScreen";
import { verbalMemoryIcon } from "../assets/icons";
import ResultsScreen from "./ResultsScreen";

const VerbalMemory = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordList, setWordList] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string>("");
  const [triesLeft, setTriesLeft] = useState<number>(3);
  const [streak, setStreak] = useState<number>(1);
  const [showResultsScreen, setShowResultsScreen] = useState<boolean>(false);
  const fetchWord = async () => {
    const res = await fetch("https://random-word-api.herokuapp.com/word");
    const result: string = await res.json();
    setWordList((prev) => [...prev, result]);
  };

  //on load fetch new word
  const fetchSingleWord = async () => {
    const res = await fetch("https://random-word-api.herokuapp.com/word");
    const result: string = await res.json();
    // setWordList([result]);
    setCurrentWord(result);
  };
  useEffect(() => {
    fetchSingleWord();
  }, []);

  useEffect(() => {
    if (triesLeft > 0) return;
    setShowResultsScreen(true);
  }, [triesLeft]);

  const getWord = async () => {
    const res = await fetch("https://random-word-api.herokuapp.com/word");
    const result: string = await res.json();
    return result;
  };

  const getNewCurrentWord = async () => {
    const num = Math.random();
    if (num < 0.5 || wordList.length === 0) {
      const word = await getWord();
      return word;
    } else {
      return wordList[Math.floor(Math.random() * wordList.length)];
    }
  };

  const checkWord = async (condition: string) => {
    //check current word
    //use random number to determine if u get a word from the list or fetch a new word
    //set new word
    let wordStatus =
      wordList.findIndex((word) => word === currentWord) === -1
        ? "new"
        : "seen";
    if (wordStatus === condition) {
      setStreak((prev) => prev + 1);
    } else {
      setTriesLeft((prev) => (prev > 1 ? prev - 1 : 0));
    }
    setWordList((prev) => {
      return prev.findIndex((word) => word === currentWord) === -1
        ? [...prev, currentWord]
        : prev;
    });
    const newWord = await getNewCurrentWord();
    setCurrentWord(newWord);
  };

  const restartGame = () => {
    setGameStarted(false);
    setShowResultsScreen(false);
    setTriesLeft(3);
    setStreak(0);
    setWordList([]);
    fetchSingleWord();
  };

  return (
    <div className="game-window bg-blue text-white">
      {!gameStarted ? (
        <WelcomeScreen
          logo={verbalMemoryIcon}
          heading="Verbal Memory Test"
          description="You will be shown words, one at a time. If you've seen a word during the test, click SEEN If it's a new word, click NEW"
          button={
            <Button
              text="Start"
              color="yellow"
              onClick={() => setGameStarted(true)}
            />
          }
        />
      ) : !showResultsScreen ? (
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex gap-12">
            <h2 className="text-2xl">
              <span className="opacity-75">Lives |</span> {triesLeft}
            </h2>
            <h2 className="text-2xl">
              <span className="opacity-75">Score |</span> {streak}
            </h2>
          </div>
          <h2 className="text-5xl">{currentWord}</h2>
          <div className="flex gap-8">
            <Button
              text={<p className="font-bold">SEEN</p>}
              color="yellow"
              onClick={() => checkWord("seen")}
            />
            <Button
              text={<p className="font-bold">NEW</p>}
              color="yellow"
              onClick={() => checkWord("new")}
            />
          </div>
        </div>
      ) : (
        <ResultsScreen
          logo={verbalMemoryIcon}
          heading="Verbal Memory"
          result={
            <p>
              {streak} word{streak > 1 || streak < 1 ? "s" : ""}
            </p>
          }
          onClickSave={() => {}}
          onClickTryAgain={restartGame}
        />
      )}
    </div>
  );
};

export default VerbalMemory;
