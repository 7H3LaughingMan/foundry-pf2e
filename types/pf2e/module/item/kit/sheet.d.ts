import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "../base/sheet/sheet.ts";
import { CoinsPF2e } from "../physical/index.ts";
import { KitEntryData } from "./data.ts";
import { KitPF2e } from "./document.ts";

declare class KitSheetPF2e extends ItemSheetPF2e<KitPF2e> {
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<KitSheetData>;
    protected _onDrop(event: DragEvent): Promise<void>;
    removeItem(event: MouseEvent): Promise<KitPF2e | null>;
    activateListeners($html: JQuery): void;
    protected _updateObject(event: Event, formData: Record<string, unknown>): Promise<void>;
}
interface KitSheetData extends ItemSheetDataPF2e<KitPF2e> {
    priceString: CoinsPF2e;
    items: Record<string, KitEntrySheetData>;
}
interface KitEntrySheetData extends KitEntryData {
    fromWorld: boolean;
}
export { KitSheetPF2e };
