import {
  beatmaps_short_2_object,
  user_data,
} from "osu-api-extended/dist/types/v2";
import { Data } from "../../types";
import { StringGameMode } from "../gamemode";
import { userManager } from "../user";
import { Client, Presence } from "discord-rpc";
import { getFlavor } from "../playingflavor";
import { v2 } from "osu-api-extended";
import { getUserPresence } from "../userpresence";
import { multiManager } from "../multiplayer";

let beatmap: beatmaps_short_2_object | undefined;
let beatmapRequested = true;

export async function setPlayingPresence(
  client: Client,
  data: Data,
  gameMode: StringGameMode
) {
  let user: user_data | null = null;
  if (userManager.isRequested(gameMode)) {
    user = await userManager.getUser(data.gameplay.name, gameMode);
  }

  let difficulty = data.menu.bm.stats.fullSR;
  let cover = "https://i.imgur.com/aNzdqQW.png";

  if (!beatmap || (beatmap.id !== data.menu.bm.id && !beatmapRequested)) {
    beatmapRequested = true;
    beatmap = await v2.beatmap.get(data.menu.bm.id);
    beatmapRequested = false;
  }

  if (beatmap) {
    if (beatmap.difficulty_rating) difficulty = beatmap.difficulty_rating;
    if (beatmap.beatmapset) cover = beatmap.beatmapset.covers["list@2x"];
  }

  const isMulti = multiManager.getState();
  let details = "";

  if (isMulti) {
    details = `Multiplayer`;
    multiManager.setGameplayState(
      data.gameplay.accuracy,
      data.gameplay.combo.max,
      data.gameplay.hits["0"],
      data.gameplay.pp.current,
      data.gameplay.pp.fc,
      data.gameplay.hits.sliderBreaks
    );
  } else details = `${getFlavor(gameMode)}`;

  if (data.menu.mods.str !== "NM") {
    details += ` +${data.menu.mods.str}`;
  }

  if (isMulti && data.gameplay.leaderboard.ourplayer.position > 0) {
    const position = data.gameplay.leaderboard.ourplayer.position.toString();

    let ordinal = "th";

    if (position.endsWith("1")) ordinal = "st";
    if (position.endsWith("2")) ordinal = "nd";
    if (position.endsWith("3")) ordinal = "rd";

    details += ` (${position}${ordinal} place)`;
  }

  let presence: Presence = {
    details,
    largeImageKey: cover,
    largeImageText: `${data.menu.bm.metadata.difficulty}, ${difficulty}*`,
    state: `▶ ${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title}`,
  };

  if (user) {
    presence = { ...presence, ...getUserPresence(user, gameMode) };
  } else presence.buttons = [];

  const acc = data.gameplay.accuracy.toFixed(2);
  const combo = data.gameplay.combo.current;
  const pp = data.gameplay.pp.current;

  presence.buttons!.push({
    label: `${acc}% ${combo}x (${pp}pp)`,
    url: `https://osu.ppy.sh/beatmapsets/${data.menu.bm.set}#${gameMode}/${data.menu.bm.id}`,
  });

  try {
    await client.setActivity(presence);
  } catch (e) {}
}

export function getCurrentBeatmap() {
  return beatmap;
}
