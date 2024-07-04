import { _decorator, BoxCollider, CCInteger, Component, ITriggerEvent } from 'cc';
import { Layer } from './Enum';
import { GameManager } from './Manager/GameManager';
import { UIManager } from './Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {
    @property(BoxCollider)
    cube: BoxCollider;

    @property(BoxCollider)
    finishPoint: BoxCollider;

    @property(CCInteger)
    foodAmount: number;

    start() {
        this.cube.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onDestination() {
        this.finishPoint.enabled = true;
    }

    onTriggerEnter(event: ITriggerEvent) {
        const other = event.otherCollider;
        console.log("isTrigger: " + other.node.layer);

        if (other.node.layer == Layer.Food_Layer) {
            UIManager.instance.healCube();
            other.node.destroy();
        }
        else if (other.node.layer == Layer.Destination_Layer) {
            GameManager.instance.victory();
        }
        else if (other.node.layer == Layer.Death_Range) {
            GameManager.instance.lose();
        }
    }
}


