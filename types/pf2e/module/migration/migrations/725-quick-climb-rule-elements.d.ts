import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Predicate rule elements related to crafting entries to protect against partial entry data getting created */
export declare class Migration725QuickClimbREs extends MigrationBase {
    static version: number;
    private quickClimb;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
