import { _decorator, Component, Node } from "cc";
import { GameState, GameStateManager } from "./GameStateManager";
import { GameScreenType, ScreenManager } from "./ScreenManager";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  @property({ type: ScreenManager })
  screenManager: ScreenManager = null;
  onLoad() {
    GameStateManager.subscribe(this.onGameStateChanged.bind(this));
  }

  protected start(): void {
    this.scheduleOnce(() => {
      this.loadComplete();
    }, 2);
  }
  private loadComplete() {
    GameStateManager.setCurrentState(GameState.INITIAL);
  }

  private onGameStateChanged(state: GameState): void {
    switch (state) {
      case GameState.LOADING:
        this.gameInitialized();
        break;
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

  private gameInitialized(): void {
    console.log("Game Initializing");
  }

  private startGame(): void {
    console.log("Game Started!");
  }

  private pauseGame(): void {
    console.log("Game Paused");
  }

  private endGame(): void {
    console.log("Game Over");
  }
}
