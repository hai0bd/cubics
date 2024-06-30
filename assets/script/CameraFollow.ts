import { _decorator, CCFloat, Component, easing, Node, Quat, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(CCFloat)
    duration: number;

    followTarget(direction: Vec3) {
        const pos = this.node.getPosition();
        pos.add(direction);

        tween(this.node)
        .to(this.duration, {position: pos}, {easing: 'sineOut'})
        .start();
    }
}


