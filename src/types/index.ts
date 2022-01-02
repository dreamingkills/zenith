import { NumericGameState } from "../lib/state";

export type GameMode = 0 | 1 | 2 | 3;
export type Time = {
  firstObj: number;
  current: number;
  full: number;
  mp3: number;
};

export type Beatmap = {
  time: Time;
  id: number;
  set: number;
  md5: string;
  rankedStatus: number;
  metadata: {
    artist: string;
    title: string;
    mapper: string;
    difficulty: string;
  };
  stats: {
    AR: number;
    CS: number;
    OD: number;
    HP: number;
    SR: number;
    BPM: { min: number; max: number };
    fullSR: number;
    memoryAR: number;
    memoryCS: number;
    memoryOD: number;
    memoryHP: number;
  };
  path: {
    full: string;
    folder: string;
    title: string;
    bg: string;
    audio: string;
  };
};

export type Mods = {
  num: number;
  str: string;
};

export type PP = {
  100: number;
  99: number;
  98: number;
  97: number;
  96: number;
  95: number;
  strains: number[];
};

export type Menu = {
  state: NumericGameState;
  skinFolder: string;
  gameMode: GameMode;
  isChatEnabled: boolean;
  bm: Beatmap;
  mods: Mods;
  pp: PP;
};

export type Combo = {
  current: number;
  max: number;
};
export type HP = { normal: number; smooth: number };
export type Grade = { current: string; maxThisPlay: string };
export type GameplayPP = { current: number; fc: number; maxThisPlay: number };
export type Hits = {
  300: number;
  200: number;
  geki: number;
  100: number;
  katu: number;
  50: number;
  0: number;
  sliderBreaks: number;
  grade: Grade;
  unstableRate: number;
  hitErrorArray: number[];
  pp: GameplayPP;
};

export type Player = {
  name: string;
  score: number;
  combo: number;
  maxCombo: number;
  mods: string;
  h300: number;
  h100: number;
  h50: number;
  h0: number;
  team: 0 | 1 | 2;
  position: number;
  isPassing: boolean;
};

export type Leaderboard = {
  hasLeaderboard: boolean;
  ourplayer: Player;
  slots: Player[];
};

export type Gameplay = {
  gameMode: GameMode;
  name: string;
  score: number;
  accuracy: number;
  combo: Combo;
  hp: HP;
  hits: Hits;
  pp: GameplayPP;
  leaderboard: Leaderboard;
  resultsScreen: any;
};

export type Data = { menu: Menu; gameplay: Gameplay };
