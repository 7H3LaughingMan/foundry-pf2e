import {
    ArmorCategory,
    ArmorGroup,
    ArmorPropertyRuneType,
    ArmorTrait,
    BaseArmorType,
    OtherArmorTag,
    ResilientRuneType,
} from "#pf2e-module/item/armor/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zArmorCategory: z.ZodLazy<z.ZodLiteral<ArmorCategory>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.armorCategories)),
);

export const zArmorGroup: z.ZodLazy<z.ZodLiteral<ArmorGroup>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.armorGroups)),
);

export const zArmorPropertyRuneType: z.ZodLiteral<ArmorPropertyRuneType> = z.literal([
    "acidResistant",
    "advancing",
    "aimAiding",
    "antimagic",
    "assisting",
    "bitter",
    "coldResistant",
    "deathless",
    "electricityResistant",
    "energyAdaptive",
    "ethereal",
    "fireResistant",
    "fortification",
    "glamered",
    "gliding",
    "greaterAcidResistant",
    "greaterAdvancing",
    "greaterColdResistant",
    "greaterDread",
    "greaterElectricityResistant",
    "greaterFireResistant",
    "greaterFortification",
    "greaterInvisibility",
    "greaterQuenching",
    "greaterReady",
    "greaterShadow",
    "greaterSlick",
    "greaterStanching",
    "greaterSwallowSpike",
    "greaterWinged",
    "immovable",
    "implacable",
    "invisibility",
    "lesserDread",
    "magnetizing",
    "majorQuenching",
    "majorShadow",
    "majorSlick",
    "majorStanching",
    "majorSwallowSpike",
    "malleable",
    "misleading",
    "moderateDread",
    "portable",
    "quenching",
    "raiment",
    "ready",
    "rockBraced",
    "shadow",
    "sinisterKnight",
    "sizeChanging",
    "slick",
    "spellwatch",
    "soaring",
    "stanching",
    "swallowSpike",
    "trueQuenching",
    "trueStanching",
    "winged",
]);

export const zArmorTrait: z.ZodLazy<z.ZodLiteral<ArmorTrait>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.armorTraits)),
);

export const zBaseArmorType: z.ZodLazy<z.ZodLiteral<BaseArmorType>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.baseArmorTypes)),
);

export const zOtherArmorTag: z.ZodLazy<z.ZodLiteral<OtherArmorTag>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.otherArmorTags)),
);

export const zResilientRuneType: z.ZodLiteral<ResilientRuneType> = z.literal([
    "",
    "resilient",
    "greaterResilient",
    "majorResilient",
    "mythicResilient",
]);
