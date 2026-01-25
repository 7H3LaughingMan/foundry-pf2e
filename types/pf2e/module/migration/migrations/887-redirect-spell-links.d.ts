import { JournalEntrySource } from "#client/documents/_module.mjs";
import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Redirect links some to-be-deleted spells to replacements */
export declare class Migration887RedirectSpellLinks extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: JournalEntrySource): Promise<void>;
}
