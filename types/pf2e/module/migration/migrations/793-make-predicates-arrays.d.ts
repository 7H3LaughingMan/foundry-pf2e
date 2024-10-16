import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert predicate properties of rule elements to arrays  */
export declare class Migration793MakePredicatesArrays extends MigrationBase {
    #private;
    static version: number;
    /** Clear predicates in custom modifiers */
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
