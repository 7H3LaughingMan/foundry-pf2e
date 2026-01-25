import { SheetOptions } from "./../../sheet/helpers.ts";
import { ItemSheetOptions } from "./../base/sheet/sheet.ts";
import {
    Coins,
    Grade,
    MaterialSheetData,
    PhysicalItemSheetData,
    PhysicalItemSheetPF2e,
    RUNE_DATA,
} from "./../physical/index.ts";
import { ArmorCategory, ArmorGroup, ArmorPF2e, BaseArmorType, SpecificArmorData } from "./index.ts";
declare class ArmorSheetPF2e extends PhysicalItemSheetPF2e<ArmorPF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<ArmorSheetData>;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface ArmorSheetData extends PhysicalItemSheetData<ArmorPF2e> {
    abpEnabled: boolean;
    basePrice: Coins;
    baseTypes: Record<BaseArmorType, string>;
    categories: Record<ArmorCategory, string>;
    groups: Record<ArmorGroup, string>;
    otherTags: SheetOptions;
    preciousMaterials: MaterialSheetData;
    propertyRuneSlots: PropertyRuneSheetSlot[];
    runeTypes: Omit<typeof RUNE_DATA.armor, "property"> & {
        property: {
            slug: string;
            name: string;
        }[];
    };
    grades: Record<Grade, string>;
    specificMagicData: SpecificArmorData;
}
interface PropertyRuneSheetSlot {
    slug: string | null;
    label: string | null;
    disabled: boolean;
}
export { ArmorSheetPF2e };
