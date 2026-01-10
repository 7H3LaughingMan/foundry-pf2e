import { RuleElement } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
import fields = foundry.data.fields;
/** Roll Twice and keep either the higher or lower result */
declare class RollTwiceRuleElement extends RuleElement<RollTwiceRuleSchema> {
    static defineSchema(): RollTwiceRuleSchema;
    beforePrepareData(): void;
    afterRoll({ domains, roll, rollOptions }: RuleElement.AfterRollParams): Promise<void>;
}
interface RollTwiceRuleElement extends RuleElement<RollTwiceRuleSchema>, ModelPropsFromRESchema<RollTwiceRuleSchema> {}
type RollTwiceRuleSchema = RuleElementSchema & {
    selector: fields.ArrayField<
        fields.StringField<string, string, true, false, false>,
        string[],
        string[],
        true,
        false,
        true
    >;
    keep: fields.StringField<"higher" | "lower", "higher" | "lower", true, false, false>;
    /** If the hosting item is an effect, remove or expire it after a matching roll is made */
    removeAfterRoll: fields.BooleanField<boolean, boolean, false, false, false>;
};
export { RollTwiceRuleElement };
