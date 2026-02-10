import { ModelPropsFromSchema, SourceFromSchema } from "#common/data/fields.mjs";
import { DamageType } from "./../../system/damage/index.ts";
import { DamageRoll } from "./../../system/damage/roll.ts";
import { AbstractEffectSchema, DurationData } from "./../abstract-effect/data.ts";
import { ItemSystemModel } from "./../base/data/model.ts";
import { BaseItemSourcePF2e, ItemSystemSource } from "./../base/data/system.ts";
import { ItemType } from "./../types.ts";
import { ConditionPF2e } from "./document.ts";
import { ConditionSlug } from "./types.ts";
import fields = foundry.data.fields;
type ConditionSource = BaseItemSourcePF2e<"condition", ConditionSystemSource>;
declare class ConditionSystemData extends ItemSystemModel<ConditionPF2e, ConditionSystemSchema> {
    static defineSchema(): ConditionSystemSchema;
    prepareBaseData(): void;
}
interface ConditionSystemData
    extends ItemSystemModel<ConditionPF2e, ConditionSystemSchema>, Omit<ModelPropsFromSchema<ConditionSystemSchema>, "description" | "value"> {
    slug: ConditionSlug;
    duration: DurationData;
    value: ConditionValueData;
    persistent: PersistentDamageData | null;
}
type ConditionSystemSchema = AbstractEffectSchema & {
    group: fields.StringField<string, string, true, true, true>;
    value: fields.SchemaField<ConditionValueSchema>;
    persistent?: fields.SchemaField<
        PersistentDamageValueSchema,
        SourceFromSchema<PersistentDamageValueSchema>,
        ModelPropsFromSchema<PersistentDamageValueSchema>,
        true,
        true,
        true
    >;
    references: fields.SchemaField<{
        parent: fields.SchemaField<
            ConditionParentSchema,
            SourceFromSchema<ConditionParentSchema>,
            ModelPropsFromSchema<ConditionParentSchema>,
            true,
            true,
            true
        >;
        children: fields.ArrayField<fields.SchemaField<ReferenceSchema<"condition">>>;
        overrides: fields.ArrayField<fields.SchemaField<ReferenceSchema<"condition">>>;
        overriddenBy: fields.ArrayField<fields.SchemaField<ReferenceSchema<"condition">>>;
    }>;
    overrides: fields.ArrayField<fields.StringField>;
};
type ConditionParentSchema = {
    id: fields.StringField<string, string, true, false, true>;
};
type ReferenceSchema<T extends ItemType> = {
    id: fields.StringField<string, string, true, false, true>;
    type: fields.StringField<T, T, true, false, true>;
};
type ConditionValueSchema = {
    isValued: fields.BooleanField<boolean, boolean, true, false>;
    value: fields.NumberField<number, number, true, true>;
};
type ConditionSystemSource = SourceFromSchema<ConditionSystemSchema> & {
    slug: ConditionSlug;
    level?: never;
    schema?: ItemSystemSource["schema"];
};
type PersistentDamageValueSchema = {
    formula: fields.StringField<string, string, true, false, true>;
    damageType: fields.StringField<DamageType, DamageType, true, false, true>;
    dc: fields.NumberField<number, number, true, false, true>;
    /** Whether this damage was multiplied due to a critical hit */
    criticalHit: fields.BooleanField<boolean, boolean, true, false, true>;
};
interface PersistentDamageData extends SourceFromSchema<PersistentDamageValueSchema> {
    damage: DamageRoll;
    expectedValue: number;
}
type ConditionValueData =
    | {
          isValued: true;
          value: number;
      }
    | {
          isValued: false;
          value: null;
      };
export { ConditionSystemData };
export type { ConditionSource, ConditionSystemSource, PersistentDamageData, PersistentDamageValueSchema };
