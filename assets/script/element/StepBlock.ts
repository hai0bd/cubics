import { _decorator, CCFloat, Component, game, MeshRenderer, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StepBlock')
export class StepBlock extends Component {
    @property(Node)
    target: Node;

    @property(MeshRenderer)
    mesh: MeshRenderer;

    @property(CCFloat)
    duration: number;

    startScale: Vec3 = new Vec3(0, 0, 0);
    endScale: Vec3 = new Vec3(1, 1, 1);

    start() {
        game.on("CubeMove", this.checkDistance, this);
    }
    onDisable() {
        game.off("CubeMove");
    }

    checkDistance() {
        this.scheduleOnce(() => {
            const distance = Vec3.distance(this.target.position, this.node.position);
            if (distance <= 2) {
                this.onMesh();
            }
            else {
                this.offMesh()
            }
        }, 0.4);
    }

    onMesh() {
        if (this.mesh.enabledInHierarchy) return;
        this.mesh.enabled = true;
        this.node.setScale(this.startScale);

        tween(this.node)
            .to(this.duration, { scale: this.endScale }, { easing: 'backOut' })
            .start();
    }

    offMesh() {
        if (!this.mesh.enabledInHierarchy) return;
        // this.node.setScale(this.startScale);

        tween(this.node)
            .to(this.duration, { scale: this.startScale }, { easing: 'backIn' })
            .call(() => { this.mesh.enabled = false; })
            .start();
    }
}


