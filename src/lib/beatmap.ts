import { Client } from "discord-rpc";
import { Menu } from "../types";

export async function setBeatmapPresence(
  client: Client,
  data: Menu,
  status: string
) {
  client.setActivity({
    details: status,
    buttons: [
      {
        label: "View Beatmap",
        url: `https://osu.ppy.sh/beatmapsets/${data.bm.set}#${
          ["osu", "taiko", "fruits", "mania"][data.gameMode]
        }/${data.bm.id}`,
      },
    ],
  });
}
