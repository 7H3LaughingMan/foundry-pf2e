import { Document, DocumentMetadata, EmbeddedCollection } from "../abstract/_module.mjs";
import * as fields from "../data/fields.mjs";
import { BaseFolder, BaseJournalEntryPage } from "./_module.mjs";
import BaseJournalEntryCategory from "./journal-entry-category.mjs";

/** The JournalEntry document model. */
export default class BaseJournalEntry extends Document<null, JournalEntrySchema> {
    static override get metadata(): JournalEntryMetadata;

    static override defineSchema(): JournalEntrySchema;
}

export default interface BaseJournalEntry extends Document<null, JournalEntrySchema>, fields.ModelPropsFromSchema<JournalEntrySchema> {
    readonly pages: EmbeddedCollection<BaseJournalEntryPage<this>>;

    readonly categories: EmbeddedCollection<BaseJournalEntryCategory<this>>;

    get documentName(): JournalEntryMetadata["name"];
}

interface JournalEntryMetadata extends DocumentMetadata {
    name: "JournalEntry";
    collection: "journal";
    indexed: true;
    compendiumIndexFields: ["_id", "name", "sort"];
    embedded: {
        JournalEntryCategory: "categories";
        JournalEntryPage: "pages";
    };
    label: "DOCUMENT.JournalEntry";
    labelPlural: "DOCUMENT.JournalEntries";
    isPrimary: true;
    permissions: Omit<DocumentMetadata["permissions"], "create"> & {
        create: "JOURNAL_CREATE";
    };
}

type JournalEntrySchema = {
    _id: fields.DocumentIdField;
    name: fields.StringField<string, string, true, false, false>;
    pages: fields.EmbeddedCollectionField<BaseJournalEntryPage<BaseJournalEntry>>;
    folder: fields.ForeignDocumentField<BaseFolder>;
    categories: fields.EmbeddedCollectionField<BaseJournalEntryCategory<BaseJournalEntry>>;
    sort: fields.IntegerSortField;
    ownership: fields.DocumentOwnershipField;
    flags: fields.DocumentFlagsField;
    _stats: fields.DocumentStatsField;
};

export type JournalEntrySource = fields.SourceFromSchema<JournalEntrySchema>;
