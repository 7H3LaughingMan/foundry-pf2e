


import { ItemSheetOptions } from "types/pf2e/module/item/base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "types/pf2e/module/item/physical/index.ts";
import { SheetOptions } from "types/pf2e/module/sheet/helpers.ts";
import { DamageType } from "types/pf2e/module/system/damage/index.ts";
import type { ConsumablePF2e } from "./document.ts";
import { ConsumableCategory } from "./types.ts";
declare class ConsumableSheetPF2e extends PhysicalItemSheetPF2e<ConsumablePF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ConsumableSheetData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface ConsumableSheetData extends PhysicalItemSheetData<ConsumablePF2e> {
    canHaveDamageOrHealing: boolean;
    canHaveHealing: boolean;
    categories: Record<ConsumableCategory, string>;
    damageKindOptions: FormSelectOption[];
    damageTypes: Record<DamageType, string>;
    materialEffects: SheetOptions;
    otherTags: SheetOptions;
    stackGroups: Omit<typeof CONFIG.PF2E.stackGroups, "coins" | "gems"> | null;
}
export { ConsumableSheetPF2e };
