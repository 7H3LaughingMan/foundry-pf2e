import { DamageDiceOverride } from "./../../actor/modifiers.ts";
import { NullableBooleanField, SlugField } from "./../../system/schema-data-fields.ts";
import { RuleElement, RuleElementOptions } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;
declare class DamageDiceRuleElement extends RuleElement<DamageDiceRuleSchema> {
    #private;
    constructor(data: DamageDiceSource, options: RuleElementOptions);
    static defineSchema(): DamageDiceRuleSchema;
    beforePrepareData(): void;
}
interface DamageDiceSource extends RuleElementSource {
    selector?: JSONValue;
    name?: JSONValue;
    diceNumber?: JSONValue;
    dieSize?: JSONValue;
    override?: JSONValue;
    damageType?: JSONValue;
    critical?: JSONValue;
    category?: JSONValue;
    damageCategory?: JSONValue;
    hideIfDisabled?: JSONValue;
}
interface DamageDiceRuleElement
    extends RuleElement<DamageDiceRuleSchema>, ModelPropsFromRESchema<DamageDiceRuleSchema> {}
type DamageDiceRuleSchema = RuleElementSchema & {
    /** All domains to add a modifier to */
    selector: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    /** The number of dice to add */
    diceNumber: ResolvableValueField<true, true, true>;
    /** The damage die size */
    dieSize: fields.StringField<string, string, true, true, true>;
    /** The damage type */
    damageType: fields.StringField<string, string, true, true, true>;
    /**
     * Control whether and how these damage dice are included in a roll depending on the result of the preceding check.
     * - `true`: the dice are added only to critical damage rolls, without doubling.
     * - `false`: the dice are added to both normal and critical damage rolls, without doubling.
     * - `null` (default): the dice are added to both normal and critical damage rolls and are doubled in critical
     *   damage rolls.
     */
    critical: NullableBooleanField<true, true, true>;
    /** The damage category */
    category: fields.StringField<
        "persistent" | "precision" | "splash",
        "persistent" | "precision" | "splash",
        true,
        true,
        true
    >;
    /** A list of tags associated with this damage */
    tags: fields.ArrayField<SlugField<true, false, false>, string[], string[]>;
    /** Damage dice override data */
    override: fields.ObjectField<DamageDiceOverride, DamageDiceOverride, false, true, false>;
    /** Hide this dice change from breakdown tooltips if it is disabled */
    hideIfDisabled: fields.BooleanField<boolean, boolean, true, false, true>;
    /** Whether this rule element is for use with battle forms */
    battleForm: fields.BooleanField;
};
export { DamageDiceRuleElement };
export type { DamageDiceSource };
