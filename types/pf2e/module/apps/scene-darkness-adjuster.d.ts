import { ScenePF2e } from "../scene/index.ts";

export declare class SceneDarknessAdjuster extends Application {
    #private;
    static readonly instance: SceneDarknessAdjuster;
    static get defaultOptions(): ApplicationOptions;
    getData(options?: Partial<ApplicationOptions>): Promise<object>;
    render(force?: boolean, options?: RenderOptions & {
        scenes?: ScenePF2e[];
    }): this;
    /** Fade out before closing */
    close(options?: {
        force?: boolean;
    } & Record<string, unknown>): Promise<void>;
    activateListeners($html: JQuery): void;
    onLightingRefresh(darkness: number): void;
}
