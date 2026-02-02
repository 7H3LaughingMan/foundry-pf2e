import { ModifierType } from "#pf2e-module/actor/modifiers.js";

import * as z from "zod";

export const zModifierType: z.ZodLiteral<ModifierType> = z.literal([
    "ability",
    "circumstance",
    "item",
    "potency",
    "proficiency",
    "status",
    "untyped",
]);
