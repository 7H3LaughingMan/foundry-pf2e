import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";

import * as z from "zod";

export const zTempHPSource = zRuleElementSource.extend({
    key: z.literal("TempHP"),
    value: zRuleValue.optional(),
    events: z
        .strictObject({
            onCreate: z.boolean().optional(),
            onTurnStart: z.boolean().optional(),
        })
        .optional(),
});

export type zTempHPSource = z.infer<typeof zTempHPSource>;
