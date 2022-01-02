class MultiManager {
  private isMultiplayer = false;
  private accuracy: number = 0;
  private combo: number = 0;
  private missCount: number = 0;
  private pp: number = 0;
  private ppFC: number = 0;
  private sliderBreaks: number = 0;

  setMultiplayer(state: boolean) {
    this.isMultiplayer = state;
  }

  getState() {
    return this.isMultiplayer;
  }

  setGameplayState(
    acc: number,
    combo: number,
    missCount: number,
    pp: number,
    ppFC: number,
    sliderBreaks: number
  ) {
    this.accuracy = acc;
    this.combo = combo;
    this.missCount = missCount;
    this.pp = pp;
    this.ppFC = ppFC;
    this.sliderBreaks = sliderBreaks;
  }

  getGameplayState() {
    return {
      accuracy: this.accuracy,
      combo: this.combo,
      missCount: this.missCount,
      pp: this.pp,
      ppFC: this.ppFC,
      sliderBreaks: this.sliderBreaks,
    };
  }
}

export const multiManager = new MultiManager();
