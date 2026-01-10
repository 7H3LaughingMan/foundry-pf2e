import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Convert shield "armor" items to shield items */
export declare class Migration899ArmorShieldToShieldShield extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: MaybeShieldData): Promise<void>;
}
type MaybeShieldData = ItemSourcePF2e & {
    "==system"?: object;
};
export {};
