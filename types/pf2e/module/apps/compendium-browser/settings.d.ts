declare class CompendiumBrowserSettingsApp extends fa.api.HandlebarsApplicationMixin(fa.api.ApplicationV2) {
    #private;
    static DEFAULT_OPTIONS: DeepPartial<fa.ApplicationConfiguration>;
    static PARTS: Record<string, fa.api.HandlebarsTemplatePart>;
    tabGroups: Record<string, string>;
    protected _preFirstRender(context: Record<string, unknown>, options: fa.ApplicationRenderOptions): Promise<void>;
    protected _attachPartListeners(partId: string, html: HTMLElement, options: fa.api.HandlebarsRenderOptions): void;
    protected _prepareContext(_options: fa.api.HandlebarsRenderOptions): Promise<object>;
}
export { CompendiumBrowserSettingsApp };
