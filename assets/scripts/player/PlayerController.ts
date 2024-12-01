import { _decorator, Component, tween, Vec3 } from "cc";
import { SwipeDetector } from "../managers/SwipeDetector";
import { SwipeType } from "../enums/SwipeType";
import { GameStateManager } from "../managers/GameStateManager";
import { GameState } from "../enums/GameState";

const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  private lanes: number[] = [-3, 0, 3];
  private currentLane: number = 0;
  private moveSpeed: number = 0.3;
  private jumpDuration: number = 0.5;
  private jumpHeight: number = 3;
  private isJumping: boolean = false;
  private isMoving: boolean = false;
  start() {
    SwipeDetector.getInstance();
    SwipeDetector.subscribe(this.onSwipe.bind(this));
  }

  onSwipe(swipeType: SwipeType) {
    if (GameStateManager.getCurrentState() !== GameState.GAME_RUNNING) return;
    switch (swipeType) {
      case SwipeType.RIGHT:
        this.movePlayer(1);
        break;
      case SwipeType.LEFT:
        this.movePlayer(-1);
        break;
      case SwipeType.UP:
        this.jump();
        break;
    }
  }

  private movePlayer(direction: number): void {
    if (
      this.isMoving ||
      this.currentLane + direction < 0 ||
      this.currentLane + direction >= this.lanes.length
    )
      return;

    this.isMoving = true;
    let self = this;
    const targetX = this.lanes[this.currentLane + direction];

    tween(this.node.position)
      .to(
        this.moveSpeed,
        { x: targetX },
        {
          onUpdate(target: Vec3) {
            self.node.setPosition(
              target.x,
              self.node.position.y,
              self.node.position.z
            );
          },
          onComplete() {
            self.currentLane += direction;
            self.isMoving = false;
          },
        }
      )
      .start();
  }

  private jump(): void {
    if (this.isJumping) return;

    this.isJumping = true;
    let self = this;

    const startY = this.node.position.y;
    const jumpUp = startY + this.jumpHeight;
    const jumpDown = startY;

    tween(this.node.position)
      .to(
        this.jumpDuration / 2,
        { y: jumpUp },
        {
          onUpdate(target: Vec3) {
            self.node.setPosition(
              self.node.position.x,
              target.y,
              self.node.position.z
            );
          },
        }
      )
      .to(
        this.jumpDuration / 2,
        { y: jumpDown },
        {
          onUpdate(target: Vec3) {
            self.node.setPosition(
              self.node.position.x,
              target.y,
              self.node.position.z
            );
          },
          onComplete() {
            self.isJumping = false;
          },
        }
      )
      .start();
  }

  //   private movePlayer(direction: number): void {
  //     const targetLane = this.currentLane + direction;

  //     // Hedef alan sınırları kontrol ediliyor.
  //     if (targetLane < 0 || targetLane >= this.lanes.length) return;

  //     this.currentLane = targetLane;
  //     const targetX = this.lanes[targetLane];
  //     const targetPosition = new Vec3(targetX, this.node.position.y, this.node.position.z);

  //     // X ekseni hareketi
  //     tween(this.node)
  //       .to(this.moveSpeed, { position: targetPosition }, { easing: "smooth" })
  //       .start();
  //   }

  //   private jump(): void {
  //     if (this.isJumping) return;
  //     this.isJumping = true;

  //     const currentPosition = this.node.position.clone();
  //     const jumpUp = new Vec3(currentPosition.x, this.jumpHeight, currentPosition.z);
  //     const jumpDown = new Vec3(currentPosition.x, 0, currentPosition.z);

  //     // Y ekseni hareketi
  //     tween(this.node)
  //       .to(this.jumpDuration / 2, { position: jumpUp }, { easing: "quadOut" })
  //       .to(this.jumpDuration / 2, { position: jumpDown }, { easing: "quadIn" })
  //       .call(() => {
  //         this.isJumping = false;
  //       })
  //       .start();
  //   }
}
