import {
    BaseWeaponType,
    MeleeWeaponGroup,
    OtherWeaponTag,
    StrikingRuneType,
    WeaponCategory,
    WeaponGroup,
    WeaponMaterialType,
    WeaponPropertyRuneType,
    WeaponRangeIncrement,
    WeaponReloadTime,
    WeaponTrait,
} from "#pf2e-module/item/weapon/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zWeaponPropertyRuneType: z.ZodLiteral<WeaponPropertyRuneType> = z.literal([
    "ancestralEchoing",
    "anchoring",
    "ashen",
    "astral",
    "authorized",
    "bane",
    "bloodbane",
    "bloodthirsty",
    "bolkasBlessing",
    "brilliant",
    "called",
    "coating",
    "conducting",
    "corrosive",
    "crushing",
    "cunning",
    "dancing",
    "deathdrinking",
    "decaying",
    "demolishing",
    "disrupting",
    "earthbinding",
    "energizing",
    "extending",
    "fanged",
    "fearsome",
    "flaming",
    "flickering",
    "flurrying",
    "frost",
    "ghostTouch",
    "giantKilling",
    "greaterGiantKilling",
    "greaterAnchoring",
    "greaterAshen",
    "greaterAstral",
    "greaterBloodbane",
    "greaterBolkasBlessing",
    "greaterBrilliant",
    "greaterCorrosive",
    "greaterCrushing",
    "greaterDecaying",
    "greaterDisrupting",
    "greaterExtending",
    "greaterFanged",
    "greaterFearsome",
    "greaterFlaming",
    "greaterFrost",
    "greaterHauling",
    "greaterImpactful",
    "greaterKolssOath",
    "greaterRooting",
    "greaterShock",
    "greaterThundering",
    "greaterTruddsStrength",
    "grievous",
    "hauling",
    "holy",
    "hopeful",
    "hooked",
    "impactful",
    "impossible",
    "keen",
    "kinWarding",
    "kolssOath",
    "majorFanged",
    "majorRooting",
    "merciful",
    "nightmare",
    "pacifying",
    "returning",
    "rooting",
    "serrating",
    "shifting",
    "shock",
    "shockwave",
    "speed",
    "spellStoring",
    "swarming",
    "thundering",
    "truddsStrength",
    "trueRooting",
    "underwater",
    "unholy",
    "vorpal",
    "wounding",
]);

export const zWeaponCategory: z.ZodLazy<z.ZodLiteral<WeaponCategory>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.weaponCategories)));

export const zMeleeWeaponGroup: z.ZodLazy<z.ZodLiteral<MeleeWeaponGroup>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.meleeWeaponGroups)));

export const zWeaponGroup: z.ZodLazy<z.ZodLiteral<WeaponGroup>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.weaponGroups)));

export const zBaseWeaponType: z.ZodLazy<z.ZodLiteral<BaseWeaponType>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.baseWeaponTypes)));

export const zWeaponTrait: z.ZodLazy<z.ZodLiteral<WeaponTrait>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.weaponTraits)));

export const zOtherWeaponTag: z.ZodLazy<z.ZodLiteral<OtherWeaponTag>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.otherWeaponTags)));

export const zWeaponRangeIncrement: z.ZodLiteral<WeaponRangeIncrement> = z.literal([
    10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 140, 150, 180, 200, 240, 300,
]);

export const zWeaponReloadTime: z.ZodLazy<z.ZodLiteral<WeaponReloadTime>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.weaponReload)));

export const zStrikingRuneType: z.ZodLiteral<StrikingRuneType> = z.literal(["striking", "greaterStriking", "majorStriking", "mythicStriking"]);

export const zWeaponMaterialType: z.ZodLazy<z.ZodLiteral<WeaponMaterialType>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.preciousMaterials).filter((value) => value !== "dragonhide" && value !== "grisantian-pelt" && value !== "dreamweb")),
);
