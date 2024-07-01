import { _decorator, BoxCollider, Collider, Component, instantiate, ITriggerEvent, Node, Prefab } from 'cc';
import { Layer } from '../Enum';
import { UIManager } from './UIManager';
import { MapControl } from '../MapControl';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private static _instance: GameManager;

    @property(MapControl)
    map: MapControl;

    @property(Prefab)
    levelPrefab: Prefab[] = [];

    levelIndex: number = 0;

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

    victory() {
        UIManager.instance.victory();
        this.nextLevel();
    }
    lose() {
        UIManager.instance.lose();
    }
    nextLevel() {
        this.instantiateLevel();
    }
    instantiateLevel(){
        const level = instantiate(this.levelPrefab[this.levelIndex]);
    }
}


