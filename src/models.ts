export interface GameResultInterface {
  typing: number[];
  reactiontime: number[];
  sequencememory: number[];
  aimtrainer: number[];
  numbermemory: number[];
  verbalnemory: number[];
  chimptest: number[];
  visualmemory: number[];
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

export interface SingleResult {
  [key: number]: number;
}

export interface GlobalResults {
  game: string;
  result: SingleResult;
}
