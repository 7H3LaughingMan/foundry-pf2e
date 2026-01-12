import { ApplicationRenderContext, ApplicationRenderOptions } from "./../applications/_module.mjs";
import type { DialogV2 } from "./../applications/api/_module.mjs";
import type { CombatTrackerConfig } from "./../applications/apps/_module.mjs";
import HeadsUpDisplayContainer from "./../applications/hud/container.mjs";
import { PlaceableHUDContext } from "./../applications/hud/placeable-hud.mjs";
import SettingsConfig from "./../applications/settings/config.mjs";
import ChatPopout from "./../applications/sidebar/apps/chat-popout.mjs";
import RegionLegend from "./../applications/ui/region-legend.mjs";
import { ContextMenuEntry } from "./../applications/ux/context-menu.mjs";
import Canvas from "./../canvas/board.mjs";
import LightingLayer from "./../canvas/layers/lighting.mjs";
import Token from "./../canvas/placeables/token.mjs";
import {
    Actor,
    ChatMessage,
    Combat,
    Item,
    JournalEntry,
    JournalEntryPage,
    Macro,
    Scene,
    TokenDocument,
    User,
} from "./../documents/_module.mjs";
import { DocumentUUID } from "./../utils/helpers.mjs";
import { DatabaseCreateOperation } from "./../../common/abstract/_types.mjs";
import Document from "./../../common/abstract/document.mjs";
import type ApplicationV2 from "../applications/api/application.mjs";
import type TokenHUD from "../applications/hud/token-hud.mjs";
import { ChatLog, CompendiumDirectory, ItemDirectory, Settings } from "../applications/sidebar/tabs/_module.mjs";
import type ActorDirectory from "../applications/sidebar/tabs/actor-directory.mjs";
import type Hotbar from "../applications/ui/hotbar.mjs";
import type SceneControls from "../applications/ui/scene-controls.mjs";
import type { SceneControl } from "../applications/ui/scene-controls.mjs";
import Application from "../appv1/api/application-v1.mjs";
import Dialog from "../appv1/api/dialog-v1.mjs";
import { JournalPageSheet, JournalTextPageSheet } from "../appv1/sheets/journal-page-sheet.mjs";

interface HookedFunction {
    hook: string;
    id: number;
    fn: (...args: unknown[]) => boolean | void | Promise<boolean | void>;
    once: boolean;
}

type HookCallback<P extends unknown[]> = (...args: P) => boolean | void | Promise<boolean | void>;
type HookParameters<H extends string, C extends unknown[]> = [hook: H, callback: HookCallback<C>];

// Sequence of hooks called on world load
type HookParamsInit = HookParameters<"init", never[]>;
type HookParamsSetup = HookParameters<"setup", never[]>;
type HookParamsI18nInit = HookParameters<"i18nInit", never[]>;
type HookParamsCanvasInit = HookParameters<"canvasInit", [Canvas]>;
type HookParamsCanvasReady = HookParameters<"canvasReady", [Canvas]>;
type HookParamsReady = HookParameters<"ready", never[]>;

type HookParamsClose<T extends ApplicationV2, N extends string> = HookParameters<`close${N}`, [T]>;
type HookParamsDeleteCombat = HookParameters<"deleteCombat", [Combat, { [key: string]: unknown }, string]>;
type HookParamsDropCanvasData = HookParameters<"dropCanvasData", [Canvas, DropCanvasData, DragEvent]>;
type HookParamsGetChatLogEntryContext = HookParameters<"getChatLogEntryContext", [HTMLElement, ContextMenuEntry[]]>;
type HookParamsGetSceneControlButtons = HookParameters<"getSceneControlButtons", [Record<string, SceneControl>]>;
type HookParamsHotbarDrop = HookParameters<"hotbarDrop", [Hotbar<Macro>, DropCanvasData, string]>;
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
type HookParamsRender<
    T extends Application | ApplicationV2,
    N extends string,
    C extends ApplicationRenderContext = ApplicationRenderContext,
> = HookParameters<
    `render${N}`,
    T extends Application
        ? [T, JQuery, Awaited<ReturnType<T["getData"]>>]
        : [T, HTMLElement, C, ApplicationRenderOptions]
>;
type HookParamsRenderChatMessageHTML = HookParameters<"renderChatMessageHTML", [ChatMessage, string, object]>;
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

export namespace Hooks {
    /** A mapping of hook events which have functions registered to them. */
    let events: Record<string, HookedFunction>;

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
    function on(...args: HookParamsRender<ChatLog, "ChatLog">): number;
    function on(...args: HookParamsRender<ChatPopout, "ChatPopout">): number;
    function on(...args: HookParamsRender<CombatTrackerConfig, "CombatTrackerConfig">): number;
    function on(...args: HookParamsRender<CompendiumDirectory, "CompendiumDirectory">): number;
    function on(...args: HookParamsRender<Dialog, "Dialog">): number;
    function on(...args: HookParamsRender<DialogV2, "DialogV2">): number;
    function on(...args: HookParamsRender<ActorDirectory<Actor<null>>, "ActorDirectory">): number;
    function on(...args: HookParamsRender<HeadsUpDisplayContainer, "HeadsUpDisplayContainer">): number;
    function on(...args: HookParamsRender<ItemDirectory<Item<null>>, "ItemDirectory">): number;
    function on(...args: HookParamsRender<SceneControls, "SceneControls">): number;
    function on(...args: HookParamsRender<Settings, "Settings">): number;
    function on(...args: HookParamsRender<SettingsConfig, "SettingsConfig">): number;
    function on(...args: HookParamsRender<TokenHUD, "TokenHUD", PlaceableHUDContext>): number;
    function on(...args: HookParamsRenderChatMessageHTML): number;
    function on(
        ...args: HookParamsRender<JournalPageSheet<JournalEntryPage<JournalEntry | null>>, "JournalPageSheet">
    ): number;
    function on(
        ...args: HookParamsRender<JournalTextPageSheet<JournalEntryPage<JournalEntry | null>>, "JournalTextPageSheet">
    ): number;
    function on(...args: HookParamsRender<RegionLegend, "RegionLegend">): number;
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
        ...args: HookParamsRender<JournalTextPageSheet<JournalEntryPage<JournalEntry | null>>, "JournalTextPageSheet">
    ): number;
    function once(...args: HookParamsRender<SceneControls, "SceneControls">): number;
    function once(...args: HookParamsRender<Settings, "Settings">): number;
    function once(...args: HookParamsRender<SettingsConfig, "SettingsConfig">): number;
    function once(...args: HookParamsRender<TokenHUD, "TokenHUD">): number;
    function once(...args: HookParamsRenderChatMessageHTML): number;
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
    function off(hook: string, fn: (...args: any[]) => boolean | void | Promise<boolean | void>): void;
    function off(hook: string, fn: number): void;

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

export interface DropCanvasData<T extends string = string, D extends object = object> {
    type?: T;
    data?: D extends Document ? D["_source"] : D;
    uuid?: DocumentUUID;
    id?: string;
    pack?: string;
    x: number;
    y: number;
    documentName?: string;
    actorId?: string;
    tokenId?: string;
}
