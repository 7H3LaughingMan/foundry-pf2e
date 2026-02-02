import { zAELikeChangeMode } from "#zod/rules/ae-like.ts";
import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";

import * as z from "zod";

export const zAdjustModifierSource = zRuleElementSource.extend({
    key: z.literal("AdjustModifier"),
    mode: zAELikeChangeMode.optional(),
    selector: z.string().optional(),
    selectors: z.array(z.string()).optional(),
    relabel: z.string().optional(),
    damageType: z.string().optional(),
    suppress: z.boolean().optional(),
    maxApplications: z.number().optional(),
    value: zRuleValue.optional(),
});

export type zAdjustModifierSource = z.infer<typeof zAdjustModifierSource>;
