import { ActorPF2e } from "./../index.ts";
import { DatabaseDeleteOperation } from "#common/abstract/_module.mjs";
import { ContainerPF2e, KitPF2e, PhysicalItemPF2e } from "./../../item/index.ts";
import { ItemSourcePF2e, KitSource, PhysicalItemSource } from "./../../item/base/data/index.ts";
import { Coins } from "./../../item/physical/helpers.ts";
import { Currency } from "./../../item/physical/types.ts";
import { DelegatedCollection } from "./../../../util/index.ts";
import { InventoryBulk } from "./bulk.ts";
declare class ActorInventory<TActor extends ActorPF2e> extends DelegatedCollection<PhysicalItemPF2e<TActor>> {
    #private;
    actor: TActor;
    bulk: InventoryBulk;
    constructor(actor: TActor, entries?: PhysicalItemPF2e<TActor>[]);
    get coins(): Coins;
    get currency(): Coins;
    get totalWealth(): Coins;
    get invested(): {
        value: number;
        max: number;
    } | null;
    /** Find an item already owned by the actor that can stack with the given item */
    findStackableItem(
        item: PhysicalItemPF2e | ItemSourcePF2e,
        {
            containerId,
        }?: {
            containerId?: string | null;
        },
    ): PhysicalItemPF2e<TActor> | null;
    addCoins(
        coins: Partial<Record<Currency, number>>,
        options?: {
            combineStacks?: boolean;
        },
    ): Promise<void>;
    removeCoins(
        coins: Partial<Record<Currency, number>>,
        options?: {
            byValue?: boolean;
        },
    ): Promise<boolean>;
    addCurrency(
        coins: Partial<Record<Currency, number>>,
        {
            combineStacks,
        }?: {
            combineStacks?: boolean;
        },
    ): Promise<void>;
    removeCurrency(
        coins: Partial<Record<Currency, number>>,
        {
            byValue,
        }?: {
            byValue?: boolean;
        },
    ): Promise<boolean>;
    sellAllTreasure(): Promise<void>;
    /** Deletes all temporary items, skipping those that are associated with a special resource */
    deleteTemporaryItems(
        operation?: Partial<DatabaseDeleteOperation<TActor>> | undefined,
    ): Promise<PhysicalItemPF2e<TActor>[]>;
    /** Adds one or more items to this inventory without removing from its original location. */
    add(
        itemOrItems: AddItemParam,
        { stack, render, container, keepId }?: AddItemOptions,
    ): Promise<PhysicalItemPF2e<TActor>[]>;
}
type AddItemParam = AddableItemSourceOrEntry | AddableItemSourceOrEntry[];
type AddableItemSourceOrEntry = PhysicalItemPF2e | KitPF2e | PreCreate<PhysicalItemSource | KitSource>;
interface AddItemOptions {
    stack?: boolean;
    render?: boolean;
    container?: ContainerPF2e<ActorPF2e>;
    keepId?: boolean;
}
export { ActorInventory, InventoryBulk };
export type { AddItemParam };
