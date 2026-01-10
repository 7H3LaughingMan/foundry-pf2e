import { TokenRulerData, TokenRulerWaypoint } from "#client/_types.mjs";
import { WaypointLabelRenderContext, WaypointLabelRenderState } from "#client/canvas/placeables/tokens/ruler.mjs";
import { TokenPF2e } from "./index.ts";
export declare class TokenRulerPF2e extends foundry.canvas.placeables.tokens.TokenRuler<TokenPF2e> {
    #private;
    static WAYPOINT_LABEL_TEMPLATE: string;
    static ACTION_MARKER_TEMPLATE: string;
    /** Observe changes to the attributes of the HeadsUpDisplayContainer's element. */
    static observeHudContainer(): void;
    /** Fish out the value of the parent class's hard-private #path property. */
    draw(): Promise<void>;
    clear(): void;
    destroy(): void;
    /** Start observing the measurement container to append action glyphs after ruler labels are drawn. */
    refresh(rulerData: DeepReadonly<TokenRulerData>): void;
    /** Include action-cost information for showing a glyph. */
    protected _getWaypointLabelContext(
        waypoint: DeepReadonly<TokenRulerWaypoint>,
        state: WaypointLabelRenderState,
    ): WaypointLabelRenderContext | void;
    /** Abuse this method to log intermediate waypoints that should be rendered with action glyphs. */
    protected _getGridHighlightStyle(
        waypoint: DeepReadonly<Omit<TokenRulerWaypoint, "index" | "center" | "size" | "ray">>,
        offset: DeepReadonly<foundry.grid.GridOffset3D>,
    ): {
        color?: PIXI.ColorSource;
        alpha?: number;
        texture?: PIXI.Texture;
        matrix?: PIXI.Matrix | null;
    };
}
