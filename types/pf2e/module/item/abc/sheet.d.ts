import { AttributeString } from "../../actor/types.ts";
import { AncestryPF2e, BackgroundPF2e, ClassPF2e } from "../index.ts";
import { ABCFeatureEntryData } from "./data.ts";
import { ItemSheetDataPF2e, ItemSheetOptions, ItemSheetPF2e } from "../base/sheet/sheet.ts";

declare abstract class ABCSheetPF2e<TItem extends ABCItem> extends ItemSheetPF2e<TItem> {
    #private;
    static get defaultOptions(): ItemSheetOptions;
    getData(options?: Partial<ItemSheetOptions>): Promise<ABCSheetData<TItem>>;
    protected getLocalizedAbilities(traits: {
        value: AttributeString[];
    }): {
        [key: string]: string;
    };
    protected _onDrop(event: DragEvent): Promise<void>;
    activateListeners($html: JQuery): void;
}
interface ABCSheetData<TItem extends ABCItem> extends ItemSheetDataPF2e<TItem> {
    features: {
        key: string;
        item: FeatureSheetData;
    }[];
}
type ABCItem = AncestryPF2e | BackgroundPF2e | ClassPF2e;
interface FeatureSheetData extends ABCFeatureEntryData {
    fromWorld: boolean;
}
export { ABCSheetPF2e, type ABCSheetData };
