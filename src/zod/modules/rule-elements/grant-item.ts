import { Zod } from "#foundry-pf2e/zod";
import * as z from "zod";

export const GrantItemSource = Zod.RuleElements.RuleElementSource.extend({
    key: z.literal("GrantItem"),
    uuid: z.string().nonempty().optional(),
    flags: z.string().nonempty().nullable().optional(),
    reevaluateOnUpdate: z.boolean().optional(),
    inMemoryOnly: z.boolean().optional(),
    allowDuplicates: z.boolean().optional(),
    onDeleteActions: z
        .strictObject({
            granter: z.literal(["cascade", "detach", "restrict"]).optional(),
            grantee: z.literal(["cascade", "detach", "restrict"]).optional(),
        })
        .optional(),
    nestUnderGranter: z.boolean().optional(),
    alterations: z.array(Zod.RuleElements.ItemAlteration).optional(),
    track: z.boolean().optional(),
});

export type GrantItemSource = z.infer<typeof GrantItemSource>;
