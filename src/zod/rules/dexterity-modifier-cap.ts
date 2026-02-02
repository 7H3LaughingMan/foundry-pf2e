import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";

import * as z from "zod";

export const zDexterityModifierCapSource = zRuleElementSource.extend({
    key: z.literal("DexterityModifierCap"),
    value: zRuleValue.optional(),
});

export type zDexterityModifierCapSource = z.infer<typeof zDexterityModifierCapSource>;
