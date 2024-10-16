import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Remove AE-likes that increase the size of a PC's focus pool. */
export declare class Migration890RMClassItemClassDC extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
