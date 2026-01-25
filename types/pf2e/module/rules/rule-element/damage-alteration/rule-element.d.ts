import { AELikeChangeMode } from "../ae-like.ts";
import { ModelPropsFromRESchema, RuleElementSchema } from "../data.ts";
import { ResolvableValueField, RuleElement } from "../index.ts";
import { DamageType } from "./../../../system/damage/types.ts";
import fields = foundry.data.fields;
/** Alter certain aspects of individual components (modifiers and dice) of a damage roll. */
declare class DamageAlterationRuleElement extends RuleElement<DamageAlterationSchema> {
    static autogenForms: boolean;
    static defineSchema(): DamageAlterationSchema;
    static LOCALIZATION_PREFIXES: string[];
    resolveValue(
        value: unknown,
        defaultValue: null,
        options: {
            resolvables: Record<string, unknown>;
        },
    ): DamageAlterationValue | null;
    beforePrepareData(): void;
}
interface DamageAlterationRuleElement
    extends RuleElement<DamageAlterationSchema>, ModelPropsFromRESchema<DamageAlterationSchema> {}
type DamageAlterationProperty = "dice-faces" | "dice-number" | "damage-type" | "tags";
type DamageAlterationSchema = RuleElementSchema & {
    selectors: fields.SetField<fields.StringField<string, string, true, false, false>>;
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, true>;
    property: fields.StringField<DamageAlterationProperty, DamageAlterationProperty, true, false, false>;
    value: ResolvableValueField<true, true, true>;
    /** An optional relabeling of the altered unit of damage */
    relabel: fields.StringField<string, string, false, true, true>;
};
type DamageAlterationSource = fields.SourceFromSchema<DamageAlterationSchema>;
type DamageAlterationValue = DamageType | number | string[];
export { DamageAlterationRuleElement };
export type { DamageAlterationProperty, DamageAlterationSource, DamageAlterationValue };
