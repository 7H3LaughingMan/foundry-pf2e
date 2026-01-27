import * as R from "remeda";
import * as z from "zod";
import { PredicateStatement } from "../predication.ts";

export const RuleValue = z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.custom<object>((data) => R.isPlainObject(data)),
]);

export type RuleValue = z.infer<typeof RuleValue>;

export const RuleElementSource = z.looseObject({
    key: z.string().nonempty(),
    slug: z.string().nonempty().nullable().optional(),
    label: z.string().nonempty().optional(),
    priority: z.number().optional(),
    ignored: z.boolean().optional(),
    predicate: z.array(PredicateStatement).optional(),
    requiresEquipped: z.boolean().nullable().optional(),
    requiresInvestment: z.boolean().nullable().optional(),
    spinoff: z.string().nonempty().optional(),
});

export type RuleElementSource = z.infer<typeof RuleElementSource>;
