import { KeybindingActionBinding } from "./../../../_types.mjs";
import { ApplicationRenderContext } from "./../../../applications/_module.mjs";
import CategoryBrowser, { CategoryBrowserConfiguration } from "./../../../applications/api/category-browser.mjs";
import {
    HandlebarsRenderOptions,
    HandlebarsTemplatePart,
} from "./../../../applications/api/handlebars-application.mjs";

/**
 * View and edit keybinding and (readonly) mouse actions.
 */
export default class ControlsConfig extends CategoryBrowser {
    static override DEFAULT_OPTIONS: DeepPartial<CategoryBrowserConfiguration>;

    static override PARTS: Record<string, HandlebarsTemplatePart>;

    /**
     * Faux "pointer bindings" for displaying as a readonly category
     */
    static POINTER_CONTROLS: readonly [id: string, name: string, parts: string[], gmOnly?: boolean][];

    /**
     * Transform an action binding into a human-readable string representation.
     */
    static humanizeBinding(binding: KeybindingActionBinding): string;

    protected override _configureRenderOptions(options: DeepPartial<HandlebarsRenderOptions>): void;

    protected override _prepareCategoryData(): Promise<
        Record<string, { id: string; label: string; entries: object[] }>
    >;

    protected override _onFirstRender(
        context: ApplicationRenderContext,
        options: HandlebarsRenderOptions,
    ): Promise<void>;
}
