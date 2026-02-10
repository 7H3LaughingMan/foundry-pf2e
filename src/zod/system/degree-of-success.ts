import { DegreeAdjustmentAmount, DegreeOfSuccessIndex, DegreeOfSuccessString } from "#pf2e-module/system/degree-of-success.js";
import { zZeroToThree } from "#zod/data.ts";

import * as z from "zod";

export const zDegreeAdjustmentAmount: z.ZodLiteral<DegreeAdjustmentAmount> = z.literal([
    -2,
    -1,
    1,
    2,
    "criticalFailure",
    "failure",
    "success",
    "criticalSuccess",
]);

export const zDegreeOfSuccessIndex: z.ZodLiteral<DegreeOfSuccessIndex> = zZeroToThree;

export const zDegreeOfSuccessString: z.ZodLiteral<DegreeOfSuccessString> = z.literal(["criticalFailure", "failure", "success", "criticalSuccess"]);
