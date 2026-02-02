import { MagicTradition, SpellTrait } from "#pf2e-module/item/spell/types.js";

import * as R from "remeda";
import * as z from "zod";

export const zMagicTradition: z.ZodLazy<z.ZodLiteral<MagicTradition>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.magicTraditions)),
);

export const zSpellTrait: z.ZodLazy<z.ZodLiteral<SpellTrait>> = z.lazy(() =>
    z.literal(R.keys(CONFIG.PF2E.spellTraits)),
);
