import { _decorator, Component, tween, Vec3, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerController")
export class PlayerController extends Component {
  private moveDistance: number = 2; // Karakterin hareket mesafesi
  private jumpHeight: number = 2; // Zıplama yüksekliği
  private moveSpeed: number = 0.25;

  public moveRight(): void {
    const currentPosition = this.node.position;
    const targetPosition = new Vec3(
      currentPosition.x + this.moveDistance,
      currentPosition.y,
      currentPosition.z
    );

    tween(this.node)
      .to(this.moveSpeed, { position: targetPosition }, { easing: "sineOut" })
      .start();
  }

  public moveLeft(): void {
    const currentPosition = this.node.position;
    const targetPosition = new Vec3(
      currentPosition.x - this.moveDistance,
      currentPosition.y,
      currentPosition.z
    );

    tween(this.node)
      .to(this.moveSpeed, { position: targetPosition }, { easing: "sineOut" })
      .start();
  }

  public jump(): void {
    const currentPosition = this.node.position;

    // Zıplama animasyonu
    const upPosition = new Vec3(
      currentPosition.x,
      currentPosition.y + this.jumpHeight,
      currentPosition.z
    );

    const downPosition = new Vec3(
      currentPosition.x,
      currentPosition.y,
      currentPosition.z
    );

    tween(this.node)
      .sequence(
        tween().to(0.3, { position: upPosition }, { easing: "quadOut" }),
        tween().to(0.3, { position: downPosition }, { easing: "quadIn" })
      )
      .start();
  }
}
