import { _decorator, Component, EventMouse, Input, input, Node, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SwipeManager')
export class SwipeManager extends Component {
    private startPoint: Vec2 = new Vec2();
  private endPoint: Vec2 = new Vec2();
  private threshold: number = 10;

  protected onLoad(): void {
    this.initializeInputListener();
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

  private onSwipeRight(): void {
    console.log("Swipe Right Detected");
  }

  private onSwipeLeft(): void {
    console.log("Swipe Left Detected");
  }

  private onSwipeUp(): void {
    console.log("Swipe Up Detected");
  }
}


