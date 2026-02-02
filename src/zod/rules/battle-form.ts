import { zRuleElementSource } from "#zod/rules/base.ts";

import * as z from "zod";

export const zBattleFormSource = zRuleElementSource.extend({
    key: z.literal("BattleForm"),
});

export type zBattleFormSource = z.infer<typeof zBattleFormSource>;
