import { zRuleElementSource } from "#zod/rules/base.ts";

import * as z from "zod";

export const zTokenNameSource = zRuleElementSource.extend({
    key: z.literal("TokenName"),
    value: z.string().optional(),
});

export type zTokenNameSource = z.infer<typeof zTokenNameSource>;
