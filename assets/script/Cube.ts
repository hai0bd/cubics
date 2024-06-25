import { _decorator, CCFloat, Component, director, EventKeyboard, game, Input, input, KeyCode, Node, Quat, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cube')
export class Cube extends Component {
    @property(CCFloat)
    rollSpeed: number = 3;

    private isMoving: boolean = false;
    private deltaTime: number;
    
    start() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: EventKeyboard) {
        console.log()
        switch (event.keyCode) {
            case KeyCode.KEY_A && KeyCode.ARROW_UP:
                this.roll();
        }
    }

    roll(){
        console.log("A");
        const remainAngle = 90;
        this.isMoving = true;

        while(remainAngle  > 0){
            const rotationAngle = this.rollSpeed * this.deltaTime;
            this.node.rotation = new Quat(rotationAngle, 0, 0);
        }

        this.isMoving = false;
    }

    update(deltaTime: number){
        this.deltaTime = deltaTime;
    }
}


