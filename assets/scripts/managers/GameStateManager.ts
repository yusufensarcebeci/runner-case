export enum GameState {
    LOADING = "LOADING",
    INIT = "INIT",
    GAME_RUNNING = "GAME_RUNNING",
    GAME_OVER = "GAME_OVER",
  }
  
  export class GameStateManager {
    private static currentState: GameState = GameState.INIT;
  
    static getCurrentState(): GameState {
      return this.currentState;
    }
  
    static setCurrentState(state: GameState): void {
      this.currentState = state;
      console.log(`Game State Updated: ${state}`);
    }
  }