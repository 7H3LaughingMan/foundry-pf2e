import { PredicateField, SlugField } from "./../../system/schema-data-fields.ts";
import fields = foundry.data.fields;
type RuleElementSource = {
    key: string;
    label?: string;
    slug?: string | null;
    predicate?: JSONValue;
    priority?: JSONValue;
    ignored?: JSONValue;
    requiresInvestment?: JSONValue;
    requiresEquipped?: JSONValue;
    removeUponCreate?: JSONValue;
};
type RuleValue = Exclude<JSONValue, undefined>;
type RuleElementSchema = {
    key: fields.StringField<string, string, true, false, false>;
    /** An identifying slug for the rule element: its significance and restrictions are determined per RE type */
    slug: SlugField;
    /** A label for use by any rule element for display in an interface */
    label: fields.StringField<string, string, false, false, false>;
    /** The place in order of application (ascending), among an actor's list of rule elements */
    priority: fields.NumberField<number, number, true, false, true>;
    /** A test of whether the rules element is to be applied */
    predicate: PredicateField;
    /** Whether the rule element is ignored and deactivated */
    ignored: fields.BooleanField<boolean, boolean, true, false, true>;
    /** Whether the rule element requires that the parent item (if physical) be equipped */
    requiresEquipped: fields.BooleanField<boolean, boolean, false, true, true>;
    /** Whether the rule element requires that the parent item (if physical) be invested */
    requiresInvestment: fields.BooleanField<boolean, boolean, false, true, true>;
    /** A grouping slug to mark a rule as a part of a spinoff effect, which some item types can compose */
    spinoff: SlugField<false, false, false>;
};
declare class ResolvableValueField<
    TRequired extends boolean,
    TNullable extends boolean,
    THasInitial extends boolean = false,
> extends fields.DataField<RuleValue, RuleValue, TRequired, TNullable, THasInitial> {
    #private;
    protected _validateType(value: JSONValue): false | void;
    /** No casting is applied to this value */
    protected _cast(value: JSONValue): JSONValue;
    protected _cleanType(value: JSONValue): RuleValue | undefined;
    protected _toInput(config: foundry.data.FormInputConfig<string>): HTMLInputElement;
}
type ModelPropsFromRESchema<TSchema extends RuleElementSchema> = Omit<fields.ModelPropsFromSchema<TSchema>, "label">;
export { ResolvableValueField };
export type { ModelPropsFromRESchema, RuleElementSchema, RuleElementSource, RuleValue };
