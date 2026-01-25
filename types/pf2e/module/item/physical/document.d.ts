import { ItemUUID } from "#client/documents/_module.mjs";
import { DocumentConstructionContext } from "#common/_types.mjs";
import {
    DatabaseCreateCallbackOptions,
    DatabaseDeleteOperation,
    DatabaseUpdateCallbackOptions,
    DatabaseUpdateOperation,
} from "#common/abstract/_types.mjs";
import { ActorPF2e } from "./../../actor/index.ts";
import { Rarity, Size, ZeroToTwo } from "./../../data.ts";
import { RuleElement, RuleElementOptions } from "./../../rules/index.ts";
import { EffectSpinoff } from "./../../rules/rule-element/effect-spinoff/spinoff.ts";
import { ItemSourcePF2e, PhysicalItemSource, RawItemChatData, TraitChatData } from "./../base/data/index.ts";
import { ContainerPF2e, ItemPF2e } from "./../index.ts";
import { Bulk } from "./bulk.ts";
import {
    IdentificationStatus,
    ItemCarryType,
    ItemMaterialData,
    MystifiedData,
    PhysicalItemHitPoints,
    PhysicalItemTrait,
    PhysicalSystemData,
    Price,
} from "./data.ts";
import { Coins } from "./helpers.ts";
declare abstract class PhysicalItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    /** The item in which this item is embedded */
    parentItem: PhysicalItemPF2e | null;
    /**
     * The cached container of this item, if in a container, or null
     * @ignore
     */
    private _container?;
    /** Doubly-embedded adjustments, attachments, talismans etc. */
    subitems: Collection<string, PhysicalItemPF2e<TParent>>;
    /** A map of effect spinoff objects, which can be used to create new effects from using certain items */
    effectSpinoffs: Map<string, EffectSpinoff>;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: PhysicalItemConstructionContext<TParent>);
    get level(): number;
    get rarity(): Rarity;
    get traits(): Set<PhysicalItemTrait>;
    get quantity(): number;
    get size(): Size;
    get hitPoints(): PhysicalItemHitPoints;
    get hardness(): number;
    get isEquipped(): boolean;
    get carryType(): ItemCarryType;
    /** Whether the item is currently being held */
    get isHeld(): boolean;
    /** The number of hands being used to hold this item */
    get handsHeld(): ZeroToTwo;
    /** Whether the item is currently being worn */
    get isWorn(): boolean;
    /** Whether the item has an attached (or affixed, applied, etc.) usage */
    get isAttachable(): boolean;
    get price(): Price;
    /** The monetary value of the entire item stack */
    get assetValue(): Coins;
    get identificationStatus(): IdentificationStatus;
    get isIdentified(): boolean;
    get isAlchemical(): boolean;
    get isMagical(): boolean;
    get isInvested(): boolean | null;
    get isCursed(): boolean;
    get isTemporary(): boolean;
    get isShoddy(): boolean;
    get isDamaged(): boolean;
    get isBroken(): boolean;
    get isDestroyed(): boolean;
    get material(): ItemMaterialData;
    /** Whether this is a specific magic item: applicable to armor, shields, and weapons */
    get isSpecific(): boolean;
    get isInContainer(): boolean;
    /** Returns true if any of this item's containers is a stowing container */
    get isStowed(): boolean;
    /** Get this item's container, returning null if it is not in a container */
    get container(): ContainerPF2e<ActorPF2e> | null;
    /** Returns the bulk of this item and all sub-containers */
    get bulk(): Bulk;
    get uuid(): ItemUUID;
    /** Whether other items can be attached (or affixed, applied, etc.) to this item */
    acceptsSubitem(candidate: PhysicalItemPF2e): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(
        prefix: string,
        options?: {
            includeGranter?: boolean;
        },
    ): string[];
    protected _initialize(options?: Record<string, unknown>): void;
    prepareBaseData(): void;
    /** Refresh certain derived properties in case of special data preparation from subclasses */
    prepareDerivedData(): void;
    prepareSiblingData(): void;
    prepareRuleElements(options?: Omit<RuleElementOptions, "parent">): RuleElement[];
    /** After item alterations have occurred, ensure that this item's hit points are no higher than its maximum */
    onPrepareSynthetics(): void;
    prepareActorData(): void;
    getEmbeddedDocument(
        embeddedName: string,
        id: string,
        {
            strict,
        }: {
            strict: true;
        },
    ): foundry.abstract.Document;
    getEmbeddedDocument(
        embeddedName: string,
        id: string,
        {
            strict,
        }: {
            strict: false;
        },
    ): foundry.abstract.Document | undefined;
    getEmbeddedDocument(
        embeddedName: string,
        id: string,
        options?: {
            strict?: boolean;
        },
    ): foundry.abstract.Document | undefined;
    /** Attaches an item to this item as a subitem. If it is an ammo to a weapon, also performs reloading */
    attach(
        item: PhysicalItemPF2e,
        {
            quantity,
            stack,
            render,
        }?: {
            quantity?: number;
            stack?: boolean;
            render?: boolean;
        },
    ): Promise<boolean>;
    /**
     * Detach a subitem from another physical item, either creating it as a new, independent item or incrementing the
     * quantity of an existing stack.
     */
    detach({
        skipConfirm,
        quantity,
        keepZero,
    }?: {
        skipConfirm?: boolean;
        quantity?: number;
        keepZero?: boolean;
    }): Promise<void>;
    /**
     * Can the provided item stack with this item? This should be used on existing items.
     * @param item an item we are trying to add to the inventory
     */
    isStackableWith(item: PhysicalItemPF2e): boolean;
    /** Combine this item with a target item if possible */
    stackWith(targetItem: PhysicalItemPF2e): Promise<void>;
    /**
     * Move this item somewhere else in the inventory, possibly before or after another item or in or out of a container.
     * If this item and the target item are stackable they will be stacked automatically
     * @param options Options to control where this item is moved to
     * @param options.relativeTo An optional target item to sort this item relative to
     * @param options.sortBefore Should this item be sorted before or after the target item?
     * @param options.toContainer An optional container to move this item into. If the target item is in a container this can be omitted
     * @param options.render Render the update? Overridden by moving the item in or out of a container. Defaults to true
     * @returns
     */
    move({
        relativeTo,
        sortBefore,
        toContainer,
        toStack,
        render,
    }: {
        relativeTo?: PhysicalItemPF2e;
        sortBefore?: boolean;
        toContainer?: ContainerPF2e<ActorPF2e> | null;
        toStack?: PhysicalItemPF2e;
        render?: boolean;
    }): Promise<void>;
    getMystifiedData(status: IdentificationStatus, _options?: Record<string, boolean>): MystifiedData;
    getChatData(): Promise<RawItemChatData>;
    setIdentificationStatus(status: IdentificationStatus): Promise<void>;
    generateUnidentifiedName({ typeOnly }?: { typeOnly?: boolean }): string;
    /** Updates this container's cache while also resolving cyclical references. Skips if already cached */
    protected updateContainerCache(seen?: string[]): void;
    /** Include mystification-related rendering instructions for views that will display this data. */
    traitChatData(dictionary?: Record<string, string>): TraitChatData[];
    /** Redirect subitem updates to the parent item */
    update(
        data: Record<string, unknown>,
        operation?: Partial<Omit<DatabaseUpdateOperation<null>, "parent" | "pack">>,
    ): Promise<this | undefined>;
    /** Redirect subitem deletes to parent-item updates */
    delete(operation?: Partial<Omit<DatabaseDeleteOperation<null>, "parent" | "pack">>): Promise<this | undefined>;
    /** Set to unequipped upon acquiring */
    protected _preCreate(
        data: DeepPartial<this["_source"]>,
        options: DatabaseCreateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        operation: DatabaseUpdateCallbackOptions & {
            checkHP?: boolean;
        },
        user: fd.BaseUser,
    ): Promise<boolean | void>;
}
interface PhysicalItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: PhysicalItemSource;
    system: PhysicalSystemData;
}
interface PhysicalItemConstructionContext<
    TParent extends ActorPF2e | null,
> extends DocumentConstructionContext<TParent> {
    parentItem?: PhysicalItemPF2e<TParent>;
}
export { PhysicalItemPF2e, type PhysicalItemConstructionContext };
