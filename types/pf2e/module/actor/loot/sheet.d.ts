import { LootPF2e } from "../index.ts";
import { ActorSheetDataPF2e, InventoryItem, SheetInventory } from "../sheet/data-types.ts";
import { PhysicalItemPF2e } from "../../item/index.ts";
import { ActorSheetPF2e } from "../sheet/base.ts";

export declare class LootSheetPF2e<TActor extends LootPF2e> extends ActorSheetPF2e<TActor> {
    static get defaultOptions(): ActorSheetOptions;
    get template(): string;
    getData(): Promise<LootSheetDataPF2e<TActor>>;
    activateListeners($html: JQuery): void;
    protected prepareInventory(): SheetInventory;
    /** Hide coin item rows in merchant actors */
    protected prepareInventoryItem(item: PhysicalItemPF2e): InventoryItem;
}
interface LootSheetDataPF2e<TActor extends LootPF2e> extends ActorSheetDataPF2e<TActor> {
    hasActiveParty: boolean;
    isLoot: boolean;
    lootSheetTypeOptions: FormSelectOption[];
}
export {};
