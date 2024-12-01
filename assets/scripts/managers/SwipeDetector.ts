import { _decorator, input, Input, EventMouse, Vec2 } from "cc";
import { SwipeType } from "../enums/SwipeType"; // SwipeType enum import edilmiş

const { ccclass } = _decorator;

@ccclass("SwipeDetector")
export class SwipeDetector {
  private static instance: SwipeDetector | null = null;

  private startPoint: Vec2 = new Vec2();
  private endPoint: Vec2 = new Vec2();
  private threshold: number = 30;

  private static subscribers: Function[] = [];

  public static getInstance(): SwipeDetector {
    if (!SwipeDetector.instance) {
      SwipeDetector.instance = new SwipeDetector();
      SwipeDetector.instance.initializeInputListener();
    }
    return SwipeDetector.instance;
  }

  private initializeInputListener(): void {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  private onMouseDown(event: EventMouse) {
    this.startPoint = event.getUILocation();
  }

  private onMouseUp(event: EventMouse) {
    this.endPoint = event.getUILocation();
    this.detectSwipe();
  }

  private detectSwipe(): void {
    const deltaX = this.endPoint.x - this.startPoint.x;
    const deltaY = this.endPoint.y - this.startPoint.y;

    if (Math.abs(deltaX) > this.threshold) {
      if (deltaX > 0) {
        this.triggerEvent(SwipeType.RIGHT);
      } else {
        this.triggerEvent(SwipeType.LEFT);
      }
    } else if (Math.abs(deltaY) > this.threshold) {
      if (deltaY > 0) {
        this.triggerEvent(SwipeType.UP);
      }
    }
  }

  static subscribe(callback: Function) {
    SwipeDetector.subscribers.push(callback);
  }

  private static notifySubscribers(type: SwipeType) {
    for (const subscriber of SwipeDetector.subscribers) {
      subscriber(type);
    }
  }

  private triggerEvent(swipeType: SwipeType): void {
    SwipeDetector.notifySubscribers(swipeType);
  }
}
