import { ConsumableCategory, ConsumableTrait, OtherConsumableTag } from "#pf2e-module/item/consumable/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zConsumableCategory: z.ZodLazy<z.ZodLiteral<ConsumableCategory>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.consumableCategories)));

export const zConsumableTrait: z.ZodLazy<z.ZodLiteral<ConsumableTrait>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.consumableTraits)));

export const zOtherConsumableTag: z.ZodLazy<z.ZodLiteral<OtherConsumableTag>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.otherConsumableTags)));
