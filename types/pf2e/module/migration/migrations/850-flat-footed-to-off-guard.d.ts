import { ActorSourcePF2e } from "../../actor/data/index.ts";
import { ItemSourcePF2e } from "../../item/base/data/index.ts";
import { JournalEntrySource } from "../../../../foundry/common/documents/journal-entry.ts";
import { MigrationBase } from "../base.ts";

/** Rename all uses and mentions of "flat-footed" to "off-guard"  */
export declare class Migration850FlatFootedToOffGuard extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: JournalEntrySource): Promise<void>;
}
