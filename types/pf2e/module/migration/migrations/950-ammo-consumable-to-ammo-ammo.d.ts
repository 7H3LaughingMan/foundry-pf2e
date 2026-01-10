import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration950AmmoConsumableToAmmoAmmo extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
