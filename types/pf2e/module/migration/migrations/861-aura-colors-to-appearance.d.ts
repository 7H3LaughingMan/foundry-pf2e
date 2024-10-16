import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
/** Move aura RE `colors` data to `appearance` property */
export declare class Migration861AuraColorsToAppearance extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
