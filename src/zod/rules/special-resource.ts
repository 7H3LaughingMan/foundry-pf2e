import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";
import { zFalse } from "#zod/types.ts";

import * as z from "zod";

export const zSpecialResourceSource = zRuleElementSource.extend({
    key: z.literal("SpecialResource"),
    value: z.number().optional(),
    max: zRuleValue.optional(),
    itemUUID: z.string().optional(),
    level: zRuleValue.optional(),
    renew: z.union([z.literal("daily"), zFalse]).optional(),
});

export type zSpecialResourceSource = z.infer<typeof zSpecialResourceSource>;
