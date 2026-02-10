import { FormSelectOption } from "#client/applications/forms/fields.mjs";
import { AdjustedValue, SheetOptions } from "./../../sheet/helpers.ts";
import { ItemSheetOptions } from "./../base/sheet/sheet.ts";
import { Grade, MaterialSheetData, PhysicalItemSheetData, PhysicalItemSheetPF2e, RUNE_DATA } from "./../physical/index.ts";
import { ComboWeaponMeleeUsage, SpecificWeaponData } from "./data.ts";
import { WeaponPF2e } from "./document.ts";
export declare class WeaponSheetPF2e extends PhysicalItemSheetPF2e<WeaponPF2e> {
    protected get validTraits(): Record<string, string>;
    getData(options?: Partial<ItemSheetOptions>): Promise<WeaponSheetData>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface PropertyRuneSheetSlot {
    slug: string | null;
    label: string | null;
    adjusted: boolean;
    disabled: boolean;
}
interface WeaponSheetData extends PhysicalItemSheetData<WeaponPF2e> {
    abpEnabled: boolean;
    adjustedDiceHint: string | null;
    adjustedLevelHint: string | null;
    ammoTypes: foundry.applications.fields.FormSelectOption[];
    canHaveCapacity: boolean;
    baseTypes: typeof CONFIG.PF2E.baseWeaponTypes;
    categories: typeof CONFIG.PF2E.weaponCategories;
    conditionTypes: typeof CONFIG.PF2E.conditionTypes;
    damageDice: typeof CONFIG.PF2E.damageDice;
    damageDie: typeof CONFIG.PF2E.damageDie;
    damageDieFaces: Record<string, string>;
    damageTypes: typeof CONFIG.PF2E.damageTypes;
    expend: AdjustedValue | null;
    groups: typeof CONFIG.PF2E.weaponGroups;
    isBomb: boolean;
    isComboWeapon: boolean;
    itemBonuses: typeof CONFIG.PF2E.itemBonuses;
    mandatoryMelee: boolean;
    mandatoryRanged: boolean;
    meleeGroups: typeof CONFIG.PF2E.meleeWeaponGroups;
    meleeUsage: ComboWeaponMeleeUsage | undefined;
    meleeUsageBaseDamage: FormSelectOption[];
    meleeUsageTraits: SheetOptions;
    otherTags: SheetOptions;
    preciousMaterials: MaterialSheetData;
    propertyRuneSlots: PropertyRuneSheetSlot[];
    runeTypes: Omit<typeof RUNE_DATA.weapon, "property"> & {
        property: {
            slug: string;
            name: string;
        }[];
    };
    grades: Record<Grade, string>;
    specificMagicData: SpecificWeaponData;
    weaponMAP: typeof CONFIG.PF2E.weaponMAP;
    weaponRanges: Record<number, string>;
    weaponReload: typeof CONFIG.PF2E.weaponReload;
}
export {};
