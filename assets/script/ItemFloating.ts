import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ItemFloating')
export class ItemFloating extends Component {
    @property
    floatAmplitude: number = 10;  // Biên độ dao động (chiều cao của chuyển động lên xuống)

    @property
    floatDuration: number = 2;  // Thời gian dao động

    @property
    rotationSpeed: number = 30;

    startPos: Vec3;

    start() {
        this.startFloating();
    }

    startFloating() {
        // Tạo hiệu ứng tween để di chuyển đối tượng lên và xuống
        tween(this.node)
            .repeatForever(
                tween()
                    .by(this.floatDuration, { position: new Vec3(0, this.floatAmplitude, 0) }, { easing: 'sineInOut' })
                    .by(this.floatDuration, { position: new Vec3(0, -this.floatAmplitude, 0) }, { easing: 'sineInOut' })
            )
            .start();
        // Tạo hiệu ứng xoay vòng tròn
        tween(this.node)
            .repeatForever(
                tween()
                    .by(1, { eulerAngles: new Vec3(0, this.rotationSpeed, 0) }) // Xoay theo trục y
            )
            .start();
    }
}


