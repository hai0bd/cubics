import { _decorator, Component, Vec3, Quat, input, Input, KeyCode, tween, EventKeyboard, math, director, Node, Vec2, CCFloat, easing, EventTouch, ITriggerEvent, BoxCollider, RigidBody, game } from 'cc';
import { CameraFollow } from './CameraFollow';
import { PlayerMoverment } from './PlayerMoverment';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(PlayerMoverment)
    playerMoverment: PlayerMoverment;

    lastTouchPos: Vec2;

    start() {
        game.on('onInput', this.onInput, this)
        game.on('offInput', this.offInput, this)
        this.onInput();
    }
    onInput() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    offInput() {
        input.off(Input.EventType.KEY_DOWN);
        input.off(Input.EventType.TOUCH_START);
        input.off(Input.EventType.TOUCH_END);
    }

    onTouchStart(event: EventTouch) {
        this.lastTouchPos = event.getUILocation();
    }
    onTouchEnd(event: EventTouch) {
        const endTouch = event.getUILocation();
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.playerMoverment.flipCube("foward");
                break;
            case KeyCode.KEY_S:
                this.playerMoverment.flipCube("backward");
                break;
            case KeyCode.KEY_A:
                this.playerMoverment.flipCube("left");
                break;
            case KeyCode.KEY_D:
                this.playerMoverment.flipCube("right");
                break;
        }
    }

}
