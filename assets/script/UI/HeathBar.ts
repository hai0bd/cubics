import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('HeathBar')
export class HeathBar extends Component {
    @property(Sprite)
    heartStatus: Sprite[] = [];

    @property(SpriteFrame)
    heartOn: SpriteFrame;

    @property(SpriteFrame)
    heartOff: SpriteFrame;

    currentIndex = 0;

    healCube() {
        this.heartStatus[this.currentIndex].spriteFrame = this.heartOn;
        this.currentIndex++;
        if (this.currentIndex == this.heartStatus.length) {
            GameManager.instance.map.onDestination();
        }
    }
}


