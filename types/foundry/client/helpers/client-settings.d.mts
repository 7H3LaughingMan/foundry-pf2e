import { RollMode } from "./../../common/constants.mjs";
import Collection from "./../../common/utils/collection.mjs";
import { SettingConfig, SettingSubmenuConfig } from "./../_types.mjs";
import ApplicationV2 from "./../applications/api/application.mjs";
import SettingsConfig from "./../applications/settings/config.mjs";
import Application from "./../appv1/api/application-v1.mjs";
import Setting from "./../documents/setting.mjs";

export interface ClientSettingsStorage extends Map<"client" | "world" | "user", Storage | WorldSettings> {
    get(key: "client"): Storage;
    get(key: "world"): WorldSettings;
    get(key: "user"): WorldSettings;
}

/**
 * An abstract interface for defining setting storage patterns
 * Each setting is a key/value pair
 */
export default class ClientSettings {
    /** An object of registered game settings for this scope */
    settings: ClientSettingsMap;

    /** Registered settings menus which trigger secondary applications */
    menus: Map<string, { type: ConstructorOf<Application> | ConstructorOf<ApplicationV2> }>;

    /**
     * The storage interfaces used for persisting settings
     * Each storage interface shares the same API as window.localStorage
     */
    storage: ClientSettingsStorage;

    constructor(worldSettings: SettingConfig);

    /** Return a singleton instance of the Game Settings Configuration app */
    get sheet(): SettingsConfig;

    /**
     * Register a new namespaced game setting. The setting's scope determines where the setting is saved.
     * World - World settings are applied to everyone in the World. Use this for settings like system rule variants that
     * everyone must abide by.
     * User - User settings are applied to an individual user. Use this for settings that are a player's personal
     * preference, like 3D dice skins.
     * Client - Client settings are applied to the browser or client used to access the World. Use this for settings that
     * are affected by the client itself, such as screen dimensions, resolution, or performance.
     *
     * @param namespace The namespace under which the setting is registered
     * @param key The key name for the setting under the namespace
     * @param data Configuration for setting data
     *
     * @example Register a client setting
     * ```js
     * game.settings.register("myModule", "myClientSetting", {
     *   name: "Register a Module Setting with Choices",
     *   hint: "A description of the registered setting and its behavior.",
     *   scope: "client",     // This specifies a client-stored setting
     *   config: true,        // This specifies that the setting appears in the configuration view
     *   requiresReload: true // This will prompt the user to reload the application for the setting to take effect.
     *   type: String,
     *   choices: {           // If choices are defined, the resulting setting will be a select menu
     *     "a": "Option A",
     *     "b": "Option B"
     *   },
     *   default: "a",        // The default value for the setting
     *   onChange: value => { // A callback function which triggers when the setting is changed
     *     console.log(value)
     *   }
     * });
     * ```
     *
     * @example Register a world setting
     * ```js
     * game.settings.register("myModule", "myWorldSetting", {
     *   name: "Register a Module Setting with a Range slider",
     *   hint: "A description of the registered setting and its behavior.",
     *   scope: "world",      // This specifies a world-level setting
     *   config: true,        // This specifies that the setting appears in the configuration view
     *   requiresReload: true // This will prompt the GM to have all clients reload the application for the setting to
     *                        // take effect.
     *   type: new foundry.fields.NumberField({nullable: false, min: 0, max: 100, step: 10}),
     *   default: 50,         // The default value for the setting
     *   onChange: value => { // A callback function which triggers when the setting is changed
     *     console.log(value)
     *   }
     * });
     * ```
     *
     * @example Register a user setting
     * ```js
     * game.settings.register("myModule", "myUserSetting", {
     *   name: "Register a Module Setting with a checkbox",
     *   hint: "A description of the registered setting and its behavior.",
     *   scope: "user",       // This specifies a user-level setting
     *   config: true,        // This specifies that the setting appears in the configuration view
     *   type: new foundry.fields.BooleanField(),
     *   default: false
     * });
     * ```
     */
    register<TChoices extends Record<string, unknown> | undefined>(
        namespace: string,
        key: string,
        data: SettingRegistration<TChoices>,
    ): void;

