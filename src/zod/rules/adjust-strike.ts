import { zAELikeChangeMode } from "#zod/rules/ae-like.ts";
import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";
import { zRawPredicate } from "#zod/system/predication.ts";

import * as z from "zod";

export const zAdjustStrikeSource = zRuleElementSource.extend({
    key: z.literal("AdjustStrike"),
    mode: zAELikeChangeMode.optional(),
    property: z.literal(["materials", "property-runes", "range-increment", "traits", "weapon-traits"]).optional(),
    definition: zRawPredicate.optional(),
    value: zRuleValue.optional(),
});

export type zAdjustStrikeSource = z.infer<typeof zAdjustStrikeSource>;
