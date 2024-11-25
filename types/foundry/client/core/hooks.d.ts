import type ApplicationV2 from "../../client-esm/applications/api/application.d.ts";

export {};
declare global {
    type HookCallback<P extends unknown[]> = (...args: P) => boolean | void | Promise<boolean | void>;
    type HookParameters<H extends string, C extends unknown[]> = [hook: H, callback: HookCallback<C>];

    // Sequence of hooks called on world load
    type HookParamsInit = HookParameters<"init", never>;
    type HookParamsSetup = HookParameters<"setup", never>;
    type HookParamsI18nInit = HookParameters<"i18nInit", never>;
    type HookParamsCanvasInit = HookParameters<"canvasInit", [DrawnCanvas]>;
    type HookParamsCanvasReady = HookParameters<"canvasReady", [DrawnCanvas]>;
    type HookParamsReady = HookParameters<"ready", never>;

    type HookParamsClose<T extends Application, N extends string> = HookParameters<`close${N}`, [T, JQuery]>;
    type HookParamsDeleteCombat = HookParameters<"deleteCombat", [Combat, { [key: string]: unknown }, string]>;
    type HookParamsDropCanvasData = HookParameters<"dropCanvasData", [Canvas, DropCanvasData]>;
    type HookParamsGetChatLogEntryContext = HookParameters<"getChatLogEntryContext", [JQuery, EntryContextOption[]]>;
    type HookParamsGetSceneControlButtons = HookParameters<"getSceneControlButtons", [SceneControl[]]>;
    type HookParamsHotbarDrop = HookParameters<"hotbarDrop", [Hotbar, unknown, string]>;
    type HookParamsLightingRefresh = HookParameters<"lightingRefresh", [LightingLayer]>;
    type HookParamsPreCreateItem = HookParameters<
        "preCreateItem",
        [PreCreate<foundry.documents.ItemSource>, DatabaseCreateOperation<Actor | null>, string]
    >;
    type HooksParamsPreUpdateCombat = HookParameters<
        "preUpdateCombat",
        [Combat, object, { diff: boolean; advanceTime: number; [key: string]: unknown }, string]
    >;
    type HookParamsPreUpdateToken = HookParameters<
        "preUpdateToken",
        [
            Scene,
            foundry.documents.TokenSource,
            DeepPartial<foundry.documents.TokenSource>,
            { diff: boolean; [key: string]: unknown },
            string,
        ]
    >;
    type HookParamsRender<T extends Application | ApplicationV2, N extends string> = HookParameters<
        `render${N}`,
        T extends Application ? [T, JQuery, Awaited<ReturnType<T["getData"]>>] : [T, HTMLElement]
    >;
    type HookParamsRenderChatMessage = HookParameters<
        "renderChatMessage",
        [ChatMessage, JQuery, foundry.documents.ChatMessageSource]
    >;
    type HookParamsRenderSettingsConfig = HookParameters<
        "renderSettingsConfig",
        [SettingsConfig, JQuery, ReturnType<SettingsConfig["_prepareCategoryData"]>]
    >;
    type HookParamsTargetToken = HookParameters<"targetToken", [User, Token<TokenDocument<Scene>>, boolean]>;
    type HookParamsUpdate<T extends foundry.abstract.Document, N extends string> = HookParameters<
        `update${N}`,
        [T, Record<string, unknown>, DatabaseCreateOperation<T["parent"]>]
    >;
    type HookParamsUpdateWorldTime = HookParameters<"updateWorldTime", [number, number]>;
    type HookParamsGetProseMirrorMenuDropDowns = HookParameters<
        "getProseMirrorMenuDropDowns",
        [foundry.prosemirror.ProseMirrorMenu, Record<string, ProseMirrorDropDownConfig>]
    >;

    namespace Hooks {
        /**
         * Register a callback handler which should be triggered when a hook is triggered.
         *
         * @param hook The unique name of the hooked event
         * @param fn   The callback function which should be triggered when the hook event occurs
         */
        function on(...args: HookParamsSetup): number;
        function on(...args: HookParamsInit): number;
        function on(...args: HookParamsReady): number;
        function on(...args: HookParamsI18nInit): number;
        function on(...args: HookParamsCanvasInit): number;
        function on(...args: HookParamsCanvasReady): number;
        function on(...args: HookParamsClose<CombatTrackerConfig, "CombatTrackerConfig">): number;
        function on(...args: HookParamsDropCanvasData): number;
        function on(...args: HookParamsGetChatLogEntryContext): number;
        function on(...args: HookParamsGetSceneControlButtons): number;
        function on(...args: HookParamsHotbarDrop): number;
        function on(...args: HookParamsLightingRefresh): number;
        function on(...args: HookParamsPreCreateItem): number;
        function on(...args: HooksParamsPreUpdateCombat): number;
        function on(...args: HookParamsPreUpdateToken): number;
        function on(...args: HookParamsRenderChatMessage): number;
        function on(...args: HookParamsRenderSettingsConfig): number;
        function on(...args: HookParamsRender<ChatLog, "ChatLog">): number;
        function on(...args: HookParamsRender<ChatPopout, "ChatPopout">): number;
        function on(...args: HookParamsRender<CombatTrackerConfig, "CombatTrackerConfig">): number;
        function on(...args: HookParamsRender<CompendiumDirectory, "CompendiumDirectory">): number;
        function on(...args: HookParamsRender<Dialog, "Dialog">): number;
        function on(...args: HookParamsRender<ActorDirectory<Actor<null>>, "ActorDirectory">): number;
        function on(...args: HookParamsRender<ItemDirectory<Item<null>>, "ItemDirectory">): number;
        function on(...args: HookParamsRender<SceneControls, "SceneControls">): number;
        function on(...args: HookParamsRender<Settings, "Settings">): number;
        function on(...args: HookParamsRender<SettingsConfig, "SettingsConfig">): number;
        function on(...args: HookParamsRender<TokenHUD, "TokenHUD">): number;
        function on(
            ...args: HookParamsRender<JournalPageSheet<JournalEntryPage<JournalEntry | null>>, "JournalPageSheet">
        ): number;
        function on(
            ...args: HookParamsRender<
                JournalTextPageSheet<JournalEntryPage<JournalEntry | null>>,
                "JournalTextPageSheet"
            >
        ): number;
        function on(...args: HookParamsRender<ApplicationV2, "RegionLegend">): number;
        function on(...args: HookParamsTargetToken): number;
        function on(...args: HookParamsUpdate<Combat, "Combat">): number;
        function on(...args: HookParamsUpdate<Scene, "Scene">): number;
        function on(...args: HookParamsUpdateWorldTime): number;
        function on(...args: HookParamsGetProseMirrorMenuDropDowns): number;
        function on(...args: HookParameters<string, any[]>): number;

        /**
         * Register a callback handler for an event which is only triggered once the first time the event occurs.
         * After a "once" hook is triggered the hook is automatically removed.
         *
         * @param hook  The unique name of the hooked event
         * @param fn    The callback function which should be triggered when the hook event occurs
         */
        function once(...args: HookParamsSetup): number;
        function once(...args: HookParamsInit): number;
        function once(...args: HookParamsReady): number;
        function once(...args: HookParamsCanvasInit): number;
        function once(...args: HookParamsCanvasReady): number;
        function once(...args: HookParamsClose<CombatTrackerConfig, "CombatTrackerConfig">): number;
        function once(...args: HookParamsDropCanvasData): number;
        function once(...args: HookParamsGetChatLogEntryContext): number;
        function once(...args: HookParamsGetSceneControlButtons): number;
        function once(...args: HookParamsHotbarDrop): number;
        function once(...args: HookParamsLightingRefresh): number;
        function once(...args: HookParamsPreCreateItem): number;
        function once(...args: HookParamsPreUpdateToken): number;
        function once(...args: HookParamsRenderChatMessage): number;
        function once(...args: HookParamsRenderSettingsConfig): number;
        function once(...args: HookParamsRender<ActorDirectory<Actor<null>>, "ActorDirectory">): number;
        function once(...args: HookParamsRender<ChatLog, "ChatLog">): number;
        function once(...args: HookParamsRender<ChatPopout, "ChatPopout">): number;
        function once(...args: HookParamsRender<CombatTrackerConfig, "CombatTrackerConfig">): number;
        function once(...args: HookParamsRender<CompendiumDirectory, "CompendiumDirectory">): number;
        function once(...args: HookParamsRender<Dialog, "Dialog">): number;
        function once(...args: HookParamsRender<ItemDirectory<Item<null>>, "ItemDirectory">): number;
        function once(
            ...args: HookParamsRender<JournalPageSheet<JournalEntryPage<JournalEntry | null>>, "JournalPageSheet">
        ): number;
        function once(
            ...args: HookParamsRender<
                JournalTextPageSheet<JournalEntryPage<JournalEntry | null>>,
                "JournalTextPageSheet"
            >
        ): number;
        function once(...args: HookParamsRender<SceneControls, "SceneControls">): number;
        function once(...args: HookParamsRender<Settings, "Settings">): number;
        function once(...args: HookParamsRender<TokenHUD, "TokenHUD">): number;
        function once(...args: HookParamsTargetToken): number;
        function once(...args: HookParamsUpdate<Combat, "Combat">): number;
        function once(...args: HookParamsUpdate<Scene, "Scene">): number;
        function once(...args: HookParamsUpdateWorldTime): number;
        function once(...args: HookParamsI18nInit): number;
        function once(...args: HookParameters<string, any[]>): number;

        /**
         * Unregister a callback handler for a particular hook event
         *
         * @param hook  The unique name of the hooked event
         * @param fn    The function that should be removed from the set of hooked callbacks
         */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function off(hook: string, fn: (...args: any[]) => boolean | void | Promise<boolean | void>): void;

        /**
         * Call all hook listeners in the order in which they were registered
         * Hooks called this way can not be handled by returning false and will always trigger every hook callback.
         *
         * @param hook  The hook being triggered
         * @param args  Arguments passed to the hook callback functions
         */
        function callAll(hook: string, ...args: unknown[]): boolean;

        /**
         * Call hook listeners in the order in which they were registered.
         * Continue calling hooks until either all have been called or one returns `false`.
         *
         * Hook listeners which return `false` denote that the original event has been adequately handled and no further
         * hooks should be called.
         *
         * @param hook  The hook being triggered
         * @param args  Arguments passed to the hook callback functions
         */
        function call(hook: string, ...args: unknown[]): boolean;
    }

    interface DropCanvasData<T extends string = string, D extends object = object> {
        type?: T;
        data?: D extends foundry.abstract.Document ? D["_source"] : D;
        uuid?: DocumentUUID;
        id?: string;
        pack?: string;
        x: number;
        y: number;
        documentName?: string;
        actorId?: string;
        tokenId?: string;
    }
}
