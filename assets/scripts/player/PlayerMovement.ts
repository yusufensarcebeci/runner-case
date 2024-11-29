import { _decorator, Component, input, Input, EventMouse } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerMovement")
export class PlayerMovement extends Component {
  protected onLoad(): void {
    this.initializeInputListener();
  }

  private initializeInputListener(): void {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
  }

  private onMouseDown(event: EventMouse) {
    console.log(event.target);
  }
}
