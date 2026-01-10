import { ItemSheetOptions } from "./../base/sheet/sheet.ts";
import { PhysicalItemSheetData, PhysicalItemSheetPF2e } from "./../physical/index.ts";
import { TreasureSystemSchema } from "./data.ts";
import { TreasurePF2e } from "./document.ts";
import { TreasureCategory } from "./types.ts";
export declare class TreasureSheetPF2e extends PhysicalItemSheetPF2e<TreasurePF2e> {
    getData(options?: Partial<ItemSheetOptions>): Promise<TreasureSheetData>;
}
interface TreasureSheetData extends PhysicalItemSheetData<TreasurePF2e> {
    currencies: ConfigPF2e["PF2E"]["currencies"];
    categories: Record<TreasureCategory, string>;
    systemFields: TreasureSystemSchema;
}
export {};
