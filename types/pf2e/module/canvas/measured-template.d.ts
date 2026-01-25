import { Point } from "#common/_types.mjs";
import { GridSnappingMode } from "#common/constants.mjs";
import { ActorPF2e } from "./../actor/index.ts";
import { ChatMessagePF2e } from "./../chat-message/document.ts";
import { ItemPF2e } from "./../item/index.ts";
import { EffectAreaShape } from "./../item/types.ts";
import { MeasuredTemplateDocumentPF2e, ScenePF2e } from "./../scene/index.ts";
import { TemplateLayerPF2e } from "./layer/template.ts";
declare class MeasuredTemplatePF2e<
    TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>,
> extends fc.placeables.MeasuredTemplate<TDocument> {
    get actor(): ActorPF2e | null;
    get item(): ItemPF2e | null;
    get message(): ChatMessagePF2e | null;
    get areaShape(): EffectAreaShape | null;
    /**
     * Returns the snapping for this template's highlight.
     * Note that circle templates created via the canvas controls are neither bursts nor emanations, and thus can go in either position.
     */
    get snappingMode(): GridSnappingMode;
    highlightGrid(): void;
    /** Overriden to also return collision information */
    protected _getGridHighlightPositions(): PointCollision[];
}
interface MeasuredTemplatePF2e<
    TDocument extends MeasuredTemplateDocumentPF2e<ScenePF2e | null> = MeasuredTemplateDocumentPF2e<ScenePF2e | null>,
> extends fc.placeables.MeasuredTemplate<TDocument> {
    get layer(): TemplateLayerPF2e<this>;
}
interface PointCollision extends Point {
    collision?: boolean;
}
export { MeasuredTemplatePF2e };
