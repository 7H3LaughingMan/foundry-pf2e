import { ItemSheetOptions } from "./../base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "./../physical/sheet.ts";
import { AmmoPF2e } from "./document.ts";
declare class AmmoSheetPF2e extends PhysicalItemSheetPF2e<AmmoPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<AmmoSheetData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface AmmoSheetData extends PhysicalItemSheetData<AmmoPF2e> {
    canHaveUses: boolean;
    isSpecialAmmo: boolean;
    ammoTypes: foundry.applications.fields.FormSelectOption[];
}
export { AmmoSheetPF2e };
