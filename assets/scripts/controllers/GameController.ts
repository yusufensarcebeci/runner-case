import { _decorator, Component, Node } from 'cc';
import { SwipeManager } from '../managers/SwipeManager';
import { PlayerController } from '../player/PlayerController';

const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(PlayerController)
    private playerController: PlayerController = null;

    onLoad() {
        if (!this.playerController) {
            console.error('PlayerController is not assigned in the inspector.');
            return;
        }

        const swipeManager = SwipeManager.getInstance();

        swipeManager.onSwipeRight = this.playerController.moveRight.bind(this.playerController);
        swipeManager.onSwipeLeft = this.playerController.moveLeft.bind(this.playerController);
        swipeManager.onSwipeUp = this.playerController.jump.bind(this.playerController);
    }
}
