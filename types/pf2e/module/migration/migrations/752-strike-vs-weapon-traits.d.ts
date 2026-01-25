import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Change several AdjustStrike rule elements to modify weapon traits rather than action traits */
export declare class Migration752StrikeVsWeaponTraits extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
