import { _decorator, BoxCollider, CCFloat, CCInteger, Component, Enum, game, ICollisionEvent, Input, input, Node, tween, Vec3 } from 'cc';
import { Block_Type } from '../Enum';
const { ccclass, property } = _decorator;
Enum(Block_Type);

@ccclass('BlockMoverment')
export class BlockMoverment extends Component {
    @property({})
    isOneWay: boolean = false;

    @property({ type: BoxCollider, visible: function (this) { return this.isOneWay; } })
    collider: BoxCollider;

    @property({ type: CCInteger })
    distancePositon: number = 1;

    @property({ type: CCFloat })
    duration: number = 1;

    newPos: Vec3 = new Vec3();
    isMoving: boolean = false;

    start() {
        this.newPos = this.node.getPosition(); // lưu lại vị trí ban đầu của block

        // nếu di chuyển lên và xuống thì:
        if (!this.isOneWay) {
            this.moveRepeatNode(this.distancePositon);
            return;
        }

        // nếu block chỉ di chuyển lên hoặc xuống
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.on('onCollisionExit', this.onCollisionExit, this);
    }

    onDisabale() {
        this.collider.off('onCollisionEnter');
        this.collider.off('onCollisionExit');
    }

    onCollisionEnter(event: ICollisionEvent) {
        game.emit('offInput'); // khi lên block thì không cho nhân vật di chuyển
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
                this.scheduleOnce(() => {
                    this.isMoving = false;
                    game.emit('onInput'); //cho nhân vật di chuyển
                }, 0.1);
            })
            .start();
    }

    moveRepeatNode(newY: number) {
        tween(this.node)
            .to(this.duration, { position: new Vec3(this.newPos.x, this.newPos.y + newY, this.newPos.z) })
            .to(this.duration, { position: new Vec3(this.newPos.x, this.newPos.y, this.newPos.z) })
            .delay(0.2)
            .union()
            .repeatForever()
            .start();
    }
}


