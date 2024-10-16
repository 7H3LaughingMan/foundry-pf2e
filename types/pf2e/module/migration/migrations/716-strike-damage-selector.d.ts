import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration716StrikeDamageSelector extends MigrationBase {
    static version: number;
    private itemsToSkip;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
