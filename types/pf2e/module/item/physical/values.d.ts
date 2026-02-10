declare const PHYSICAL_ITEM_TYPES: Set<"armor" | "shield" | "consumable" | "ammo" | "backpack" | "book" | "equipment" | "treasure" | "weapon">;
declare const PRECIOUS_MATERIAL_TYPES: Set<
    | "abysium"
    | "adamantine"
    | "dawnsilver"
    | "djezet"
    | "duskwood"
    | "inubrix"
    | "noqual"
    | "orichalcum"
    | "peachwood"
    | "siccatite"
    | "silver"
    | "cold-iron"
    | "dragonhide"
    | "dreamweb"
    | "grisantian-pelt"
    | "keep-stone"
    | "sisterstone"
    | "sisterstone-dusk"
    | "sisterstone-scarlet"
    | "sloughstone"
    | "sovereign-steel"
    | "warpglass"
>;
declare const PRECIOUS_MATERIAL_GRADES: Set<"low" | "standard" | "high">;
declare const COIN_DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
declare const CURRENCY_TYPES: readonly ["pp", "gp", "sp", "cp", "credits", "upb"];
declare const DENOMINATION_RATES: {
    cp: number;
    sp: number;
    gp: number;
    pp: number;
    credits: number;
    upb: number;
};
export { COIN_DENOMINATIONS, CURRENCY_TYPES, DENOMINATION_RATES, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES };
