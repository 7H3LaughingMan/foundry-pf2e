import { zRuleElementSource } from "#zod/rules/base.ts";

import * as z from "zod";

export const zTokenEffectIconSource = zRuleElementSource.extend({
    key: z.literal("TokenEffectIcon"),
    value: z.string().optional(),
});

export type zTokenEffectIconSource = z.infer<typeof zTokenEffectIconSource>;
