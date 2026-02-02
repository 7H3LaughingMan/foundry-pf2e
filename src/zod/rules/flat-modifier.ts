import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";
import { zRawPredicate } from "#zod/system/predication.ts";

import * as z from "zod";

export const zFlatModifierSource = zRuleElementSource.extend({
    key: z.literal("FlatModifier"),
    selector: z.array(z.string()).optional(),
    type: z.string().optional(),
    ability: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    force: z.boolean().optional(),
    hideIfDisabled: z.boolean().optional(),
    fromEquipment: z.boolean().optional(),
    damageType: z.string().optional(),
    damageCategory: z.string().optional(),
    critical: z.boolean().optional(),
    value: zRuleValue.optional(),
    tags: z.array(z.string()).optional(),
    removeAfterRoll: z.union([z.literal("if-enabled"), z.boolean(), zRawPredicate]).optional(),
    battleForm: z.boolean().optional(),
});

export type zFlatModifierSource = z.infer<typeof zFlatModifierSource>;
