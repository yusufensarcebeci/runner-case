import { _decorator, EventMouse, Input, input, Vec2 } from "cc";
const { ccclass } = _decorator;

@ccclass("SwipeManager")
export class SwipeManager  {
  private static instance: SwipeManager | null = null;

  private startPoint: Vec2 = new Vec2();
  private endPoint: Vec2 = new Vec2();
  private threshold: number = 10;

  public static getInstance(): SwipeManager {
    if (!SwipeManager.instance) {
      SwipeManager.instance = new SwipeManager();
      SwipeManager.instance.initializeInputListener();
    }
    return SwipeManager.instance;
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

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > this.threshold) {
        if (deltaX > 0) {
          this.onSwipeRight();
        } else {
          this.onSwipeLeft();
        }
      }
    } else {
      if (Math.abs(deltaY) > this.threshold) {
        if (deltaY > 0) {
          this.onSwipeUp();
        }
      }
    }
  }

  public  onSwipeRight(): void {
    console.log("Swipe Right Detected");
  }

  public  onSwipeLeft(): void {
    console.log("Swipe Left Detected");
  }

  public  onSwipeUp(): void {
    console.log("Swipe Up Detected");
  }
}
