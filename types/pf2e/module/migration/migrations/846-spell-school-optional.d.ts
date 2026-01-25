import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
export declare class Migration846SpellSchoolOptional extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
