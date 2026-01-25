import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Convert bracketed values into resolvable strings */
export declare class Migration945REBracketsToStrings extends MigrationBase {
    #private;
    static version: number;
    /** Update path to land base or derived speed in rule elements. */
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
