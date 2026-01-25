import { DialogV2Configuration } from "#client/applications/api/dialog.mjs";
import { DocumentHTMLEmbedConfig } from "#client/applications/ux/text-editor.mjs";
import { ItemUUID } from "#client/documents/_module.mjs";
import { ToCompendiumOptions } from "#client/documents/abstract/_module.mjs";
import { DropCanvasData } from "#client/helpers/hooks.mjs";
import {
    DatabaseCreateCallbackOptions,
    DatabaseCreateOperation,
    DatabaseDeleteCallbackOptions,
    DatabaseDeleteOperation,
    DatabaseUpdateCallbackOptions,
    Document,
} from "#common/abstract/_module.mjs";
import { ImageFilePath, RollMode } from "#common/constants.mjs";
import { ItemInstances, ItemType } from "../types.ts";
import { ActorPF2e } from "./../../actor/base.ts";
import { ItemOriginFlag } from "./../../chat-message/data.ts";
import { ChatMessagePF2e } from "./../../chat-message/document.ts";
import { RuleElement, RuleElementOptions } from "./../../rules/index.ts";
import { EnrichmentOptionsPF2e, RollDataPF2e } from "./../../system/text-editor.ts";
import { PhysicalItemPF2e } from "./../index.ts";
import { ItemFlagsPF2e, ItemSourcePF2e, ItemSystemData, RawItemChatData, TraitChatData } from "./data/index.ts";
import { ItemDescriptionData, ItemTrait } from "./data/system.ts";
import { ItemSheetPF2e } from "./sheet/sheet.ts";
/** The basic `Item` subclass for the system */
declare class ItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends Item<TParent> {
    /** Additional item roll options not derived from an item's own data */
    specialOptions: string[];
    /** The item that granted this item, if any */
    grantedBy: ItemPF2e<ActorPF2e> | null;
    static getDefaultArtwork(itemData: foundry.documents.ItemSource): {
        img: ImageFilePath;
    };
    /** Traits an item of this type can have */
    static get validTraits(): Partial<Record<ItemTrait, string>>;
    /** Prepared rule elements from this item */
    rules: RuleElement[];
    /** The sluggified name of the item **/
    get slug(): string | null;
    /** The UUID of the item from which this one was copied (or is identical to if a compendium item) **/
    get sourceId(): ItemUUID | null;
    /** The recorded schema version of this item, updated after each data migration */
    get schemaVersion(): number | null;
    get description(): string;
    /** Check whether this item is in-memory-only on an actor rather than being a world item or embedded and stored */
    get inMemoryOnly(): boolean;
    /**
     * Set a source ID on a dropped embedded item without a full data reset
     * This is currently necessary as of 10.291 due to system measures to prevent premature data preparation
     */
    static fromDropData<T extends Document>(this: ConstructorOf<T>, data: object, options?: object): Promise<T | null>;
    /** Check this item's type (or whether it's one among multiple types) without a call to `instanceof` */
    isOfType<T extends ItemType>(...types: T[]): this is ItemInstances<TParent>[T];
    isOfType(type: "physical"): this is PhysicalItemPF2e<TParent>;
    isOfType<T extends "physical" | ItemType>(
        ...types: T[]
    ): this is T extends "physical"
        ? PhysicalItemPF2e<TParent>
        : T extends ItemType
          ? ItemInstances<TParent>[T]
          : never;
    /** Redirect the deletion of any owned items to ActorPF2e#deleteEmbeddedDocuments for a single workflow */
    delete(operation?: Partial<Omit<DatabaseDeleteOperation<TParent>, "parent" | "pack">>): Promise<this | undefined>;
    /** Generate a list of strings for use in predication */
    getRollOptions(
        prefix?: string,
        {
            includeGranter,
        }?: {
            includeGranter?: boolean | undefined;
        },
    ): string[];
    getRollData(): RollDataPF2e;
    /**
     * Create a chat card for this item and either return the message or send it to the chat log. Many cards contain
     * follow-up options for attack rolls, effect application, etc.
     */
    toMessage(
        event?: Maybe<Event>,
        options?: {
            rollMode?: RollMode | "roll";
            create?: boolean;
            data?: Record<string, unknown>;
        },
    ): Promise<ChatMessagePF2e | undefined>;
    /** A shortcut to `item.toMessage(..., { create: true })`, kept for backward compatibility */
    toChat(event?: Event): Promise<ChatMessagePF2e | undefined>;
    protected _initialize(options?: Record<string, unknown>): void;
    /** Ensure the presence of the pf2e flag scope with default properties and values */
    prepareBaseData(): void;
    prepareRuleElements(options?: Omit<RuleElementOptions, "parent">): RuleElement[];
    /** Pull the latest system data from the source compendium and replace this item's with it */
    refreshFromCompendium(options?: RefreshFromCompendiumParams): Promise<this | null>;
    exportToJSON(options?: ToCompendiumOptions): void;
    getOriginData(): ItemOriginFlag;
    /** Retrieves base description data before enriching. May be overriden to prepend or append additional data */
    protected getDescriptionData(): Promise<ItemDescriptionData>;
    /** Retrieves description and gm notes with all prepends and appends applied, and enriched */
    getDescription(
        htmlOptions?: EnrichmentOptionsPF2e & {
            includeAddendum?: boolean;
        },
    ): Promise<{
        value: string;
        gm: string;
    }>;
    /**
     * Internal method that transforms data into something that can be used for chat.
     * Currently renders description text using enrichHTML.
     */
    protected processChatData(
        htmlOptions: EnrichmentOptionsPF2e | undefined,
        chatData: RawItemChatData,
    ): Promise<RawItemChatData>;
    getChatData(htmlOptions?: EnrichmentOptionsPF2e, _rollOptions?: Record<string, unknown>): Promise<RawItemChatData>;
    traitChatData(dictionary?: Record<string, string | undefined>, traits?: ItemTrait[]): TraitChatData[];
    /** Don't allow the user to create a condition or spellcasting entry from the sidebar. */
    static createDialog<T extends Document>(
        this: ConstructorOf<T>,
        data?: Record<string, unknown>,
        createOptions?: Partial<DatabaseCreateOperation<Document | null>>,
        options?: {
            folders?: {
                id: string;
                name: string;
            }[];
            types?: string[];
            template?: string;
            context?: object;
        } & Partial<DialogV2Configuration>,
    ): Promise<T | null>;
    /** Assess and pre-process this JSON data, ensuring it's importable and fully migrated */
    importFromJSON(json: string): Promise<this>;
    /** Include the item type along with data from upstream */
    toDragData(): DropCanvasData & {
        itemType: string;
    };
    static createDocuments<TDocument extends Document>(
        this: ConstructorOf<TDocument>,
        data?: (TDocument | DeepPartial<TDocument["_source"]>)[],
        operation?: Partial<DatabaseCreateOperation<TDocument["parent"]>>,
    ): Promise<TDocument[]>;
    static deleteDocuments<TDocument extends Document>(
        this: ConstructorOf<TDocument>,
        ids?: string[],
        operation?: Partial<DatabaseDeleteOperation<TDocument["parent"]>>,
    ): Promise<TDocument[]>;
    protected _preCreate(
        data: DeepPartial<this["_source"]>,
        options: DatabaseCreateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    /** Keep `TextEditor` and anything else up to no good from setting this item's description to `null` */
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        options: DatabaseUpdateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    /** Call onCreate rule-element hooks */
    protected _onCreate(data: ItemSourcePF2e, options: DatabaseCreateCallbackOptions, userId: string): void;
    /** Refresh the Item Directory if this item isn't embedded */
    protected _onUpdate(
        data: DeepPartial<this["_source"]>,
        options: DatabaseUpdateCallbackOptions,
        userId: string,
    ): void;
    /** Call onDelete rule-element hooks */
    protected _onDelete(options: DatabaseDeleteCallbackOptions, userId: string): void;
    /** To be overridden by subclasses to extend the HTML string that will become part of the embed */
    protected embedHTMLString(_config: DocumentHTMLEmbedConfig, _options: EnrichmentOptionsPF2e): string;
    protected _buildEmbedHTML(
        config: DocumentHTMLEmbedConfig,
        options?: EnrichmentOptionsPF2e,
    ): Promise<HTMLCollection>;
}
interface ItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends Item<TParent> {
    constructor: typeof ItemPF2e;
    flags: ItemFlagsPF2e;
    readonly _source: ItemSourcePF2e;
    system: ItemSystemData;
    get sheet(): ItemSheetPF2e<this>;
    prepareSiblingData?(this: ItemPF2e<ActorPF2e>): void;
    prepareActorData?(this: ItemPF2e<ActorPF2e>): void;
    /** Optional data-preparation callback executed after rule-element synthetics are prepared */
    onPrepareSynthetics?(this: ItemPF2e<ActorPF2e>): void;
    /** Returns items that should also be added when this item is created */
    createGrantedItems?(options?: object): Promise<ItemPF2e[]>;
    /** Returns items that should also be deleted should this item be deleted */
    getLinkedItems?(): ItemPF2e<ActorPF2e>[];
}
/** A `Proxy` to to get Foundry to construct `ItemPF2e` subclasses */
declare const ItemProxyPF2e: typeof ItemPF2e;
interface RefreshFromCompendiumParams {
    /** Whether to overwrite the name if it is different */
    name?: boolean;
    /** Whether to notify the user that the item has been refreshed */
    notify?: boolean;
    /** Whether to run the update: if false, a clone with updated source is returned. */
    update?: boolean;
}
export { ItemPF2e, ItemProxyPF2e };
