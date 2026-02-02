import { ActionType, NonPhysicalItemType, ProficiencyRank } from "foundry-pf2e";

import * as R from "remeda";
import * as z from "zod";

export const zActionType: z.ZodLazy<z.ZodLiteral<ActionType>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.actionTypes)),
);

export const zNonPhysicalItemType: z.ZodLiteral<NonPhysicalItemType> = z.literal([
    "action",
    "affliction",
    "ancestry",
    "background",
    "campaignFeature",
    "class",
    "condition",
    "deity",
    "effect",
    "feat",
    "heritage",
    "kit",
    "lore",
    "melee",
    "spell",
    "spellcastingEntry",
]);

export const zProficiencyRank: z.ZodLazy<z.ZodLiteral<ProficiencyRank>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.proficiencyRanks)),
);
