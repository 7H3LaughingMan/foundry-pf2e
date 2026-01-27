import * as z from "zod";
import { RuleElementSource } from "./base.ts";

export const ActorTraitsSource = RuleElementSource.extend({
    key: z.literal("ActorTraits"),
    add: z.array(z.string().nonempty()).optional(),
    removed: z.array(z.string().nonempty()).optional(),
});

export type ActorTraitsSource = z.infer<typeof ActorTraitsSource>;
