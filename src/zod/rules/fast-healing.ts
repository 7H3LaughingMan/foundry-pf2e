import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";

import * as z from "zod";

export const zFastHealingSource = zRuleElementSource.extend({
    key: z.literal("FastHealing"),
    value: zRuleValue.optional(),
    type: z.literal(["fast-healing", "regeneration"]).optional(),
    details: z.string().optional(),
    deactivatedBy: z.array(z.string()).optional(),
});

export type zFastHealingSource = z.infer<typeof zFastHealingSource>;
