import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Move handling of Apex attribute boosts from rule elements to equipment system data  */
export declare class Migration855ApexEquipmentSystemData extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
