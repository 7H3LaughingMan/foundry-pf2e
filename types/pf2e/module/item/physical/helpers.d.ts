import { ActorPF2e } from "./../../actor/index.ts";
import { ContainerPF2e, PhysicalItemPF2e } from "./../index.ts";
import { PhysicalItemSource } from "./../base/data/index.ts";
import { ContainerBulkData } from "./../container/data.ts";
import { Rarity } from "./../../data.ts";
import { Coins } from "./coins.ts";
import { BulkData, EquippedData } from "./data.ts";
declare function computeLevelRarityPrice(item: PhysicalItemPF2e): {
    level: number;
    rarity: Rarity;
    price: Coins;
};
/**
 * Checks if a change in traits leads to the item converting to sf2e or pf2e.
 * If so, it prompts for confirmation, and allows the user to cancel.
 * @returns pf2e or sf2e based on the new traits, or `null` if no change is to be made.
 * @throws an error if the user does not make a selection
 */
declare function checkPhysicalItemSystemChange(
    item: PhysicalItemPF2e,
    changed: DeepPartial<PhysicalItemSource>,
): Promise<"pf2e" | "sf2e" | null>;
/**
 * Generate a modified item name based on precious materials and runes. Currently only armor and weapon documents
 * have significant implementations.
 */
declare function generateItemName(item: PhysicalItemPF2e): string;
/** Validate HP changes to a physical item and also adjust current HP when max HP changes */
declare function handleHPChange(item: PhysicalItemPF2e, changed: DeepPartial<PhysicalItemSource>): void;
/** Add and adjust properties on an item's bulk data object */
declare function prepareBulkData<TItem extends PhysicalItemPF2e>(
    item: TItem,
): TItem extends ContainerPF2e ? ContainerBulkData : BulkData;
/** Clone an item, sizing it appropriately for the actor. For larger PCs, set the price's sensitity to false.  */
declare function sizeItemForActor<TItem extends PhysicalItemPF2e>(item: TItem, actor: ActorPF2e): TItem;
/** Returns the default equip status for this item, called in order to "reset" the equip status */
declare function getDefaultEquipStatus(item: PhysicalItemPF2e): EquippedData;
/**
 * Transfers credits between actors. This is separated to avoid making it callable API during the first few versions.
 * This does not transfer the entire credstick, that's handled by other calling functions.
 * @todo if we're keeping a separate transferCredits() function longterm, find a home
 */
declare function transferCredits({
    item,
    targetActor,
    quantity,
}: {
    item: PhysicalItemPF2e;
    targetActor: ActorPF2e;
    quantity: number;
}): Promise<void>;
export {
    Coins,
    checkPhysicalItemSystemChange,
    computeLevelRarityPrice,
    generateItemName,
    getDefaultEquipStatus,
    handleHPChange,
    prepareBulkData,
    sizeItemForActor,
    transferCredits,
};
