import { MigrationDataField } from "../../../data.ts";
import { RuleElementSource } from "../../../rules/index.ts";
import { SlugField } from "../../../system/schema-data-fields.ts";
import { ArrayField, BooleanField, ObjectField, SchemaField, StringField } from "../../../../../foundry/common/data/fields.ts";
import { ItemPF2e } from "../document.ts";
import { ItemDescriptionData } from "./system.ts";
declare abstract class ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    static LOCALIZATION_PREFIXES: string[];
    static defineSchema(): ItemSystemSchema;
}
interface ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry.abstract.TypeDataModel<TParent, TSchema> {
    description: ItemDescriptionData;
}
type ItemSystemSchema = {
    description: SchemaField<{
        value: StringField<string, string, true, false, true>;
        gm: StringField<string, string, true, false, true>;
    }>;
    publication: SchemaField<{
        title: StringField<string, string, true, false, true>;
        authors: StringField<string, string, true, false, true>;
        license: StringField<"OGL" | "ORC", "OGL" | "ORC", true, false, true>;
        remaster: BooleanField<boolean, boolean, true, false, true>;
    }>;
    rules: ArrayField<ObjectField<RuleElementSource, RuleElementSource, true, false, false>, RuleElementSource[], RuleElementSource[], true, false, true>;
    slug: SlugField<true, true, true>;
    traits: SchemaField<{
        otherTags: ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
    }>;
    _migration: MigrationDataField;
};
export { ItemSystemModel, type ItemSystemSchema };
