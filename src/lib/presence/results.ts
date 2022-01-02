import { user_data } from "osu-api-extended/dist/types/v2";
import { Data } from "../../types";
import { StringGameMode } from "../gamemode";
import { userManager } from "../user";
import { Client, Presence } from "discord-rpc";
import { getCurrentBeatmap } from "./playing";
import { getUserPresence } from "../userpresence";
import { multiManager } from "../multiplayer";

export async function setResultsPresence(
  client: Client,
  data: Data,
  gameMode: StringGameMode
) {
  let user: user_data | null = null;
  if (userManager.isRequested(gameMode)) {
    user = await userManager.getUser(data.gameplay.name, gameMode);
  }

  const beatmap = getCurrentBeatmap();

  let difficulty = data.menu.bm.stats.fullSR;
  let cover = "https://i.imgur.com/aNzdqQW.png";

  if (beatmap) {
    if (beatmap.difficulty_rating) difficulty = beatmap.difficulty_rating;
    if (beatmap.beatmapset) cover = beatmap.beatmapset.covers["list@2x"];
  }

  let accuracy = data.gameplay.accuracy;
  let combo = data.gameplay.combo.current;
  let missCount = data.gameplay.hits["0"];
  let pp = data.gameplay.pp.current;
  let ppFC = data.gameplay.pp.maxThisPlay;
  let sliderBreaks = data.gameplay.hits.sliderBreaks;

  if (multiManager.getState()) {
    const gameplayState = multiManager.getGameplayState();
    accuracy = gameplayState.accuracy;
    combo = gameplayState.combo;
    missCount = gameplayState.missCount;
    pp = gameplayState.pp;
    ppFC = gameplayState.ppFC;
    sliderBreaks = data.gameplay.hits.sliderBreaks;
  }

  let details = "";

  if (accuracy === 100) {
    details = "SS ";
  } else {
    details = `${accuracy.toFixed(2)}% `;

    if (
      ((pp === ppFC && sliderBreaks === 0) || combo === beatmap?.max_combo) &&
      missCount === 0
    ) {
      details += "FC ";
    } else {
      details += `${combo}`;

      if (beatmap?.max_combo) {
        details += `/${beatmap.max_combo}`;
      }

      details += "x";
    }
  }

  if (data.menu.mods.str !== "NM") {
    details += ` +${data.menu.mods.str}`;
  }

  details += ` (${pp}pp)`;

  let presence: Presence = {
    details,
    state: `▶ ${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title}`,
    largeImageKey: cover,
    largeImageText: `${data.menu.bm.metadata.difficulty}, ${difficulty}*`,
  };

  if (user) {
    presence = { ...presence, ...getUserPresence(user, gameMode) };
  } else presence.buttons = [];

  presence.buttons!.push({
    label: "View Beatmap",
    url: `https://osu.ppy.sh/beatmapsets/${data.menu.bm.set}#${gameMode}/${data.menu.bm.id}`,
  });

  await client.setActivity(presence);
}
