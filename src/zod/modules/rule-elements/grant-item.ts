import * as z from "zod";
import { RuleElementSource } from "./base.ts";
import { ItemAlteration } from "./item-alteration.ts";

export const GrantItemSource = RuleElementSource.extend({
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
    alterations: z.array(ItemAlteration).optional(),
    track: z.boolean().optional(),
});

export type GrantItemSource = z.infer<typeof GrantItemSource>;
