export interface GameResultInterface {
  typing: number[];
  reactionTime: number[];
  sequenceMemory: number[];
  aimTrainer: number[];
  numberMemory: number[];
  verbalMemory: number[];
  chimpTest: number[];
  visualMemory: number[];
}

export interface GameDescriptionInterface {
  typing: JSX.Element;
  reactiontime: JSX.Element;
  sequencememory: JSX.Element;
  aimtrainer: JSX.Element;
  numbermemory: JSX.Element;
  verbalmemory: JSX.Element;
  chimptest: JSX.Element;
  visualmemory: JSX.Element;
}

export interface ResultData {
  game: string;
  result: number;
}
