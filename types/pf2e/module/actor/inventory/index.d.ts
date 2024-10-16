import { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { KitPF2e, PhysicalItemPF2e } from "types/pf2e/module/item/index.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { Coins } from "types/pf2e/module/item/physical/data.ts";
import { CoinsPF2e } from "types/pf2e/module/item/physical/helpers.ts";
import { DelegatedCollection } from "types/pf2e/util/index.ts";
import { InventoryBulk } from "./bulk.ts";
declare class ActorInventory<TActor extends ActorPF2e> extends DelegatedCollection<PhysicalItemPF2e<TActor>> {
    actor: TActor;
    bulk: InventoryBulk;
    constructor(actor: TActor, entries?: PhysicalItemPF2e<TActor>[]);
    get coins(): CoinsPF2e;
    get totalWealth(): CoinsPF2e;
    get invested(): {
        value: number;
        max: number;
    } | null;
    /** Find an item already owned by the actor that can stack with the given item */
    findStackableItem(item: PhysicalItemPF2e | ItemSourcePF2e): PhysicalItemPF2e<TActor> | null;
    addCoins(coins: Partial<Coins>, { combineStacks }?: {
        combineStacks?: boolean;
    }): Promise<void>;
    removeCoins(coins: Partial<Coins>, { byValue }?: {
        byValue?: boolean;
    }): Promise<boolean>;
    sellAllTreasure(): Promise<void>;
    /** Adds an item to this inventory without removing from its original location */
    add(item: PhysicalItemPF2e | KitPF2e, options?: AddItemOptions): Promise<void>;
}
interface AddItemOptions {
    stack?: boolean;
}
export { ActorInventory, InventoryBulk };
