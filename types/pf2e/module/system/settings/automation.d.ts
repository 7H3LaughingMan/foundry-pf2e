import { PartialSettingsData, SettingsMenuPF2e } from "./menu.ts";
type ConfigPF2eListName = (typeof AutomationSettings.SETTINGS)[number];
export declare class AutomationSettings extends SettingsMenuPF2e {
    static readonly namespace = "automation";
    static readonly SETTINGS: readonly [
        "rulesBasedVision",
        "iwr",
        "removeExpiredEffects",
        "flankingDetection",
        "encumbrance",
        "lootableNPCs",
        "reachEnforcement",
    ];
    static get defaultOptions(): fav1.api.FormApplicationOptions;
    protected static get settings(): Record<ConfigPF2eListName, PartialSettingsData>;
}
export {};
