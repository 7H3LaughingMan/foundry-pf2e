/**
 * A game settings configuration application
 * This form renders the settings defined via the game.settings.register API which have config = true
 *
 */
declare class SettingsConfig extends PackageConfiguration {
    protected override _prepareCategoryData(): { categories: object[]; total: number };
    protected override _onResetDefaults(event: Event): void;

    // @TODO: Declare
    protected override _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}

declare interface SettingsConfigCategory {
    id: string;
    title: string;
    menus: SettingSubmenuConfig[];
    settings: Required<SettingConfig & { id: string }>[];
    count: number;
}

declare interface SettingsConfigData extends PackageConfigurationData {
    total: number;
    canConfigure: boolean;
    user: User;
    categories: SettingsConfigCategory[];
}
