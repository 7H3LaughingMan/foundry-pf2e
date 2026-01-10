import { DamageCategoryUnique, DamageType } from "./../../module/system/damage/types.ts";
import { energyDamageTypes } from "./traits.ts";
declare const damageCategoriesUnique: Record<DamageCategoryUnique, string>;
declare const materialDamageEffects: {
    abysium: string;
    adamantine: string;
    dawnsilver: string;
    djezet: string;
    duskwood: string;
    inubrix: string;
    noqual: string;
    orichalcum: string;
    peachwood: string;
    siccatite: string;
    silver: string;
    "cold-iron": string;
    "keep-stone": string;
    "sisterstone-dusk": string;
    "sisterstone-scarlet": string;
    "sovereign-steel": string;
    warpglass: string;
};
declare const damageCategories: {
    energy: string;
    physical: string;
    abysium: string;
    adamantine: string;
    dawnsilver: string;
    djezet: string;
    duskwood: string;
    inubrix: string;
    noqual: string;
    orichalcum: string;
    peachwood: string;
    siccatite: string;
    silver: string;
    "cold-iron": string;
    "keep-stone": string;
    "sisterstone-dusk": string;
    "sisterstone-scarlet": string;
    "sovereign-steel": string;
    warpglass: string;
    precision: string;
    splash: string;
    persistent: string;
};
declare const physicalDamageTypes: {
    bleed: string;
    bludgeoning: string;
    piercing: string;
    slashing: string;
};
declare const damageTypes: Record<DamageType, string>;
declare const damageRollFlavors: Record<
    | "force"
    | "acid"
    | "bleed"
    | "bludgeoning"
    | "cold"
    | "electricity"
    | "fire"
    | "mental"
    | "piercing"
    | "poison"
    | "slashing"
    | "sonic"
    | "spirit"
    | "vitality"
    | "void"
    | "untyped",
    string
>;
export {
    damageCategories,
    damageCategoriesUnique,
    damageRollFlavors,
    damageTypes,
    energyDamageTypes,
    materialDamageEffects,
    physicalDamageTypes,
};
