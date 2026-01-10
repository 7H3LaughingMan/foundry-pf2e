import { PlaceablesLayerPointerEvent } from "#client/canvas/layers/base/placeables-layer.mjs";
import { Point } from "#common/_types.mjs";
import { RegionDocumentPF2e } from "./../scene/region-document/document.ts";
/** Add support for drag/drop repositioning of regions. */
declare class RegionPF2e<TDocument extends RegionDocumentPF2e = RegionDocumentPF2e> extends fc.placeables
    .Region<TDocument> {
    static RENDER_FLAGS: {
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        refreshPosition: {};
        redraw: {
            propagate: ["refresh"];
        };
        refresh: {
            propagate: ["refreshState", "refreshBorder"];
            alias: boolean;
        };
        refreshState: object;
        refreshBorder: object;
    };
    getSnappedPosition(position?: Point): Point;
    protected _canDrag(user: User, event: PIXI.FederatedPointerEvent): boolean;
    protected _onDragLeftMove(event: PlaceablesLayerPointerEvent<this>): void;
    /** Save the coordinates of the new drop location(s). */
    protected _onDragLeftDrop(event: PlaceablesLayerPointerEvent<this>): Promise<TDocument[]>;
}
export { RegionPF2e };
