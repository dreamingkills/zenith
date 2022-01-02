let lastState: StringGameState;

export function setLastState(state: StringGameState) {
  lastState = state;
}

export function isLastState(state: StringGameState) {
  return lastState === state;
}

export function getGameState(gameState: NumericGameState): StringGameState {
  return states[gameState];
}

const states: { [key in NumericGameState]: StringGameState } = {
  [-1]: "NotRunning",
  0: "MainMenu",
  1: "EditingMap",
  2: "Playing",
  3: "GameShutdownAnimation",
  4: "SongSelectEdit",
  5: "SongSelect",
  6: "WIP",
  7: "ResultsScreen",
  10: "GameStartupAnimation",
  11: "MultiplayerRooms",
  12: "MultiplayerRoom",
  13: "MultiplayerSongSelect",
  14: "MultiplayerResultsScreen",
  15: "OsuDirect",
  17: "RankingTagCoop",
  18: "RankingTeam",
  19: "ProcessingBeatmaps",
  22: "Tourney",
  [-2]: "Unknown",
};

export type NumericGameState =
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 17
  | 18
  | 19
  | 22
  | -2;

type StringGameState =
  | "NotRunning"
  | "MainMenu"
  | "EditingMap"
  | "Playing"
  | "GameShutdownAnimation"
  | "SongSelectEdit"
  | "SongSelect"
  | "WIP"
  | "ResultsScreen"
  | "GameStartupAnimation"
  | "MultiplayerRooms"
  | "MultiplayerRoom"
  | "MultiplayerSongSelect"
  | "MultiplayerResultsScreen"
  | "OsuDirect"
  | "RankingTagCoop"
  | "RankingTeam"
  | "ProcessingBeatmaps"
  | "Tourney"
  | "Unknown";
