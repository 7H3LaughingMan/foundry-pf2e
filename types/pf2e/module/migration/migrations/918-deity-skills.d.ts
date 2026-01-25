import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Fix skills section of deities */
export declare class Migration918DeitySkills extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
