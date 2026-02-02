import {
    Attitude,
    CreatureActorType,
    CreatureTrait,
    CreatureType,
    Language,
    ModeOfBeing,
    SenseAcuity,
    SenseType,
    SpecialVisionType,
} from "#pf2e-module/actor/creature/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zCreatureActorType: z.ZodLiteral<CreatureActorType> = z.literal(["character", "npc", "familiar"]);

export const zCreatureTrait = z.custom<CreatureTrait>(
    (data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.creatureTraits, data),
);

export const zCreatureType = z.custom<CreatureType>(
    (data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.creatureTypes, data),
);

export const zLanguage = z.custom<Language>((data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.languages, data));

export const zAttitude = z.custom<Attitude>((data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.attitude, data));

export const zModeOfBeing: z.ZodLiteral<ModeOfBeing> = z.literal(["living", "undead", "construct", "object"]);

export const zSenseAcuity: z.ZodLiteral<SenseAcuity> = z.literal(["precise", "imprecise", "vague"]);

export const zSenseType = z.custom<SenseType>((data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.senses, data));

export const zSpecialVisionType: z.ZodLiteral<SpecialVisionType> = z.literal([
    "low-light-vision",
    "darkvision",
    "greater-darkvision",
    "see-invisibility",
]);
