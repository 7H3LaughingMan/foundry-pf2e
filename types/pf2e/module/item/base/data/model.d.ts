import { ActorPF2e } from "./../../../actor/index.ts";
import { MigrationDataField } from "./../../../data.ts";
import { RuleElementSource } from "./../../../rules/index.ts";
import { SlugField } from "./../../../system/schema-data-fields.ts";
import { ItemPF2e } from "../document.ts";
import { ItemDescriptionData } from "./system.ts";
import fields = foundry.data.fields;
declare abstract class ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry
    .abstract.TypeDataModel<TParent, TSchema> {
    static LOCALIZATION_PREFIXES: string[];
    static defineSchema(): ItemSystemSchema;
    get actor(): ActorPF2e | null;
}
interface ItemSystemModel<TParent extends ItemPF2e, TSchema extends ItemSystemSchema> extends foundry.abstract
    .TypeDataModel<TParent, TSchema> {
    description: ItemDescriptionData;
}
type ItemSystemSchema = {
    description: fields.SchemaField<{
        value: fields.StringField<string, string, true, false, true>;
        gm: fields.StringField<string, string, true, false, true>;
    }>;
    publication: fields.SchemaField<{
        title: fields.StringField<string, string, true, false, true>;
        authors: fields.StringField<string, string, true, false, true>;
        license: fields.StringField<"OGL" | "ORC", "OGL" | "ORC", true, false, true>;
        remaster: fields.BooleanField;
    }>;
    rules: fields.ArrayField<fields.ObjectField<RuleElementSource, RuleElementSource, true, false, false>>;
    slug: SlugField<true, true, true>;
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>>;
    }>;
    _migration: MigrationDataField;
};
export { ItemSystemModel, type ItemSystemSchema };
