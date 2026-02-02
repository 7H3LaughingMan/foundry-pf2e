import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";

import * as z from "zod";

export const zBaseSpeed = zRuleElementSource.extend({
    key: z.literal("BaseSpeed"),
    selector: z.string().optional(),
    value: zRuleValue.optional(),
});

export type zBaseSpeed = z.infer<typeof zBaseSpeed>;
