import type { ApplicationConfiguration, ApplicationRenderOptions } from "../../../../foundry/client-esm/applications/_types.ts";
import type { HandlebarsRenderOptions, HandlebarsTemplatePart } from "../../../../foundry/client-esm/applications/api/handlebars-application.ts";
import type { PackInfo, TabName } from "./data.ts";

declare class CompendiumBrowserSettingsApp extends foundry.applications.api.HandlebarsApplicationMixin(foundry.applications.api.ApplicationV2) {
    #tabSettings: Record<TabName, CompendiumBrowserSettingsData>;

    static override DEFAULT_OPTIONS: DeepPartial<ApplicationConfiguration>;

    static override PARTS: Record<string, HandlebarsTemplatePart>;

    override tabGroups: Record<string, string>;

    protected override _preFirstRender(
        context: Record<string, unknown>,
        options: ApplicationRenderOptions,
    ): Promise<void>

    protected override _attachPartListeners(partId: string, html: HTMLElement, options: HandlebarsRenderOptions): void;

    protected override _prepareContext(_options: ApplicationRenderOptions): Promise<object>;

    static #onSubmit(
        _event: SubmitEvent | Event,
        _form: HTMLFormElement,
        formData: FormDataExtended,
    ): Promise<void>;
}

interface CompendiumBrowserSettingsData {
    label: string;
    settings?: Record<string, PackInfo | undefined> | null;
    hidden?: boolean;
}

export { CompendiumBrowserSettingsApp };
