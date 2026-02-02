import { EffectAreaShape, ItemType, RangeData } from "#pf2e-module/item/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zItemType: z.ZodLazy<z.ZodLiteral<ItemType>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.Item.documentClasses)),
);

export const zRangeData: z.ZodType<RangeData, RangeData> = z.strictObject({
    increment: z.number().nullable(),
    max: z.number(),
});

export const zEffectAreaShape: z.ZodLiteral<EffectAreaShape> = z.literal([
    "burst",
    "cone",
    "cube",
    "cylinder",
    "emanation",
    "line",
    "square",
]);
