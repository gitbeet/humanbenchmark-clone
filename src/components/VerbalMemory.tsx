import React, { useEffect, useState } from "react";

const VerbalMemory = () => {
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
    setShowResultsScreen(false);
    setTriesLeft(3);
    setWordList([]);
    fetchSingleWord();
  };

  return (
    <div>
      {!showResultsScreen ? (
        <div>
          <h1>Verbal memory</h1>
          <h2>Streak: {streak}</h2>
          <h2>Tries left: {triesLeft}</h2>
          <h2>Current word : {currentWord}</h2>
          <button onClick={fetchWord}>Fetch a word</button>
          <button onClick={() => checkWord("new")}>New</button>
          <button onClick={() => checkWord("seen")}>Seen</button>
          <ul>
            {wordList.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Game over</h2>
          <h2>Streak: {streak}</h2>

          <button onClick={restartGame}>Try again</button>
        </div>
      )}
    </div>
  );
};

export default VerbalMemory;
