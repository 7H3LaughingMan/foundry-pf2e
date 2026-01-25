import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/** Wipe URL sources (typically Archives of Nethys) */
export declare class Migration766WipeURLSources extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
