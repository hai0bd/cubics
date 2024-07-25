import { _decorator, CCFloat, CCInteger, CCString, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('testString')
export class testString {
    @property(CCString)
    skinID: string = "";

    @property(CCFloat)
    price: number = 0.99;
}


