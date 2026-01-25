import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Fix unannotated shield traits added from Lost Omens: Treasure Vault */
export declare class Migration827FixTVShieldTraits extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
