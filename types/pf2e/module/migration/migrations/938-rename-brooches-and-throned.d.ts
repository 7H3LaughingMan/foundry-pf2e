import { MigrationBase } from "../base.ts";
import { ActorSourcePF2e } from "./../../actor/data/index.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/**
 * In Foundry Version 13, all broach core item images were corrected to brooch.
 * While there are no instances of macro nor token replacements in our system, they may exist in user worlds.
 */
export declare class Migration938RenameBroochesAndThroned extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
    updateTable(source: foundry.documents.RollTableSource): Promise<void>;
    updateMacro(source: foundry.documents.MacroSource): Promise<void>;
    updateToken(tokenData: foundry.documents.TokenSource): Promise<void>;
}
