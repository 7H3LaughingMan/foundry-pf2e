import { Zod } from "#foundry-pf2e/zod";
import * as z from "zod";

export const ActorTraitsSource = Zod.RuleElements.RuleElementSource.extend({
    key: z.literal("ActorTraits"),
    add: z.array(z.string().nonempty()).optional(),
    removed: z.array(z.string().nonempty()).optional(),
});

export type ActorTraitsSource = z.infer<typeof ActorTraitsSource>;
