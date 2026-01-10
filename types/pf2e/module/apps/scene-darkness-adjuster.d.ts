import { HandlebarsRenderOptions } from "#client/applications/api/handlebars-application.mjs";
import { ScenePF2e } from "./../scene/index.ts";
export declare class SceneDarknessAdjuster extends fa.api.ApplicationV2 {
    #private;
    static get instance(): SceneDarknessAdjuster;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    render(
        options?: Partial<
            HandlebarsRenderOptions & {
                scenes?: ScenePF2e[];
            }
        >,
    ): Promise<this>;
    protected _renderHTML(_context: object): Promise<HTMLElement>;
    protected _replaceHTML(result: HTMLElement, element: HTMLElement, options: fa.ApplicationRenderOptions): void;
    protected _onRender(context: object, options: fa.api.HandlebarsRenderOptions): Promise<void>;
    onLightingRefresh(darkness: number): void;
}
