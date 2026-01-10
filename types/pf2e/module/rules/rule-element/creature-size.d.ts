import { ActorType, CreaturePF2e } from "./../../actor/index.ts";
import { Size } from "./../../data.ts";
import { RecordField } from "./../../system/schema-data-fields.ts";
import { RuleElement, RuleElementOptions } from "./base.ts";
import { ModelPropsFromRESchema, ResolvableValueField, RuleElementSchema, RuleElementSource } from "./data.ts";
import fields = foundry.data.fields;
/**
 * @category RuleElement
 * Change a creature's size
 */
declare class CreatureSizeRuleElement extends RuleElement<CreatureSizeRuleSchema> {
    #private;
    protected static validActorTypes: ActorType[];
    constructor(data: RuleElementSource, options: RuleElementOptions);
    static defineSchema(): CreatureSizeRuleSchema;
    beforePrepareData(): void;
}
interface CreatureSizeRuleElement
    extends RuleElement<CreatureSizeRuleSchema>, ModelPropsFromRESchema<CreatureSizeRuleSchema> {
    get actor(): CreaturePF2e;
}
type CreatureSizeRuleSchema = RuleElementSchema & {
    value: ResolvableValueField<true, false, true>;
    reach: RecordField<
        fields.StringField<"add" | "upgrade" | "override", "add" | "upgrade" | "override", true, false, false>,
        ResolvableValueField<true, false, false>,
        false,
        true,
        true
    >;
    resizeEquipment: fields.BooleanField<boolean, boolean, false, false, false>;
    minimumSize: fields.StringField<Size, Size, false, false, false>;
    maximumSize: fields.StringField<Size, Size, false, false, false>;
};
export { CreatureSizeRuleElement };
