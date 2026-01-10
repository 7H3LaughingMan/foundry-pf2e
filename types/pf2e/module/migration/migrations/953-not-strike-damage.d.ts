import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Certain things were incorrectly set to be on strike-damage, but apply to all weapon and unarmed damage */
export declare class Migration953NotStrikeDamage extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
