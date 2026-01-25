import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Remove ability boost levels data from class items */
export declare class Migration742RMAbilityBoostLevels extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
