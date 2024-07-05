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
        // khi đi qua block thì độ bền sẽ trừ đi 1
        this.timesLimit--;
        if (this.timesLimit < 0) { // khi độ bền < 0 thì destroy
            this.node.destroy();
        }
    }
}


