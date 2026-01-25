import { HandlebarsRenderOptions } from "#client/applications/api/handlebars-application.mjs";
import { ActorPF2e } from "./../actor/index.ts";
import { AbstractEffectPF2e } from "./../item/index.ts";
export declare class EffectsPanel extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    /**
     * Debounce and slightly delayed request to re-render this panel. Necessary for situations where it is not possible
     * to properly wait for promises to resolve before refreshing the UI.
     */
    refresh: (
        options?:
            | boolean
            | {
                  force?: boolean | undefined;
                  position?:
                      | {
                            top?: number | undefined;
                            left?: number | undefined;
                            width?: number | "auto" | undefined;
                            height?: number | "auto" | undefined;
                            scale?: number | undefined;
                            zIndex?: number | undefined;
                        }
                      | undefined;
                  window?:
                      | {
                            title?: string | undefined;
                            icon?: string | false | undefined;
                            controls?: boolean | undefined;
                        }
                      | undefined;
                  isFirstRender?: boolean | undefined;
              }
            | undefined,
    ) => void;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    protected _prepareContext(): Promise<EffectsPanelViewData>;
    protected _onFirstRender(context: EffectsPanelViewData, options: HandlebarsRenderOptions): Promise<void>;
    /** Move the panel to the right interface column. */
    _onRender(context: object, options: HandlebarsRenderOptions): Promise<void>;
}
interface EffectsPanelViewData extends fa.ApplicationRenderContext {
    afflictions: EffectViewData[];
    conditions: EffectViewData[];
    effects: EffectViewData[];
    actor: ActorPF2e | null;
    user: {
        isGM: boolean;
    };
}
interface EffectViewData {
    effect: AbstractEffectPF2e;
    description: string;
    remaining: string | null;
}
export {};
