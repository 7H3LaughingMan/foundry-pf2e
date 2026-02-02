import {
    ActorAlliance,
    ActorType,
    AttributeString,
    ImmunityType,
    MovementType,
    ResistanceType,
    SaveType,
    SkillSlug,
    WeaknessType,
} from "#pf2e-module/actor/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zActorType = z.custom<ActorType>(
    (data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.Actor.documentClasses, data),
);

export const zAttributeString = z.custom<AttributeString>(
    (data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.abilities, data),
);

export const zSkillSlug = z.custom<SkillSlug>((data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.skills, data));

export const zActorAlliance: z.ZodLiteral<ActorAlliance> = z.literal(["party", "opposition", null]);

export const zSaveType = z.custom<SaveType>((data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.saves, data));

export const zDCSlug = z.union([z.literal(["ac", "armor", "perception"]), zSaveType, zSkillSlug]);

export const zMovementType: z.ZodLiteral<MovementType> = z.literal(["land", "burrow", "climb", "fly", "swim"]);

export const zImmunityType = z.custom<ImmunityType>(
    (data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.immunityTypes, data),
);

export const zWeaknessType = z.custom<WeaknessType>(
    (data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.weaknessTypes, data),
);

export const zResistanceType = z.custom<ResistanceType>(
    (data) => R.isString(data) && Object.hasOwn(CONFIG.PF2E.resistanceTypes, data),
);

export const zIWRType = z.union([zImmunityType, zWeaknessType, zResistanceType]);
