export enum Layer {
    Food_Layer = 1,
    Destination_Layer = 2,
    Death_Range = 4
}

export enum Block_Type {
    Push = 1,
    Pull = 2,
    PushPull = 3
}

export enum Game_Emit {
    CubeMove = "CubeMove",
    OverviewOn = "OverviewOn",
    OverviewOff = "OverviewOff",
    OnDestination = "OnDestination",
    onInput = "onInput",
    offInput = "offInput"
}