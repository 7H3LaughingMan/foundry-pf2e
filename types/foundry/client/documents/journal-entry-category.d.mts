import { BaseJournalEntryCategory } from "./_module.mjs";
import { ClientDocument } from "./abstract/_module.mjs";
import JournalEntry from "./journal-entry.mjs";

declare const ClientBaseJournalEntryCategory: new <TParent extends JournalEntry | null>(
    ...args: any
) => BaseJournalEntryCategory<TParent> & ClientDocument<TParent>;

interface ClientBaseJournalEntryCategory<TParent extends JournalEntry | null> extends InstanceType<typeof ClientBaseJournalEntryCategory<TParent>> {}

export default class JournalEntryCategory<TParent extends JournalEntry | null = JournalEntry | null> extends ClientBaseJournalEntryCategory<TParent> {}

export default interface JournalEntryCategory<TParent extends JournalEntry | null = JournalEntry | null> extends ClientBaseJournalEntryCategory<TParent> {
    get documentName(): "JournalEntryCategory";
}
