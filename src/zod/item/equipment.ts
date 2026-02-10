import { EquipmentTrait } from "#pf2e-module/item/equipment/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zEquipmentTrait: z.ZodLazy<z.ZodLiteral<EquipmentTrait>> = z.lazy(() => z.literal(R.keys(CONFIG.PF2E.equipmentTraits)));
