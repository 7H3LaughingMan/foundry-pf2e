import { ActorType, CreaturePF2e } from "./../../actor/index.ts";
import { RuleElement, RuleElementOptions } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;
/**
 * @category RuleElement
 */
declare class BaseSpeedRuleElement extends RuleElement<BaseSpeedRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    static autogenForms: boolean;
    constructor(data: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): BaseSpeedRuleSchema;
    beforePrepareData(): void;
}
interface BaseSpeedRuleElement extends RuleElement<BaseSpeedRuleSchema>, ModelPropsFromRESchema<BaseSpeedRuleSchema> {
    get actor(): CreaturePF2e;
}
type BaseSpeedRuleSchema = RuleElementSchema & {
    selector: fields.StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, true>;
};
export { BaseSpeedRuleElement };
