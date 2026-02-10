import { FormSelectOption } from "#client/applications/forms/fields.mjs";
import { AppV1RenderOptions } from "#client/appv1/api/application-v1.mjs";
import { ActorSheetData } from "#client/appv1/sheets/actor-sheet.mjs";
import { ItemUUID } from "#common/documents/_module.mjs";
import { Frequency } from "./../../item/base/data/index.ts";
import { PhysicalItemPF2e } from "./../../item/index.ts";
import { RawCoins } from "./../../item/physical/data.ts";
import { RollOptionToggle } from "./../../rules/synthetics.ts";
import { SheetOptions } from "./../../sheet/helpers.ts";
import { ActorPF2e } from "./../base.ts";
import { ActorFlagsPF2e, TraitViewData } from "./../data/base.ts";
import { ActorSizePF2e } from "./../data/size.ts";
import { InventoryBulk } from "./../inventory/index.ts";
interface InventoryItem<TItem extends PhysicalItemPF2e = PhysicalItemPF2e> {
    item: TItem;
    subitems: PhysicalItemPF2e[];
    /** Item size if it causes any weight difference relative to the actor */
    itemSize?: ActorSizePF2e | null;
    isContainer: boolean;
    canBeEquipped: boolean;
    /** If true, the quantity cannot be edited, and the controls should be hidden. Used for containers and cred sticks */
    canEditQuantity: boolean;
    /** Bulk for each item is shown on an individual basis from merchant sheets */
    unitBulk: string | null;
    isInvestable: boolean;
    isSellable: boolean;
    hasCharges: boolean;
    heldItems?: InventoryItem[] | null;
    notifyEquip?: boolean;
    notifyInvest?: boolean;
    /** The sale price label per sold minimum unit. For example, arrows are 1sp per 10 */
    unitPrice: string;
    /** Total asset value of the entire stack of the inventory item */
    assetValue: string;
    /** Whether the item should be hidden if the user isn't the owner */
    hidden: boolean;
}
interface CoinDisplayData {
    value: number;
    label: string;
}
interface CurrencySummary {
    units: {
        [K in keyof RawCoins]?: CoinDisplayData;
    };
    totalCurrency: string;
    totalWealth: string;
}
interface SheetItemList {
    label: string;
    types: string[];
    items: InventoryItem[];
}
interface SheetInventory {
    sections: SheetItemList[];
    bulk: InventoryBulk;
    showValueAlways: boolean;
    showUnitBulkPrice: boolean;
    hasStowedWeapons: boolean;
    hasStowingContainers: boolean;
    invested?: {
        value: number;
        max: number;
    } | null;
}
interface ActorSheetDataPF2e<TActor extends ActorPF2e> extends ActorSheetData<TActor> {
    data: TActor["system"];
    systemId: SystemId;
    systemFlags: ActorFlagsPF2e[SystemId];
    canDistributeCoins?: {
        enabled: boolean;
    } | null;
    enrichedContent: Record<string, string>;
    inventory: SheetInventory;
    isLootSheet: boolean;
    isTargetFlatFooted: boolean;
    toggles: Record<string, RollOptionToggle[]>;
    currency: CurrencySummary;
    traits: SheetOptions;
    user: {
        isGM: boolean;
    };
    publicationLicenses: FormSelectOption[];
}
interface AbilityViewData {
    uuid: ItemUUID;
    id: string;
    name: string;
    img: string;
    traits: TraitViewData[];
    glyph: string | null;
    frequency: Frequency | null;
    usable: boolean;
    has: {
        aura: boolean;
        deathNote: boolean;
        selfEffect: boolean;
    };
}
interface ActorSheetRenderOptionsPF2e extends AppV1RenderOptions {
    /** What tab to switch to when rendering the sheet */
    tab?: string;
}
export type { AbilityViewData, ActorSheetDataPF2e, ActorSheetRenderOptionsPF2e, CurrencySummary, InventoryItem, SheetInventory };
