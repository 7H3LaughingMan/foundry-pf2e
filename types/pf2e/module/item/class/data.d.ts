import { ModelPropsFromSchema, SourceFromSchema } from "#common/data/fields.mjs";
import { AttributeString, SkillSlug } from "./../../actor/types.ts";
import { ProficiencyRankField, RarityField } from "./../../model.ts";
import { LaxArrayField, RecordField, SlugField } from "./../../system/schema-data-fields.ts";
import { ABCFeatureEntryField } from "./../abc/data.ts";
import { ItemSystemModel, ItemSystemSchema } from "./../base/data/model.ts";
import { BaseItemSourcePF2e, ItemSystemSource, RarityTraitAndOtherTags } from "./../base/data/system.ts";
import { ClassPF2e } from "./document.ts";
import fields = foundry.data.fields;
type ClassSource = BaseItemSourcePF2e<"class", ClassSystemSource>;
declare class ClassSystemData extends ItemSystemModel<ClassPF2e, ClassSystemSchema> {
    static LOCALIZATION_PREFIXES: string[];
    static defineSchema(): ClassSystemSchema;
}
interface ClassSystemData
    extends
        ItemSystemModel<ClassPF2e, ClassSystemSchema>,
        Omit<fields.ModelPropsFromSchema<ClassSystemSchema>, "description"> {
    level?: never;
    traits: RarityTraitAndOtherTags;
}
type ClassSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    items: RecordField<fields.StringField<string, string, true, false>, ABCFeatureEntryField, true, false, true, true>;
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>>;
        rarity: RarityField;
    }>;
    keyAbility: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<AttributeString, AttributeString, true, false>>;
        selected: fields.StringField<AttributeString, AttributeString, true, true, true>;
    }>;
    hp: fields.NumberField<number, number, true, false, true>;
    perception: ProficiencyRankField;
    savingThrows: fields.SchemaField<{
        fortitude: ProficiencyRankField;
        reflex: ProficiencyRankField;
        will: ProficiencyRankField;
    }>;
    attacks: fields.SchemaField<ClassAttackProficienciesSchema>;
    defenses: fields.SchemaField<ClassDefenseProficienciesSchema>;
    /** Starting proficiency in "spell attack rolls and DCs" */
    spellcasting: ProficiencyRankField;
    trainedSkills: fields.SchemaField<{
        value: LaxArrayField<fields.StringField<SkillSlug, SkillSlug, true, false>>;
        additional: fields.NumberField<number, number, true, false, true>;
    }>;
    ancestryFeatLevels: fields.SchemaField<{
        value: fields.ArrayField<fields.NumberField<number, number, true, false>>;
    }>;
    classFeatLevels: fields.SchemaField<{
        value: fields.ArrayField<fields.NumberField<number, number, true, false>>;
    }>;
    generalFeatLevels: fields.SchemaField<{
        value: fields.ArrayField<fields.NumberField<number, number, true, false>>;
    }>;
    skillFeatLevels: fields.SchemaField<{
        value: fields.ArrayField<fields.NumberField<number, number, true, false>>;
    }>;
    skillIncreaseLevels: fields.SchemaField<{
        value: fields.ArrayField<fields.NumberField<number, number, true, false>>;
    }>;
};
type ClassAttackProficienciesSchema = {
    simple: ProficiencyRankField;
    martial: ProficiencyRankField;
    advanced: ProficiencyRankField;
    unarmed: ProficiencyRankField;
    other: fields.SchemaField<{
        name: fields.StringField;
        rank: ProficiencyRankField;
    }>;
};
type ClassDefenseProficienciesSchema = {
    unarmored: ProficiencyRankField;
    light: ProficiencyRankField;
    medium: ProficiencyRankField;
    heavy: ProficiencyRankField;
};
type ClassAttackProficiencies = ModelPropsFromSchema<ClassAttackProficienciesSchema>;
type ClassDefenseProficiencies = ModelPropsFromSchema<ClassDefenseProficienciesSchema>;
type ClassSystemSource = SourceFromSchema<ClassSystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
    traits: RarityTraitAndOtherTags;
};
export { ClassSystemData };
export type { ClassAttackProficiencies, ClassDefenseProficiencies, ClassSource, ClassSystemSource };
