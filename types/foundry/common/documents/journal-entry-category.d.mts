import { Document, DocumentMetadata } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseJournalEntry } from "./_module.mjs";

export default class BaseJournalEntryCategory<TParent extends BaseJournalEntry | null> extends Document<TParent, JournalEntryCategorySchema> {
    static override get metadata(): JournalEntryCategoryMetadata;

    static override defineSchema(): JournalEntryCategorySchema;
}

export default interface BaseJournalEntryCategory<TParent extends BaseJournalEntry | null>
    extends Document<TParent, JournalEntryCategorySchema>, fields.ModelPropsFromSchema<JournalEntryCategorySchema> {
    get documentName(): JournalEntryCategoryMetadata["name"];
}

interface JournalEntryCategoryMetadata extends DocumentMetadata {
    name: "JournalEntryCategory";
    collection: "categories";
    label: "DOCUMENT.JournalEntryCategory";
    labelPlural: "DOCUMENT.JournalEntryCategories";
    isEmbedded: true;
}

type JournalEntryCategorySchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    sort: fields.IntegerSortField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type JournalEntryCategorySource = fields.SourceFromSchema<JournalEntryCategorySchema>;
