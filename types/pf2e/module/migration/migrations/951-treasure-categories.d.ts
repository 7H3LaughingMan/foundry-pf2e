import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration951TreasureCategories extends MigrationBase {
    #private;
    static version: number;
    updateItem(
        source: ItemSourcePF2e & {
            "==system"?: object;
        },
    ): Promise<void>;
}
