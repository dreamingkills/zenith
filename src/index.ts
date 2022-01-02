require("dotenv").config();
import rws from "reconnecting-websocket";
import ws from "ws";
import rpc from "discord-rpc";
import { getGameState, isLastState, setLastState } from "./lib/state";
import { Data } from "./types";
import { v2 } from "osu-api-extended";
import { resolveGameMode } from "./lib/gamemode";
import { userManager } from "./lib/user";
import { setDefaultPresence } from "./lib/presence/default";
import { setBeatmapSelectPresence } from "./lib/presence/beatmapselect";
import { setPlayingPresence } from "./lib/presence/playing";
import { setResultsPresence } from "./lib/presence/results";
import { setMultiPresence } from "./lib/presence/multi";
import { multiManager } from "./lib/multiplayer";

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET)
  throw new Error(
    "You must specify a Client ID and Client Secret in .env to use Zenith!"
  );

const client = new rpc.Client({ transport: "ipc" });
let updating = false;

client.once("ready", async () => {
  d("rpc client ready");

  await v2.login(
    parseInt(process.env.CLIENT_ID!, 10),
    process.env.CLIENT_SECRET!
  );

  updating = true;
});

client.login({ clientId: "925886271291785257" });

const socket = new rws("ws://127.0.0.1:24050/ws", [], {
  WebSocket: ws,
  connectionTimeout: 1000,
  maxRetries: 10,
});

socket.onopen = async () => {
  d("gosumemory socket opened");
};

let gameState: number | undefined;
let updateDebounce: number = 0;

socket.onmessage = async (event) => {
  if (!updating) return;
  if (updateDebounce >= Date.now() - 4000) return;

  updateDebounce = Date.now();
  const data = JSON.parse(event.data) as Data;

  const gameMode = resolveGameMode(data.menu.gameMode);
  if (
    data.gameplay.name &&
    !userManager.isRequested(gameMode) &&
    data.gameplay.name !== "osu!"
  ) {
    d(`attempting to request user ${data.gameplay.name}...`);
    const user = await userManager.getUser(data.gameplay.name, gameMode);

    if (!user) {
      d(`failed to find user ${data.gameplay.name} for ${gameMode} on bancho!`);
    } else {
      d(`requested user ${user.username} (id ${user.id}) for mode ${gameMode}`);
    }
  }

  if (gameState === undefined) {
    console.log("we're listening!");
  }

  gameState = data.menu.state;
  const state = getGameState(data.menu.state);

  if (state === "MainMenu") {
    await setDefaultPresence(client, data, gameMode, "Main Menu");
  }

  if (state === "EditingMap") {
    await setDefaultPresence(client, data, gameMode, "Mapping");
  }

  if (state === "Playing") {
    await setPlayingPresence(client, data, gameMode);
  } else if (state === "SongSelect") {
    await setBeatmapSelectPresence(
      client,
      data,
      gameMode,
      "Selecting a map..."
    );
  } else if (state === "SongSelectEdit") {
    await setBeatmapSelectPresence(
      client,
      data,
      gameMode,
      "Selecting a map to edit..."
    );
  }

  if (state === "GameShutdownAnimation") {
    await client.clearActivity();
  }

  if (
    (state === "ResultsScreen" && !isLastState("ResultsScreen")) ||
    state === "MultiplayerResultsScreen" ||
    state === "RankingTagCoop" ||
    state === "RankingTeam"
  ) {
    await setResultsPresence(client, data, gameMode);
  }

  if (state === "MultiplayerRooms") {
    multiManager.setMultiplayer(false);
    await setDefaultPresence(
      client,
      data,
      gameMode,
      "Browsing multiplayer rooms"
    );
  }

  if (state === "MultiplayerRoom" || state === "MultiplayerSongSelect") {
    multiManager.setMultiplayer(true);
    await setMultiPresence(client, data, gameMode);
  }

  if (state === "OsuDirect" && !isLastState("OsuDirect")) {
    await setDefaultPresence(client, data, gameMode, "Browing osu!direct");
  }

  if (state === "ProcessingBeatmaps") {
    await setDefaultPresence(client, data, gameMode, "Processing beatmaps...");
  }

  switch (gameState) {
    // no idea what this is
    case 6: {
      await client.setActivity({ details: "WIP_NoIdeaWhatThisIs" });
      break;
    }
    // as far as i can tell this actually never appears
    // when starting up, the game uses the "GameShutdownAnimation" state instead
    case 10: {
      await client.setActivity({ details: "GameStartupAnimation" });
      break;
    }
    /* both of the following are used in the results screen for those multi modes
       we can add them in later
    case 17: {
      await client.setActivity({ details: "RankingTagCoop" });
      break;
    }
    case 18: {
      await client.setActivity({ details: "RankingTeam" });
      break;
    }*/
    // no idea what this is either
    case 22: {
      await client.setActivity({ details: "Tourney" });
      break;
    }
    case -2: {
      await client.setActivity({ details: "Unknown" });
      break;
    }
  }

  setLastState(state);
};

function d(s: string) {
  if (process.env.DEBUG) console.log(`[debug] ${s}`);
}

// gosumemory states: https://github.com/Piotrekol/ProcessMemoryDataFinder/blob/99e2014447f6d5e5ba3943076bc8210b6498db5c/OsuMemoryDataProvider/OsuMemoryStatus.cs#L3
