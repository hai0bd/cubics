import { _decorator, BoxCollider, CCInteger, Component, game, ITriggerEvent } from 'cc';
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

    // bật điểm đích khi đủ điều kiện
    onDestination() {
        game.emit('OnDestination');
        this.scheduleOnce(() => {
            this.finishPoint.node.active = true;
        }, 1.5);
    }

    onTriggerEnter(event: ITriggerEvent) {
        const other = event.otherCollider;
        console.log("isTrigger: " + other.node.layer);

        if (other.node.layer == Layer.Food_Layer) {
            UIManager.instance.healCube();
            other.node.destroy(); //khi chạm vào food thì phá hủy food đó
        }
        else if (other.node.layer == Layer.Destination_Layer) {
            GameManager.instance.victory();
        }
        else if (other.node.layer == Layer.Death_Range) {
            GameManager.instance.lose();
        }
    }
}


