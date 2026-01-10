import { ImageFilePath } from "#common/constants.mjs";
import { ItemUUID } from "#common/documents/_module.mjs";
import { ItemSystemData, ItemSystemSource } from "./../base/data/system.ts";
import fields = foundry.data.fields;
interface ABCFeatureEntryData {
    uuid: string;
    img: ImageFilePath;
    name: string;
    level: number;
}
interface ABCSystemSource extends ItemSystemSource {
    items: Record<string, ABCFeatureEntryData>;
}
interface ABCSystemData extends Omit<ABCSystemSource, "description">, ItemSystemData {}
type ABCFeatureEntrySchema = {
    uuid: fields.DocumentUUIDField<ItemUUID, true, false>;
    img: fields.FilePathField<ImageFilePath, ImageFilePath, true, false>;
    name: fields.StringField<string, string, true, false>;
    level: fields.NumberField<number, number, true, false>;
};
declare class ABCFeatureEntryField extends fields.SchemaField<ABCFeatureEntrySchema> {
    constructor();
}
export { ABCFeatureEntryField };
export type { ABCFeatureEntryData, ABCSystemData, ABCSystemSource };
