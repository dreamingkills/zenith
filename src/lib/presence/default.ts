import { user_data } from "osu-api-extended/dist/types/v2";
import { Data } from "../../types";
import { StringGameMode } from "../gamemode";
import { userManager } from "../user";
import { Client, Presence } from "discord-rpc";
import { getUserPresence } from "../userpresence";

let songProgress: number | undefined;

export async function setDefaultPresence(
  client: Client,
  data: Data,
  gameMode: StringGameMode,
  details: string
) {
  const isPlaying = songProgress !== data.menu.bm.time.current;

  songProgress = data.menu.bm.time.current;

  let user: user_data | null = null;
  if (userManager.isRequested(gameMode)) {
    user = await userManager.getUser(data.gameplay.name, gameMode);
  }

  let presence: Presence = {
    details,
    largeImageKey: "https://i.imgur.com/aNzdqQW.png",
  };

  if (isPlaying || data.menu.state === 1) {
    presence.state = `▶ ${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title}`;
  }

  if (user) {
    presence = { ...presence, ...getUserPresence(user, gameMode) };
  }

  await client.setActivity(presence);
}
