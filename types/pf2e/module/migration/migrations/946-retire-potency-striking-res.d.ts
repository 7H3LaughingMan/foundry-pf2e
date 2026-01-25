import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Retire Striking and WeaponPotency rule elements, migrating them to item alterations. */
export declare class Migration946RetirePotencyStrikingREs extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
