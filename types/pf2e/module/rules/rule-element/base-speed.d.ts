import { ActorType, CreaturePF2e } from '../../actor/index.ts';
import { StringField } from '../../../../foundry/common/data/fields.ts';
import { RuleElementOptions, RuleElementPF2e } from './base.ts';
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from './data.ts';
/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElementPF2e<BaseSpeedRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    constructor(data: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): BaseSpeedRuleSchema;
    beforePrepareData(): void;
}
interface BaseSpeedRuleElement extends RuleElementPF2e<BaseSpeedRuleSchema>, ModelPropsFromRESchema<BaseSpeedRuleSchema> {
    get actor(): CreaturePF2e;
}
type BaseSpeedRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, true>;
};
export { BaseSpeedRuleElement };
