import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
export declare class Migration951TreasureCategories extends MigrationBase {
    #private;
    static version: number;
    updateItem(
        source: ItemSourcePF2e & {
            "==system"?: object;
        },
    ): Promise<void>;
}
