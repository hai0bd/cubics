import { _decorator, Component, Vec3, Quat, input, Input, KeyCode, tween, EventKeyboard, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    private moveDistance: number = 1; // Khoảng cách lật

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.ARROW_UP:
                this.flip('forward');
                break;
            case KeyCode.ARROW_DOWN:
                this.flip('backward');
                break;
            case KeyCode.ARROW_LEFT:
                this.flip('left');
                break;
            case KeyCode.ARROW_RIGHT:
                this.flip('right');
                break;
        }
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    flip(direction: string) {
        let axis: Vec3;
        let angle: number;

        switch (direction) {
            case 'backward':
                axis = new Vec3(1, 0, 0);
                angle = -90;
                this.moveCube(0, 0, -this.moveDistance);
                break;
            case 'forward':
                axis = new Vec3(1, 0, 0);
                angle = 90;
                this.moveCube(0, 0, this.moveDistance);
                break;
            case 'right':
                axis = new Vec3(0, 0, 1);
                angle = 90;
                this.moveCube(-this.moveDistance, 0, 0);
                break;
            case 'left':
                axis = new Vec3(0, 0, 1);
                angle = -90;
                this.moveCube(this.moveDistance, 0, 0);
                break;
        }

        // Thực hiện xoay lật Cube
        const rotation = new Quat();
        Quat.rotateAround(rotation, this.node.rotation, axis, angle * Math.PI / 180);
        // Quat.rotateTowards(rotation, this.node.rotation, )
        tween(this.node)
            .to(0.5, { rotation: rotation })
            .start();
    }

    moveCube(x: number, y: number, z: number) {
        const pos = this.node.position.clone();
        // newPosition.add3f(x, y, z);
        tween(this.node)
            .to(0.25, { position: new Vec3(pos.x + x / 2, pos.y + (Math.SQRT2 - 1) / 2, pos.z + z / 2) })
            .to(0.25, { position: new Vec3(pos.x + x, pos.y /* - (Math.SQRT2 - 1) */, pos.z) })
            .call(() => {
                input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            })
            // .union()
            .start();
    }
}
