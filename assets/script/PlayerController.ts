import { _decorator, Component, Vec3, Quat, input, Input, KeyCode, tween, EventKeyboard, math, director, Node, Vec2, CCFloat, easing, EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(CCFloat)
    duration: number;

    pivotNode: Node;
    pos: Vec3;
    isFliping: boolean = false;

    lastTouchPos: Vec2;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    onTouchStart(event: EventTouch){
        this.lastTouchPos = event.getUILocation();
    }
    onTouchEnd(event: EventTouch){
        const endTouch = event.getUILocation();
        
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_W:
                this.flipCube("foward");
                break;
            case KeyCode.KEY_S:
                this.flipCube("backward");
                break;
            case KeyCode.KEY_A:
                this.flipCube("left");
                break;
            case KeyCode.KEY_D:
                this.flipCube("right");
                break;
        }
    }

    flipCube(input: string) {
        if (this.isFliping) return;
        let pivot: Vec3;
        let angle: Vec3;
        let direction: Vec3;

        switch (input) {
            case "foward":
                pivot = new Vec3(0, -0.5, 0.5);
                angle = new Vec3(90, 0, 0);
                direction = new Vec3(0, 0, 1);
                break;
            case "backward":
                pivot = new Vec3(0, -0.5, -0.5);
                angle = new Vec3(-90, 0, 0);
                direction = new Vec3(0, 0, -1);
                break;
            case "left":
                pivot = new Vec3(0.5, -0.5, 0);
                angle = new Vec3(0, 0, -90);
                direction = new Vec3(1, 0, 0);
                break;
            case "right":
                pivot = new Vec3(-0.5, -0.5, 0);
                angle = new Vec3(0, 0, 90);
                direction = new Vec3(-1, 0, 0);
                break;
            default:
                return;
        }
        this.isFliping = true;
        this.move(pivot, angle, direction);
    }

    move(pivot: Vec3, angle: Vec3, direction) {
        // set parent node property
        this.pos = this.node.getPosition();
        this.pivotNode = new Node("PivotNode");
        this.pivotNode.setPosition(new Vec3(this.pos.x + pivot.x, this.pos.y + pivot.y, this.pos.z + pivot.z));
        this.node.setPosition(new Vec3(-pivot.x, 0.5, -pivot.z));

        //add parent node
        director.getScene().addChild(this.pivotNode);
        this.pivotNode.addChild(this.node);

        // this.move();
        this.rotate(angle, direction);
    }

    rotate(angle: Vec3, direction: Vec3) {
        tween(this.pivotNode)
            .to(this.duration, { eulerAngles: angle }) // Xoay 90 độ trong 1 giây
            .call(() => {
                // delete parent node
                this.node.removeFromParent();
                this.pivotNode.destroy();

                //reset cube
                this.node.position = new Vec3(this.pos.x + direction.x, this.pos.y, this.pos.z + direction.z);

                let currentRotation = this.node.getRotation();
                let axis = new Vec3(angle.x / 90, angle.y / 90, angle.z / 90);

                Quat.rotateAround(currentRotation, currentRotation, axis, Math.PI / 2);
                this.node.setRotation(currentRotation);

                director.getScene().addChild(this.node);
                this.isFliping = false;
                // this.springyCube();
            })
            .start();
    }

    resetCube() {

    }

}
