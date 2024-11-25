/**
 * The Application responsible for displaying and editing the client and world settings for this world.
 * This form renders the settings defined via the game.settings.register API which have config = true
 */
declare class SettingsConfig extends PackageConfiguration {
    static override get defaultOptions(): FormApplicationOptions;

    protected override _prepareCategoryData(): {
        categories: {
            id: string;
            title: string;
            menus: SettingSubmenuConfig[];
            settings: Required<SettingConfig & { id: string }>[];
            count: number;
        }[];
        total: number;
        user: User;
        canConfigure: boolean;
    };

    override activateListeners(html: JQuery): void;

    /**
     * Handle activating the button to configure User Role permissions
     *
     * @param event     The initial button click event
     */
    _onClickSubmenu(event: Event): Application;

    /**
     * Preview font scaling as the setting is changed.
     *
     * @param event     The triggering event.
     */
    _previewFontScaling(event: Event): void;

    override close(options?: { force?: boolean }): Promise<void>;

    protected override _updateObject(event: Event, formData: Record<string, unknown>): Promise<unknown>;

    /**
     * Handle button click to reset default settings
     *
     * @param event     The initial button click event
     */
    _onResetDefaults(event: Event): void;

    /**
     * Confirm if the user wishes to reload the application.
     *
     * @param options           Additional options to configure the prompt.
     * @param options.world     Whether to reload all connected clients as well.
     */
    static reloadConfirm(options?: { world?: boolean }): Promise<void>;
}