    /**
     * Register a new sub-settings menu
     *
     * @param namespace The namespace under which the menu is registered
     * @param key The key name for the setting under the namespace
     * @param data Configuration for setting data
     *
     * @example Define a settings submenu which handles advanced configuration needs
     * ```js
     * game.settings.registerMenu("myModule", "mySettingsMenu", {
     *   name: "My Settings Submenu",
     *   label: "Settings Menu Label",      // The text label used in the button
     *   hint: "A description of what will occur in the submenu dialog.",
     *   icon: "fa-solid fa-bars",               // A Font Awesome icon used in the submenu button
     *   type: MySubmenuApplicationClass,   // A FormApplication subclass which should be created
     *   restricted: true                   // Restrict this submenu to gamemaster only?
     * });
     * ```
     */
    registerMenu(namespace: string, key: string, data: SettingSubmenuConfig): void;
}

export default interface ClientSettings {
    /**
     * Get the value of a game setting for a certain namespace and setting key
     *
     * @param namespace The namespace under which the setting is registered
     * @param key The setting key to retrieve
     * @param document Retrieve the full Setting document instance instead of just its value
     * @returns The current value or the Setting document instance
     *
     * @example Retrieve the current setting value
     * ```js
     * game.settings.get("myModule", "myClientSetting");
     * ````
     */
    get(namespace: "core", key: "compendiumConfiguration"): Record<string, { private: boolean; locked: boolean }>;
    get(namespace: "core", key: "fontSize"): number;
    get(namespace: "core", key: "noCanvas"): boolean;
    get(namespace: "core", key: "rollMode"): RollMode;
    get(namespace: "core", key: "uiConfig"): { colorScheme: { applications: string; interface: string } };
    get<D extends boolean>(
        namespace: string,
        key: string,
        { document }?: { document?: D },
    ): D extends true ? Setting : unknown;

    /**
     * Set the value of a game setting for a certain namespace and setting key
     *
     * @param namespace The namespace under which the setting is registered
     * @param key The setting key to retrieve
     * @param value The data to assign to the setting key
     * @param options Additional options passed to the server when updating world-scope settings
     * @param document Return the updated Setting document instead of just its value
     * @returns The assigned setting value or the Setting document instance
     *
     * @example Update the current value of a setting
     * ```js
     * game.settings.set("myModule", "myClientSetting", "b");
     * ```
     */
    set<D extends boolean>(
        namespace: string,
        key: string,
        value: unknown,
        { document, ...options }?: { document?: D },
    ): D extends true ? Promise<Setting> : Promise<unknown>;
}

interface SettingRegistration<
    TChoices extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> extends Omit<SettingConfig<TChoices>, "config" | "key" | "namespace" | "scope"> {
    config?: boolean;
    scope?: "world" | "client" | "user";
}

interface ClientSettingsMap extends Map<string, SettingConfig> {
    get(key: "core.chatBubblesPan"): SettingConfig & { default: boolean };
    get(key: "core.combatTrackerConfig"): SettingConfig & {
        default: {
            resource: string;
            skipDefeated: boolean;
            turnMarker: { enabled: boolean; animation: string; src: string; disposition: boolean };
        };
    };
    get(key: "core.dynamicTokenRing"): SettingConfig & { default: string };
    get(key: "core.dynamicTokenRingFitMode"): SettingConfig & { default: "grid" | "subject" };
    get(key: "core.notesDisplayToggle"): SettingConfig & { default: boolean };
    get(key: "core.tokenAutoRotate"): SettingConfig & { default: boolean };
    get(key: string): SettingConfig | undefined;
}

/** A simple interface for World settings storage which imitates the API provided by localStorage */
export class WorldSettings extends Collection<string, Setting> {
    constructor(settings: object);

    getItem(key: string): string | null;

    setItem(key: string, value: unknown): void;
}
