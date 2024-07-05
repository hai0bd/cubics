import { _decorator, BoxCollider, Camera, Component, game, ICollisionEvent, Node, Vec3 } from 'cc';
import { CameraFollow } from './CameraFollow';
const { ccclass, property } = _decorator;

@ccclass('OverviewBlock')
export class OverviewBlock extends Component {
    @property(BoxCollider)
    collider: BoxCollider;

    start() {
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.on('onCollisionExit', this.onCollisionExit, this);
    }

    onCollisionEnter(event: ICollisionEvent) {
        game.emit('OverviewOn'); // bắn sự kiện để camera di chuyển overview
    }

    onCollisionExit(event: ICollisionEvent) {
        game.emit('OverviewOff'); // bắn sự kiện để camera di chuyển về trạng thái bình thường
    }
}


