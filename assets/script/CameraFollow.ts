import { _decorator, CCFloat, Component, easing, game, Node, Quat, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property(CCFloat)
    duration: number;

    cachePos: Vec3;

    start() {
        game.on('OverviewOn', this.overviewOn, this);
        game.on('OverviewOff', this.overviewOff, this);
        game.on('CubeMove', this.followTarget, this);
        game.on('OnDestination', this.followDestination, this);
    }

    followTarget(direction: Vec3) {
        const pos = this.node.getPosition();
        pos.add(direction);

        tween(this.node)
            .to(this.duration, { position: pos }, { easing: 'sineOut' })
            .call(() => { this.cachePos = this.node.getPosition() })
            .start();
    }

    followDestination() {
        game.emit('offInput');

        const pos = new Vec3(-14, 7, 30);
        tween(this.node)
            .to(this.duration, { position: pos }, { easing: 'sineOut' })
            .call(() => {
                this.scheduleOnce(() => {
                    tween(this.node)
                        .to(this.duration, { position: this.cachePos }, { easing: 'sineOut' })
                        .call(() => { game.emit('onInput'); })
                        .start();
                }, 2)
            })
            .start();
    }
    
    overviewOn() {
        const pos = new Vec3(0, 50, 10);
        const rot = new Vec3(-90, 0, 0);

        tween(this.node)
            .to(this.duration, { position: pos }, { easing: 'sineOut' })
            .start();

        tween(this.node)
            .to(this.duration, { eulerAngles: rot }, { easing: 'sineOut' })
            .start();
    }
    overviewOff() {
        tween(this.node)
            .to(this.duration, { position: this.cachePos }, { easing: 'sineOut' })
            .start();

        tween(this.node)
            .to(this.duration, { eulerAngles: new Vec3(-35, 0, 0) }, { easing: 'sineOut' })
            .start();

    }
}


