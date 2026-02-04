import { zRuleElementSource } from "#zod/rules/base.ts";

import * as z from "zod";

export const zTokenMarkSource = zRuleElementSource.extend({
    key: z.literal("TokenMark"),
    slug: z.string().optional(),
    uuid: z.string().optional(),
});

export type zTokenMarkSource = z.infer<typeof zTokenMarkSource>;
