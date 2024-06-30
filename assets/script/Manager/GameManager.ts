import { _decorator, BoxCollider, Collider, Component, ITriggerEvent, Node } from 'cc';
import { Layer } from '../Enum';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager;
    @property(BoxCollider)
    cube: BoxCollider;

    @property(BoxCollider)
    finishPoint: BoxCollider;

    @property(Node)
    victoryPopUp: Node;

    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!GameManager._instance) {
            GameManager._instance = this;
        } else {
            this.destroy();
        }
    }

    start() {
        this.cube.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onDestination(){
        this.finishPoint.enabled = true;
    }

    onTriggerEnter(event: ITriggerEvent){
        console.log("isTrigger");
        const other = event.otherCollider;

        if(other.node.layer == Layer.Food_Layer){
            UIManager.instance.healCube();
            other.node.destroy();
        }
        else if(other.node.layer == Layer.Destination_Layer){
            this.victoryPopUp.active = true;
        }
    }
}


