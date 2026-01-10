import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration947FixPostPotencyStrikingPredicates extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
