import { GlobalResults } from "../models";
import roundToNearestProduct from "./roundToNearestProduct";

const returnGameData = (
  gameName: string,
  resultsArray: number[],
  globalResults: GlobalResults[]
) => {
  const result = parseFloat(
    (resultsArray.length > 5
      ? [...resultsArray]
          .splice(-5)
          .reduce((acc: number, x: number) => acc + x, 0) /
        (resultsArray.length || 1)
      : resultsArray.reduce((acc: number, x: number) => acc + x, 0) /
        (resultsArray.length || 1)
    ).toFixed(1)
  );
  const globalResultsCurrentGame = Object.entries(
    globalResults.filter((result) => result.game === gameName)[0].result
  );

  const percentileResult =
    gameName === "aimtrainer"
      ? roundToNearestProduct(result, 50)
      : gameName === "reactiontime"
      ? roundToNearestProduct(result, 25)
      : gameName === "verbalmemory"
      ? roundToNearestProduct(result, 10)
      : roundToNearestProduct(result, 1);
  const totalResults = globalResultsCurrentGame.reduce(
    (acc, x) => acc + x[1],
    0
  );
  const sameResultAsMe = globalResultsCurrentGame
    .filter((res) => parseInt(res[0]) === percentileResult)
    .reduce((acc, x) => acc + x[1], 0);

  const resultIndex = globalResultsCurrentGame.findIndex(
    (res) => parseInt(res[0]) === percentileResult
  );
  const rightSide = [...globalResultsCurrentGame]
    .splice(resultIndex)
    .filter((res) => parseInt(res[0]) !== percentileResult);
  const rightSideResultsNumber = rightSide.reduce((acc, x) => acc + x[1], 0);
  let percentile: number | string;
  if (resultsArray.length < 1) {
    percentile = "?";
  } else {
    percentile = parseFloat(
      (
        100 -
        ((sameResultAsMe / 2 + rightSideResultsNumber) / totalResults) * 100
      ).toFixed(1)
    );
  }

  return {
    result,
    percentile,
  };
};

export default returnGameData;
