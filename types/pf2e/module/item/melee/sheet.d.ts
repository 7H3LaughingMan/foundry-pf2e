


import { ItemSheetDataPF2e, ItemSheetPF2e } from "types/pf2e/module/item/base/sheet/sheet.ts";
import { SheetOptions } from "types/pf2e/module/sheet/helpers.ts";
import { DamageCategoryUnique } from "types/pf2e/module/system/damage/types.ts";
import type { MeleePF2e } from "./index.ts";
export declare class MeleeSheetPF2e extends ItemSheetPF2e<MeleePF2e> {
    getData(options?: Partial<DocumentSheetOptions>): Promise<MeleeSheetData>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface MeleeSheetData extends ItemSheetDataPF2e<MeleePF2e> {
    damageTypes: ConfigPF2e["PF2E"]["damageTypes"];
    damageCategories: Record<DamageCategoryUnique, string>;
    attackEffects: SheetOptions;
}
export {};
