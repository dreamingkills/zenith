import { Presence } from "discord-rpc";
import { user_data } from "osu-api-extended/dist/types/v2";
import { resolveFullGameMode, StringGameMode } from "./gamemode";

export function getUserPresence(
  user: user_data,
  gameMode: StringGameMode
): Presence {
  const presence: Presence = {};

  const rank = user.rankHistory.data[user.rankHistory.data.length - 1];
  presence.smallImageKey = `https://a.ppy.sh/${user.id}?1640769389.jpeg`;
  presence.smallImageText = `${
    user.username
  } (#${rank.toLocaleString()}) \nplaying ${resolveFullGameMode(gameMode)}`;
  presence.buttons = [
    {
      label: "View Profile",
      url: `https://osu.ppy.sh/users/${user.id}/${gameMode}`,
    },
  ];

  return presence;
}
