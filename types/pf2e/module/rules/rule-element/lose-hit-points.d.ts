import { ActorType, CreaturePF2e } from "./../../actor/index.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { RuleElement } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;
/** Reduce current hit points without applying damage */
declare class LoseHitPointsRuleElement extends RuleElement<LoseHitPointsRuleSchema> {
    static validActorTypes: ActorType[];
    static defineSchema(): LoseHitPointsRuleSchema;
    onCreate(actorUpdates: Record<string, unknown>): void;
    beforePrepareData(): void;
    preUpdate(changes: DeepPartial<ItemSourcePF2e>): Promise<void>;
}
interface LoseHitPointsRuleElement
    extends RuleElement<LoseHitPointsRuleSchema>, ModelPropsFromRESchema<LoseHitPointsRuleSchema> {
    get actor(): CreaturePF2e;
}
type LoseHitPointsRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, false>;
    /** Whether the lost hit points are recoverable while the parent item is present on the actor */
    recoverable: fields.BooleanField<boolean, boolean, false>;
    /**
     * Lost hitpoints should reevaluate on item update, with the parent actor losing the difference in HP between the
     * new and old values.
     */
    reevaluateOnUpdate: fields.BooleanField<boolean, boolean, false>;
};
export { LoseHitPointsRuleElement };
