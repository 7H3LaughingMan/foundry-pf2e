import type { ArmorTrait } from "types/pf2e/module/item/armor/types.ts";
import type { ConsumableTrait } from "types/pf2e/module/item/consumable/types.ts";
import type { EquipmentTrait } from "types/pf2e/module/item/equipment/types.ts";
import type { ShieldTrait } from "types/pf2e/module/item/shield/types.ts";
import type { WeaponTrait } from "types/pf2e/module/item/weapon/types.ts";
import type { PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES } from "./values.ts";
type BaseMaterialType = "bone" | "cloth" | "glass" | "leather" | "paper" | "rope" | "steel" | "stone" | "wood";
type BaseMaterialThickness = "thin" | "standard" | "structure";
type BaseMaterial = {
    type: BaseMaterialType;
    thickness: BaseMaterialThickness;
};
type CoinDenomination = "pp" | "gp" | "sp" | "cp";
type PhysicalItemTrait = ArmorTrait | ConsumableTrait | EquipmentTrait | ShieldTrait | WeaponTrait;
type PhysicalItemType = SetElement<typeof PHYSICAL_ITEM_TYPES>;
type PreciousMaterialType = SetElement<typeof PRECIOUS_MATERIAL_TYPES>;
type PreciousMaterialGrade = SetElement<typeof PRECIOUS_MATERIAL_GRADES>;
export type { BaseMaterial, CoinDenomination, PhysicalItemTrait, PhysicalItemType, PreciousMaterialGrade, PreciousMaterialType, };
