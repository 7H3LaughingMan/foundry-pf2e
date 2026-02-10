import { PlaceablesLayerPointerEvent } from "#client/canvas/layers/base/placeables-layer.mjs";
import { Point } from "#common/_types.mjs";
import { MeasuredTemplatePF2e } from "../measured-template.ts";
declare class TemplateLayerPF2e<TObject extends MeasuredTemplatePF2e = MeasuredTemplatePF2e> extends fc.layers.TemplateLayer<TObject> {
    #private;
    createPreview(createData: DeepPartial<TObject["document"]["_source"]>): Promise<TObject>;
    /** Overriden to snap according to the dragged template's type */
    getSnappedPoint(point: Point): Point;
    protected _onDragLeftMove(event: PlaceablesLayerPointerEvent<TObject>): void;
    protected _onMouseWheel(event: WheelEvent): Promise<TObject> | void;
    protected _onDragLeftStart(event: PlaceablesLayerPointerEvent<TObject>): void;
    protected _onDragLeftCancel(event: PlaceablesLayerPointerEvent<TObject>): void;
}
export { TemplateLayerPF2e };
