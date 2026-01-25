import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
/**  Move TempHPRuleElement source `onCreate` and `onTurnStart` to `events` object */
export declare class Migration847TempHPRuleEvents extends MigrationBase {
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
