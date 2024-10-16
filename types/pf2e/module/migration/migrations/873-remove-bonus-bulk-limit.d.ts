import { ActorSourcePF2e } from "types/pf2e/module/actor/data/index.ts";
import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration873RemoveBonusBulkLimit extends MigrationBase {
    static version: number;
    updateActor(source: ActorSourcePF2e): Promise<void>;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
