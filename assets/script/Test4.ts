import { _decorator, CCInteger, Component, Enum, Node, RealCurve } from 'cc';
const { ccclass, property } = _decorator;
enum Type {
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
}
Enum(Type);

@ccclass('Test4')
// @executeInEditMode(true)

export class Test4 extends Component {
    @property
    _type: Type = Type.one;

    @property({ type: Type })
    get type() {
        return this._type;
    }

    set type(val) {
        this._type = val;
        this.setType(val);
    }

    @property
    _num: number = 10;

    @property({
        type: CCInteger, visible: function (this) {
            return this.isShowNum;
        }
    })

    get num() {
        return this._num;
    }

    set num(val) {
        this._num = val;
    }

    @property
    _str: string = "你好";

    @property({
        visible: function (this) {
            return this.isShowString;
        }
    })

    get str() {
        return this._str;
    }

    set str(val) {
        this._str = val;
    }

    @property
    _bool: boolean = true;

    @property({
        visible: function (this) {
            return this.isShowBool;
        }
    })

    get bool() {
        return this._bool;
    }

    set bool(val) {
        this._bool = val;
    }

    private isShowNum = false;
    private isShowString = false;
    private isShowBool = false;

    private setType(val): void {
        if (val == Type.one) {
            this.isShowNum = true;
            this.isShowString = false;
            this.isShowBool = false;
        }
        else if (val == Type.two) {
            this.isShowNum = false;
            this.isShowString = true;
            this.isShowBool = false;
        }
        else if (val == Type.three) {
            this.isShowNum = false;
            this.isShowBool = true;
            this.isShowString = false;
        }
    }

    onLoad() {
        console.log("onLoad");
    }
}