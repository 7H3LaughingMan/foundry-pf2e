import { Zod } from "#foundry-pf2e/zod";
import * as z from "zod";

export const AdjustDegreeOfSuccessSource = Zod.RuleElements.RuleElementSource.extend({
    key: z.literal("AdjustDegreeOfSuccess"),
    selector: z.array(z.string().nonempty()).optional(),
    adjustment: z.partialRecord(
        z.literal(["all", "criticalFailure", "failure", "success", "criticalSuccess"]),
        z
            .literal([
                "one-degree-better",
                "one-degree-worse",
                "two-degrees-better",
                "two-degrees-worse",
                "to-critical-failure",
                "to-failure",
                "to-success",
                "to-critical-success",
            ])
            .optional(),
    ),
});

export type AdjustDegreeOfSuccessSource = z.infer<typeof AdjustDegreeOfSuccessSource>;
