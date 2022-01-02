export function resolveGameMode(number: 0 | 1 | 2 | 3): StringGameMode {
  return ["osu", "taiko", "fruits", "mania"][number] as StringGameMode;
}

export function resolveFullGameMode(gameMode: StringGameMode): FullGameMode {
  switch (gameMode) {
    case "osu": {
      return "osu!";
    }
    case "taiko": {
      return "osu!taiko";
    }
    case "fruits": {
      return "osu!catch";
    }
    case "mania": {
      return "osu!mania";
    }
  }
}

export type StringGameMode = "osu" | "taiko" | "fruits" | "mania";
export type FullGameMode = "osu!" | "osu!taiko" | "osu!catch" | "osu!mania";
