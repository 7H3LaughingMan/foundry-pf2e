import { default as WallDocument } from "#client/documents/wall.mjs";
export declare class DoorControlPF2e extends fc.containers.DoorControl {
    /** Require that a door is in reach for a player to operate it. */
    protected _onMouseDown(event: PIXI.FederatedPointerEvent): Promise<WallDocument | undefined> | boolean | void;
}
