import { _decorator, Camera, CCFloat, Component, director, game, geometry, Node, PhysicsSystem, Quat, RigidBody, tween, Vec3 } from 'cc';
import { CameraFollow } from './CameraFollow';
import { Layer } from './Enum';
const { ccclass, property } = _decorator;

@ccclass('PlayerMoverment')
export class PlayerMoverment extends Component {
    @property(RigidBody)
    rb: RigidBody;

    @property(CCFloat)
    duration: number;

    isFliping: boolean = false;
    pivotNode: Node;
    pos: Vec3;

    checkDistance(deltaTime: number) {
        let velocity = new Vec3();
        this.rb.getLinearVelocity(velocity);

        if (velocity.y < -1) {
            this.rb.applyForce(new Vec3(0, -100, 0), Vec3.ZERO);
        }
    }

    flipCube(input: string) {
        if (this.isFliping) return;
        let pivot: Vec3;
        let angle: Vec3;
        let direction: Vec3;

        switch (input) {
            case "foward":
                pivot = new Vec3(0, -0.5, -0.5);
                angle = new Vec3(-90, 0, 0);
                direction = new Vec3(0, 0, -1);
                break;
            case "backward":
                pivot = new Vec3(0, -0.5, 0.5);
                angle = new Vec3(90, 0, 0);
                direction = new Vec3(0, 0, 1);
                break;
            case "left":
                pivot = new Vec3(-0.5, -0.5, 0);
                angle = new Vec3(0, 0, 90);
                direction = new Vec3(-1, 0, 0);
                break;
            case "right":
                pivot = new Vec3(0.5, -0.5, 0);
                angle = new Vec3(0, 0, -90);
                direction = new Vec3(1, 0, 0);
                break;
            default:
                return;
        }
        if (this.checkRaycast(direction)) return;
        this.isFliping = true;
        this.move(pivot, angle, direction);
        game.emit('CubeMove', direction);
    }

    checkRaycast(direction: Vec3): boolean {
        const startPos = this.node.getPosition();
        // const endPos = new Vec3(startPos.x + direction.x + 0.5, startPos.y + direction.y + 0.5, startPos.z + direction.z + 0.5);

        let ray = new geometry.Ray(startPos.x, startPos.y, startPos.z, direction.x, direction.y, direction.z);
        if (PhysicsSystem.instance.raycast(ray, 0xffffffff, 1, true)) {
            let results = PhysicsSystem.instance.raycastResults;

            for (let i = 0; i < results.length; i++) {
                const collider = results[i].collider;
                if (collider.node.layer != Layer.Food_Layer) return true;
            }
        }

        return false;
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

                this.resetCube(angle, direction);
            })
            .start();
    }

    resetCube(angle: Vec3, direction: Vec3) {
        //reset cube
        this.node.position = new Vec3(this.pos.x + direction.x, this.pos.y, this.pos.z + direction.z);

        let currentRotation = this.node.getRotation();
        let axis = new Vec3(angle.x / 90, angle.y / 90, angle.z / 90);

        Quat.rotateAround(currentRotation, currentRotation, axis, Math.PI / 2);
        this.node.setRotation(currentRotation);

        director.getScene().addChild(this.node);
        this.isFliping = false;
        // this.springyCube();
    }
}