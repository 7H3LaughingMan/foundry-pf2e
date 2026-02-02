import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";

import * as z from "zod";

export const zMultipleAttackPenaltySource = zRuleElementSource.extend({
    key: z.literal("MultipleAttackPenalty"),
    selector: z.string().optional(),
    value: zRuleValue.optional(),
});

export type zMultipleAttackPenaltySource = z.infer<typeof zMultipleAttackPenaltySource>;
