import { ItemSourcePF2e } from "types/pf2e/module/item/base/data/index.ts";
import { MigrationBase } from "../base.ts";
export declare class Migration715DangerousSorcery extends MigrationBase {
    static version: number;
    private dangerousSorcery;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
