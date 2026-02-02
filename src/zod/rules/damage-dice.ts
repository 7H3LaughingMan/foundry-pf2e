import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";
import { zDamageCategoryUnique } from "#zod/system/damage.ts";

import * as z from "zod";

export const zDamageDiceSource = zRuleElementSource.extend({
    key: z.literal("DamageDice"),
    selector: z.array(z.string()).optional(),
    diceNumber: zRuleValue.optional(),
    dieSize: z.string().optional(),
    damageType: z.string().optional(),
    critical: z.boolean().optional(),
    category: zDamageCategoryUnique.optional(),
    tags: z.array(z.string()).optional(),
    override: z
        .strictObject({
            upgrade: z.boolean().optional(),
            downgrade: z.boolean().optional(),
            dieSize: z.string().optional(),
            damageType: z.string().optional(),
            diceNumber: z.number().optional(),
        })
        .optional(),
    hideIfDisabled: z.boolean().optional(),
    battleForm: z.boolean().optional(),
});

export type zDamageDiceSource = z.infer<typeof zDamageDiceSource>;
