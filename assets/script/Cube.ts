import { _decorator, CCFloat, Component, director, EventKeyboard, game, Input, input, KeyCode, math, Node, Quat, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cube')
export class Cube extends Component {
    @property(CCFloat)
    moveDistance: number;

    @property(CCFloat)
    duration: number;

    private direction: string = "";
    private isFlipping: boolean = false;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.direction = "foward";
                this.flipCube("foward");
                break;
            case KeyCode.KEY_S:
                this.direction = "backward";
                this.flipCube("backward");
                break;
            case KeyCode.KEY_A:
                this.direction = "right";
                this.flipCube("right");
                break;
            case KeyCode.KEY_D:
                this.direction = "left";
                this.flipCube("left");
                break;
        }
    }


    // Hàm xoay Cube
    public flipCube(direction: string) {
        if (this.isFlipping) return; // Kiểm tra nếu đang xoay thì không làm gì

        this.isFlipping = true;

        let rotation: Vec3;
        switch (direction) {
            case "foward":
                this.moveCube(0, 0, this.moveDistance);
                rotation = new Vec3(90, 0, 0); // Xoay quanh trục X
                break;
            case "backward":
                rotation = new Vec3(-90, 0, 0); // Xoay quanh trục Y
                this.moveCube(0, 0, -this.moveDistance);
                break;
            case "right":
                rotation = new Vec3(0, 0, -90); // Xoay quanh trục Z
                this.moveCube(this.moveDistance, 0, 0);
                break;
            case "left":
                rotation = new Vec3(0, 0, 90); // Xoay quanh trục Z
                this.moveCube(-this.moveDistance, 0, 0);
                break;
            default:
                rotation = new Vec3(0, 0, 0); // Không xoay nếu không đúng trục
                break;
        }

        // Tạo tween để xoay cube
        tween(this.node)
            .by(this.duration, { eulerAngles: rotation }) // Xoay 90 độ trong 1 giây
            .call(() => {
                this.isFlipping = false; // Đặt lại trạng thái sau khi xoay xong
                // this.resetRotation();
            })
            .start();
    }

    /* resetRotation() {
        const ros = this.node.getRotation();
        if (ros.x >= 360) ros.x = 0;
        if (ros.y >= 360) ros.y = 0;
        if (ros.z >= 360) ros.z = 0;
        this.node.setRotation(ros);
    } */
    moveCube(x: number, y: number, z: number) {
        /* const pos = this.node.position.clone();
        // newPosition.add3f(x, y, z);
        tween(this.node)
            .to(this.duration / 2, { position: new Vec3(pos.x + x / 2, pos.y + (Math.SQRT2 - 1) / 2, pos.z + z / 2) })
            .to(this.duration / 2, { position: new Vec3(pos.x + x, pos.y, pos.z + z) })
            .call(() => {
                // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
            })
            // .union()
            .start(); */
    }
}


