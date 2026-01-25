import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
export declare class Migration715DangerousSorcery extends MigrationBase {
    static version: number;
    private dangerousSorcery;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
