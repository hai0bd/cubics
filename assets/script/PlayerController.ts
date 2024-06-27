import { _decorator, Component, Vec3, Quat, input, Input, KeyCode, tween, EventKeyboard, math, director, Node, Vec2, CCFloat } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    @property(CCFloat)
    duration: number;

    pivotNode: Node;
    pos: Vec3;
    direction: string;

    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
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
                this.flipCube("right");
                break;
            case KeyCode.KEY_D:
                this.flipCube("left");
                break;
        }
    }

    flipCube(input: string) {
        let posSet: Vec3;
        let angle: Vec3;
        let direction: Vec3;

        switch (input) {
            case "foward":
                break;
            case "backward":
                break;
            case "right":
                posSet = new Vec3(-0.5, -0.5, 0);
                angle = new Vec3(0, 0, 90);
                direction = new Vec3(1, 0, 0);
                break;
            case "left":
                posSet = new Vec3(0.5, -0.5, 0);
                angle = new Vec3(0, 0, -90);
                break;
        }
    }

    init(posSet: Vec3, angle: Vec3, direction) {
        this.pos = this.node.getPosition();
        this.pivotNode = new Node("PivotNode");
        this.pivotNode.setPosition(new Vec3(this.pos.x + 0.5, this.pos.y - 0.5, this.pos.z + posSet.z));
        this.node.setPosition(new Vec3(-0.5, 0.5, 0));

        director.getScene().addChild(this.pivotNode);
        this.pivotNode.addChild(this.node);

        // this.move();
        this.rotate(angle);
    }

    rotate(angle: Vec3) {
        tween(this.pivotNode)
            .to(this.duration, { eulerAngles: new Vec3(0, 0, -90) }) // Xoay 90 độ trong 1 giây
            .call(() => {
                this.node.removeFromParent();
                this.pivotNode.destroy();
                this.node.position = new Vec3(this.pos.x + 1, this.pos.y, this.pos.z);
                director.getScene().addChild(this.node);
                // this.node.rotation = new Quat(0, 0, 0);
            })
            .start();
    }
    /* update(){

    } */
}
