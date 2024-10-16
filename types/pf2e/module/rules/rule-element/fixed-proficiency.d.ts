import type { ActorType, CharacterPF2e } from "types/pf2e/module/actor/index.ts";
import { AttributeString } from "types/pf2e/module/actor/types.ts";
import type { StringField } from "types/foundry/common/data/fields.ts";
import { RuleElementPF2e } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema } from "./data.ts";
/**
 * @category RuleElement
 */
declare class FixedProficiencyRuleElement extends RuleElementPF2e<FixedProficiencyRuleSchema> {
    protected static validActorTypes: ActorType[];
    static defineSchema(): FixedProficiencyRuleSchema;
    static validateJoint(data: SourceFromSchema<FixedProficiencyRuleSchema>): void;
    beforePrepareData(): void;
    afterPrepareData(): void;
}
interface FixedProficiencyRuleElement extends RuleElementPF2e<FixedProficiencyRuleSchema>, ModelPropsFromRESchema<FixedProficiencyRuleSchema> {
    get actor(): CharacterPF2e;
}
type FixedProficiencyRuleSchema = RuleElementSchema & {
    selector: StringField<string, string, true, false, false>;
    value: ResolvableValueField<true, false, false>;
    ability: StringField<AttributeString, AttributeString, true, false, false>;
};
export { FixedProficiencyRuleElement };
