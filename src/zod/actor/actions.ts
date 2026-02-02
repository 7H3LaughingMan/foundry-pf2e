import { ActionCost, ActionSection } from "#pf2e-module/actor/actions/types.js";

import * as z from "zod";

export const zActionCost: z.ZodLiteral<ActionCost> = z.literal(["free", "reaction", 0, 1, 2, 3]);

export const zActionSection: z.ZodLiteral<ActionSection> = z.literal(["basic", "skill", "specialty-basic"]);
