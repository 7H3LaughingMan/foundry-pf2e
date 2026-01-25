import { MigrationBase } from "../base.ts";
import { ItemSourcePF2e } from "./../../item/base/data/index.ts";
declare class Migration949NPCRangeData extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
/** Returns range from traits data */
declare function getLegacyRangeData(traits: string[]): {
    increment: number | null;
    max: number | null;
} | null;
export { getLegacyRangeData, Migration949NPCRangeData };
