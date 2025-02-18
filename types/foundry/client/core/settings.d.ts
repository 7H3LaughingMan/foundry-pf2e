export {};

declare global {
    interface ClientSettingsStorage extends Map<string, Storage | WorldSettings> {
        get(key: "client"): Storage;
        get(key: "world"): WorldSettings;
    }

    /**
     * An abstract interface for defining setting storage patterns
     * Each setting is a key/value pair
     */
    class ClientSettings {
        /** An object of registered game settings for this scope */
        settings: ClientSettingsMap;

        /** Registered settings menus which trigger secondary applications */
        menus: Map<string, SettingSubmenuConfig>;

        /**
         * The storage interfaces used for persisting settings
         * Each storage interface shares the same API as window.localStorage
         */
        storage: ClientSettingsStorage;

        constructor(worldSettings: SettingConfig);

        /** Return a singleton instance of the Game Settings Configuration app */
        get sheet(): SettingsConfig;

        /**
         * Register a new game setting under this setting scope
         *
         * @param module   The namespace under which the setting is registered
         * @param key      The key name for the setting under the namespace module
         * @param data     Configuration for setting data
         *
         * @example
         * // Register a client setting
         * game.settings.register("myModule", "myClientSetting", {
         *   name: "Register a Module Setting with Choices",
         *   hint: "A description of the registered setting and its behavior.",
         *   scope: "client",     // This specifies a client-stored setting
         *   config: true,        // This specifies that the setting appears in the configuration view
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
         *
         * @example
         * // Register a world setting
         * game.settings.register("myModule", "myWorldSetting", {
         *   name: "Register a Module Setting with a Range slider",
         *   hint: "A description of the registered setting and its behavior.",
         *   scope: "world",      // This specifies a world-level setting
         *   config: true,        // This specifies that the setting appears in the configuration view
         *   type: Number,
         *   range: {             // If range is specified, the resulting setting will be a range slider
         *     min: 0,
         *     max: 100,
         *     step: 10
         *   }
         *   default: 50,         // The default value for the setting
         *   onChange: value => { // A callback function which triggers when the setting is changed
         *     console.log(value)
         *   }
         * });
         */
        register<TChoices extends Record<string, unknown> | undefined>(
            module: string,
            key: string,
            data: SettingRegistration<TChoices>,
        ): void;

        /**
         * Register a new sub-settings menu
         *
         * @param module   The namespace under which the menu is registered
         * @param key      The key name for the setting under the namespace module
         * @param data     Configuration for setting data
         *
         * @example
         * // Define a settings submenu which handles advanced configuration needs
         * game.settings.registerMenu("myModule", "mySettingsMenu", {
         *   name: "My Settings Submenu",
         *   label: "Settings Menu Label",      // The text label used in the button
         *   hint: "A description of what will occur in the submenu dialog.",
         *   icon: "fas fa-bars",               // A Font Awesome icon used in the submenu button
         *   type: MySubmenuApplicationClass,   // A FormApplication subclass which should be created
         *   restricted: true                   // Restrict this submenu to gamemaster only?
         * });
         */
        registerMenu(module: string, key: string, data: SettingSubmenuConfig): void;

        /**
         * Get the value of a game setting for a certain module and setting key
         * @param module    The module namespace under which the setting is registered
         * @param key       The setting key to retrieve
         */
        get(
            module: "core",
            key: "compendiumConfiguration",
        ): Record<string, { locked?: boolean; folder?: string; sort?: number }>;
        get(module: "core", key: "defaultToken"): Partial<foundry.data.PrototypeTokenSource>;
        get(module: "core", key: "fontSize"): number;
        get(module: "core", key: "noCanvas"): boolean;
        get(module: "core", key: "rollMode"): RollMode;
        get<TSetting>(module: string, key: string): TSetting;

        /**
         * Get the value of a game setting for a certain module and setting key
         * @param module    The module namespace under which the setting is registered
         * @param key   The setting key to retrieve
         * @param value The data to assign to the setting key
         */
        set<TSetting>(module: string, key: string, value: TSetting): Promise<TSetting>;
    }

    interface SettingRegistration<
        TChoices extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
    > extends Omit<SettingConfig<TChoices>, "config" | "key" | "namespace" | "scope"> {
        config?: boolean;
        scope?: "client" | "world";
        filePicker?: true | "audio" | "image" | "video" | "imagevideo" | "folder";
    }

    interface ClientSettingsMap extends Map<string, SettingConfig> {
        get(key: "core.chatBubblesPan"): SettingConfig & { default: boolean };
        get(key: "core.defaultToken"): SettingConfig & { default: PreCreate<foundry.data.PrototypeTokenSource> };
        get(key: "core.dynamicTokenRingFitMode"): SettingConfig & { default: "grid" | "subject" };
        get(key: "core.notesDisplayToggle"): SettingConfig & { default: boolean };
        get<TDefault>(key: string): SettingConfig & { default: TDefault };
    }

    /**
     * The Collection of Setting documents which exist within the active World.
     * This collection is accessible as game.settings.storage.get("world")
     * @extends {WorldCollection}
     *
     * @see {@link Setting} The Setting document
     */
    class WorldSettings extends WorldCollection<Setting> {
        /**
         * Return the Setting document with the given key.
         * @param key The setting key
         */
        getSetting(key: string): Setting;

        /**
         * Return the serialized value of the world setting as a string
         * @param key The setting key
         */
        getItem(key: string): string | null;
    }
}
