import { _decorator, Component, Node } from "cc";
import { GameState, GameStateManager } from "./GameStateManager";
import { GameScreenType, ScreenManager } from "./ScreenManager";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property({ type: ScreenManager })
  screenManager: ScreenManager = null;
  onLoad() {
    // GameStateManager.subscribe(this.onGameStateChanged.bind(this));
  }

  protected start(): void {
    // this.scheduleOnce(() => {
    //   this.screenManager.showScreen(GameScreenType.INITIAL_SCREEN);
    // }, 2);
  }

  private onGameStateChanged(state: GameState): void {
    switch (state) {
      case GameState.GAME_RUNNING:
        this.startGame();
        break;
      case GameState.GAME_PAUSED:
        this.pauseGame();
        break;
      case GameState.GAME_OVER:
        this.endGame();
        break;
    }
  }

  private startGame(): void {
    console.log("Game Started");
  }

  private pauseGame(): void {
    console.log("Game Paused");
  }

  private endGame(): void {
    console.log("Game Over");
  }
}
