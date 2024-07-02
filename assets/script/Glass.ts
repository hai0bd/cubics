import { _decorator, BoxCollider, CCFloat, Component, ICollisionEvent, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Glass')
export class Glass extends Component {
    @property(CCFloat)
    timesLimit: number;

    @property(BoxCollider)
    collider: BoxCollider;

    start() {
        this.collider.on('onCollisionExit', this.onCollisionExit, this)
    }

    onCollisionExit(event: ICollisionEvent) {
        this.timesLimit--;
        if (this.timesLimit < 0) {
            this.node.destroy();
        }
    }
}


