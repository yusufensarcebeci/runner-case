import { _decorator, Component, Node, Vec3 } from "cc";
import { GameState, GameStateManager } from "./GameStateManager";
const { ccclass, property } = _decorator;

@ccclass("UIManager")
export class UIManager extends Component {
  @property(Node) loadNode: Node = null;

  public onStartButtonClick(): void {
    GameStateManager.setCurrentState(GameState.GAME_RUNNING);
  }

  public onPauseButtonClick(): void {
    GameStateManager.setCurrentState(GameState.GAME_PAUSED);
  }

  public onContinueButtonClick(): void {
    GameStateManager.setCurrentState(GameState.GAME_RUNNING);
  }

  public onRestartButtonClick(): void {}

  public onHomeButtonClick(): void {}

  protected update(dt: number): void {
    if (GameStateManager.getCurrentState() !== GameState.LOADING) return;
    if (!this.loadNode) return;

    const currentRotation = this.loadNode.eulerAngles;
    const newRotationZ = currentRotation.z + (-200 * dt);
    this.loadNode.setRotationFromEuler(
      new Vec3(currentRotation.x, currentRotation.y, newRotationZ)
    );
  }
}
