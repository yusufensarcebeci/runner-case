import { GameState } from "../enums/GameState";


export class GameStateManager {
  private static currentState: GameState = GameState.LOADING;
  private static subscribers: Function[] = [];

  static getCurrentState(): GameState {
    return this.currentState;
  }

  static setCurrentState(state: GameState) {
    GameStateManager.currentState = state;
    GameStateManager.notifySubscribers(state);
  }

  static subscribe(callback: Function) {
    GameStateManager.subscribers.push(callback);
  }

  private static notifySubscribers(state: GameState) {
    for (const subscriber of GameStateManager.subscribers) {
      subscriber(state);
    }
  }
}
