import { ModelPropsFromRESchema, ResolvableValueField, RuleValue } from "../data.ts";
import { Weakness } from "./../../../actor/data/iwr.ts";
import { WeaknessType } from "./../../../actor/types.ts";
import { StrictArrayField } from "./../../../system/schema-data-fields.ts";
import { IWRException, IWRExceptionField, IWRRuleElement, IWRRuleSchema } from "./base.ts";
import fields = foundry.data.fields;
/** @category RuleElement */
declare class WeaknessRuleElement extends IWRRuleElement<WeaknessRuleSchema> {
    static defineSchema(): WeaknessRuleSchema;
    static validateJoint(source: fields.SourceFromSchema<WeaknessRuleSchema>): void;
    static get dictionary(): Record<WeaknessType, string>;
    get property(): Weakness[];
    getIWR(value: number): Weakness[];
}
interface WeaknessRuleElement extends IWRRuleElement<WeaknessRuleSchema>, ModelPropsFromRESchema<WeaknessRuleSchema> {
    value: RuleValue;
    type: WeaknessType[];
    exceptions: IWRException<WeaknessType>[];
}
type WeaknessRuleSchema = Omit<IWRRuleSchema, "exceptions"> & {
    value: ResolvableValueField<true, false, false>;
    exceptions: StrictArrayField<IWRExceptionField>;
    /** This is a "non-damage" Weakness, e.g. from contact with a holy weapon, and should only apply once. */
    applyOnce: fields.BooleanField<boolean, boolean, false, false, false>;
};
export { WeaknessRuleElement };
