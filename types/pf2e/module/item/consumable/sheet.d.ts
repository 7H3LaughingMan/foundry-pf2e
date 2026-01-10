import { FormSelectOption } from "#client/applications/forms/fields.mjs";
import { ItemSheetOptions } from "./../base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "./../physical/index.ts";
import { SheetOptions } from "./../../sheet/helpers.ts";
import { DamageType } from "./../../system/damage/index.ts";
import { ConsumablePF2e } from "./document.ts";
import { ConsumableCategory } from "./types.ts";
declare class ConsumableSheetPF2e extends PhysicalItemSheetPF2e<ConsumablePF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ConsumableSheetData>;
    activateListeners($html: JQuery): void;
}
interface ConsumableSheetData extends PhysicalItemSheetData<ConsumablePF2e> {
    canHaveDamageOrHealing: boolean;
    canHaveHealing: boolean;
    categories: Record<ConsumableCategory, string>;
    damageKindOptions: FormSelectOption[];
    damageTypes: Record<DamageType, string>;
    materialEffects: SheetOptions;
    otherTags: SheetOptions;
    embeddedSpell: {
        /** The embedded spell uuid, or null if this item *should* have a spell but doesn't */
        uuid: string | null;
        img?: string;
        name?: string;
        rank?: number;
    } | null;
}
export { ConsumableSheetPF2e };
