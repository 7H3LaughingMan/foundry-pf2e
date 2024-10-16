import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import type { JournalEntrySource } from "types/foundry/common/documents/journal-entry.ts";
import { MigrationBase } from "../base.ts";
/** Rename all uses and mentions of "flat-footed" to "off-guard"  */
export declare class Migration850FlatFootedToOffGuard extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateJournalEntry(source: JournalEntrySource): Promise<void>;
}
