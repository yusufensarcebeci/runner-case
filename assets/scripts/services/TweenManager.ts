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
    static scaleBounce(
      node: Node,
      scaleFactor: number = 1.2,
      duration: number = 0.1,
      delay: number = 0,
      onComplete?: Function
    ): void {
      Tween.stopAllByTarget(node);
      node.setScale(new Vec3(1, 1, 1));
      const originalScale = node.scale.clone();
  
      const tween = new Tween(node)
        .to(duration, { scale: new Vec3(scaleFactor, scaleFactor, scaleFactor) })
        .to(duration, { scale: originalScale })
        .delay(delay)
        .call(() => {
          if (onComplete) onComplete();
        })
        .start();
    }
    
    static errorVibrate(
      node: Node,
      vibrationAmount: number = 5,
      duration: number = 0.1,
      delay: number = 0,
      alignment:string ,  
      onComplete?: Function
    ) {
      Tween.stopAllByTarget(node);
    
      const originalPosition = node.position.clone();
    
      const vibrationVector = alignment === "H"
        ? new Vec3(originalPosition.x + vibrationAmount, originalPosition.y, originalPosition.z)
        : new Vec3(originalPosition.x, originalPosition.y + vibrationAmount, originalPosition.z);
    
      new Tween(node)
        .to(duration, { position: vibrationVector })
        .to(duration, {
          position: alignment === "H"
            ? new Vec3(originalPosition.x - vibrationAmount, originalPosition.y, originalPosition.z)
            : new Vec3(originalPosition.x, originalPosition.y - vibrationAmount, originalPosition.z),
        })
        .to(duration, { position: vibrationVector })
        .to(duration, { position: originalPosition })
        .delay(delay)
        .call(() => {
          if (onComplete) onComplete();
        })
        .start();
    }
  
    static scaleTween(
      node: Node,
      scaleFactor: number = 1,
      duration: number = 0.5
    ) {
      const tween = new Tween(node)
        .to(duration, { scale: new Vec3(scaleFactor, scaleFactor, scaleFactor) })
        .start();
    }
  
    static opacityTween(
      node: Node,
      opacityFactor: number = 0,
      duration: number = 0.5
    ) {
      const tween = new Tween(node.getComponent(UIOpacity))
        .to(duration, { opacity: opacityFactor })
        .start();
    }
  
    static tweenToWorldPosition(
      node: Node,
      targetPosition: Vec3,
      duration: number,
      onComplete: () => void = () => {}
    ) {
      const originalPosition = node.position.clone();
  
      new Tween(node)
        .to(duration, { worldPosition: targetPosition }, { easing: "sineInOut" })
        .call(() => {
          if (onComplete) onComplete();
        })
        .start();
    }
  
    static blinkTween(
      node: Node,
      duration: number = 0.2,
      repeatCount: number = 1
    ) {
      const opacitySequence = new Tween(node.getComponent(UIOpacity))
        .to(duration / 2, { opacity: 150 })
        .to(duration / 2, { opacity: 0 });
  
      opacitySequence.repeat(repeatCount).start();
    }
  }