import {
  _decorator,
  Color,
  Component,
  Node,
  Sprite,
  tween,
  Tween,
  UIOpacity,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("TweenManager")
export class TweenManager extends Component {

  //TODO

  // static moveToPosition(
  //   targetNode: any,
  //   targetPos: Vec3,
  //   duration: number,
  //   onComplete: Function
  // ): void {
  //   tween(targetNode.position)
  //     .to(
  //       duration,
  //       { x: targetPos.x, y: targetPos.y, z: targetPos.z },
  //       {
  //         onUpdate: (target: Vec3) => {
  //           targetNode.setPosition(target.x, target.y, target.z);
  //         },
  //         onComplete: () => {
  //           if (onComplete) onComplete();
  //         },
  //       }
  //     )
  //     .start();
  // }
}
