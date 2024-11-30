import { _decorator, Component, Node } from "cc";
import { GameStateManager } from "../managers/GameStateManager";
import { GameState } from "../enums/GameState";
import { GameScreenType } from "../enums/GameScreenType";
const { ccclass, property } = _decorator;

@ccclass("ScreenManager")
export class ScreenManager extends Component {
  @property({ type: Node })
  loadingScreen: Node = null;

  @property({ type: Node })
  initialScreen: Node = null;

  @property({ type: Node })
  gameScreen: Node = null;

  @property({ type: Node })
  gameEndScreen: Node = null;

  private screens: Record<GameScreenType, Node>;

  onLoad() {
    this.screens = {
      [GameScreenType.LOADING_SCREEN]: this.loadingScreen,
      [GameScreenType.INITIAL_SCREEN]: this.initialScreen,
      [GameScreenType.GAME_SCREEN]: this.gameScreen,
      [GameScreenType.GAME_END_SCREEN]: this.gameEndScreen,
    };

    GameStateManager.subscribe(this.updateScreens.bind(this));
    GameStateManager.setCurrentState(GameState.LOADING);

  }

  private updateScreens(state: GameState): void {
    switch (state) {
      case GameState.LOADING:
        this.showScreen(GameScreenType.LOADING_SCREEN);
        break;
      case GameState.INITIAL:
        this.showScreen(GameScreenType.INITIAL_SCREEN);
        break;
      case GameState.GAME_RUNNING:
        this.showScreen(GameScreenType.GAME_SCREEN);
        break;
      case GameState.GAME_PAUSED:
        // Show Pause Screen
        break;
      case GameState.GAME_OVER:
        this.showScreen(GameScreenType.GAME_END_SCREEN);
        break;
      default:
        console.warn("Unknown game state");
    }
  }

  private showScreen(screenType: GameScreenType): void {
    for (const screenKey in this.screens) {
      this.screens[screenKey as GameScreenType].active = false;
    }

    const screen = this.screens[screenType];
    if (screen) {
      screen.active = true;
    } else {
      console.warn(`Screen of type ${screenType} not found!`);
    }
  }
}
