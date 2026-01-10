import { RuleElement } from "./base.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "./data.ts";
import { ItemAlteration, ItemAlterationSchema } from "./item-alteration/alteration.ts";
import fields = foundry.data.fields;
/** An effect that applies ephemerally during a single action, such as a strike */
declare class EphemeralEffectRuleElement extends RuleElement<EphemeralEffectSchema> {
    #private;
    static defineSchema(): EphemeralEffectSchema;
    static validateJoint(data: fields.SourceFromSchema<EphemeralEffectSchema>): void;
    afterPrepareData(): void;
}
interface EphemeralEffectRuleElement
    extends RuleElement<EphemeralEffectSchema>, ModelPropsFromRESchema<EphemeralEffectSchema> {}
type EphemeralEffectSchema = RuleElementSchema & {
    affects: fields.StringField<"target" | "origin", "target" | "origin", true, false, true>;
    selectors: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    uuid: fields.StringField<string, string, true, false, false>;
    adjustName: fields.BooleanField<boolean, boolean, true, false, true>;
    alterations: fields.ArrayField<
        fields.EmbeddedDataField<ItemAlteration>,
        fields.SourceFromSchema<ItemAlterationSchema>[],
        ItemAlteration[],
        false,
        false,
        true
    >;
};
export { EphemeralEffectRuleElement };
