import { v2 } from "osu-api-extended";
import { user_data } from "osu-api-extended/dist/types/v2";
import { StringGameMode } from "./gamemode";

class UserManager {
  private user: { [key in StringGameMode]: user_data | undefined | null } = {
    osu: undefined,
    taiko: undefined,
    mania: undefined,
    fruits: undefined,
  };

  public async getUser(
    username: string,
    gameMode: StringGameMode
  ): Promise<user_data | null> {
    if (this.user[gameMode]) return this.user[gameMode] as user_data;
    if (this.user[gameMode] === null) return null;

    this.user[gameMode] = null;
    try {
      const user = await v2.user.get(username, gameMode, "username");
      this.user[gameMode] = user;
    } catch (e) {
      this.user[gameMode] = null;
    }

    return this.user[gameMode] as user_data | null;
  }

  public isRequested(gameMode: StringGameMode) {
    if (this.user[gameMode] !== undefined) return true;
    return false;
  }
}

export const userManager = new UserManager();
