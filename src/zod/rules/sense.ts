import { zRuleElementSource, zRuleValue } from "#zod/rules/base.ts";

import * as z from "zod";

export const zSenseSource = zRuleElementSource.extend({
    key: z.literal("Sense"),
    selector: z.string().optional(),
    force: z.boolean().optional(),
    acuity: z.string().optional(),
    range: zRuleValue.optional(),
});

export type zSenseSource = z.infer<typeof zSenseSource>;
