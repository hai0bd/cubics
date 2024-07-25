import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property(Node)
    node: Node;
    start() {

    }

    update(deltaTime: number) {

    }
}


