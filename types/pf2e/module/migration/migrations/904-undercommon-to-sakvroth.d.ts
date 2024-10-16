import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Change all instances of "undercommon" to "sakvroth". */
export declare class Migration904UndercommonToSakvroth extends MigrationBase {
    #private;
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
