import { _decorator, Component, Node, Vec3, Camera, tween, Vec2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CameraHandler")
export class CameraHandler extends Component {
  @property public followSpeed: number = 5;
  private posOffset: Vec3 = new Vec3(0, 11.5, 15.5);
  private rotOffset: Vec3 = new Vec3(-30, 0, 0);

  private tempVec3: Vec3 = new Vec3();
  protected start(): void {
    this.node.setRotationFromEuler(this.rotOffset);
  }

  public smoothFollow(target: Node): void {
    if (!target) return;

    Vec3.add(this.tempVec3, target.worldPosition, this.posOffset);
    this.node.setPosition(this.tempVec3);
  }
}
