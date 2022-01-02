import { StringGameMode } from "./gamemode";

export function getFlavor(gameMode: StringGameMode) {
  return {
    osu: "Clicking circles",
    mania: "Smashing keys",
    fruits: "Catching fruits",
    taiko: "Bashing drums",
  }[gameMode];
}
