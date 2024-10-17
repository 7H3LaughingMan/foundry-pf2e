import { ActorType } from '../../actor/types.ts';
import { ArrayField, StringField } from '../../../../foundry/common/data/fields.ts';
import { ModelPropsFromRESchema } from './data.ts';
import { RuleElementPF2e, RuleElementSchema } from './index.ts';
declare class ActorTraitsRuleElement extends RuleElementPF2e<ActorTraitsRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    static defineSchema(): ActorTraitsRuleSchema;
    onApplyActiveEffects(): void;
}
type ActorTraitsRuleSchema = RuleElementSchema & {
    add: ArrayField<StringField<string, string, true, false, false>>;
    remove: ArrayField<StringField<string, string, true, false, false>>;
};
interface ActorTraitsRuleElement extends RuleElementPF2e<ActorTraitsRuleSchema>, ModelPropsFromRESchema<ActorTraitsRuleSchema> {
}
export { ActorTraitsRuleElement };
