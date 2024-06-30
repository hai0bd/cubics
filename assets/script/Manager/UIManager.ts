import { _decorator, Component, Node } from 'cc';
import { HeathBar } from '../UI/HeathBar';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {
    private static _instance: UIManager;

    @property(HeathBar)
    heathBar: HeathBar;

    public static get instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!UIManager._instance) {
            UIManager._instance = this;
        } else {
            this.destroy();
        }
    }

    healCube(){
        this.heathBar.healCube();
    }
}

