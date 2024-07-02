import { _decorator, BoxCollider, CCFloat, CCInteger, Component, Enum, ICollisionEvent, Input, input, Node, tween, Vec3 } from 'cc';
import { Block_Type } from './Enum';
const { ccclass, property } = _decorator;
Enum(Block_Type);

@ccclass('BlockMoverment')
export class BlockMoverment extends Component {
    @property({})
    isOneWay: boolean = false;

    @property({ type: BoxCollider, visible: function (this) { return this.isOneWay; } })
    collider: BoxCollider;

    @property({ type: CCInteger, visible: function (this) { return this.isOneWay; } })
    distancePositon: number = 1;

    @property({ type: CCFloat, visible: function (this) { return this.isOneWay; } })
    duration: number = 1;

    newPos: Vec3 = new Vec3();
    @property
    isMoving: boolean = false;

    start() {
        if (!this.isOneWay) return;
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.on('onCollisionExit', this.onCollisionExit, this);
        this.newPos = this.node.getPosition();
    }

    onCollisionEnter(event: ICollisionEvent) {
        if (!this.isMoving) this.moveNode(this.distancePositon);
    }

    onCollisionExit(event: ICollisionEvent) {
        if (!this.isMoving) this.moveNode(-this.distancePositon);
    }

    moveNode(newY: number) {
        this.isMoving = true;
        this.newPos.y += newY;
        tween(this.node)
            .to(this.duration, { position: this.newPos })
            .call(() => {
                this.scheduleOnce(() => { this.isMoving = false; }, 0.1);
                input.off(Input.EventType.KEY_DOWN);
                input.off(Input.EventType.TOUCH_START);
                input.off(Input.EventType.TOUCH_END);
            })
            .start();
    }
}


