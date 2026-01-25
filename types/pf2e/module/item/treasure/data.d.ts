import { ImageFilePath } from "#common/constants.mjs";
import { RarityField } from "./../../model.ts";
import { SlugField } from "./../../system/schema-data-fields.ts";
import { ItemSystemModel, ItemSystemSchema } from "./../base/data/model.ts";
import { ItemDescriptionData } from "./../base/data/system.ts";
import {
    BasePhysicalItemSource,
    BulkData,
    EquippedData,
    IdentificationData,
    IdentificationStatus,
    ItemCarryType,
    ItemMaterialData,
    PhysicalItemHitPoints,
    Price,
} from "./../physical/data.ts";
import { PriceField } from "./../physical/schema.ts";
import { PreciousMaterialGrade, PreciousMaterialType } from "./../physical/types.ts";
import { CarriedUsage } from "./../physical/usage.ts";
import { ItemSize } from "./../types.ts";
import { TreasurePF2e } from "./document.ts";
import { TreasureCategory } from "./types.ts";
import fields = foundry.data.fields;
declare class TreasureSystemData extends ItemSystemModel<TreasurePF2e, TreasureSystemSchema> {
    static LOCALIZATION_PREFIXES: string[];
    static defineSchema(): TreasureSystemSchema;
    static migrateData(source: Record<string, unknown>): Record<string, unknown>;
    get stackGroup(): "coins" | "gems" | "upb" | null;
    /** Treasure need only be on one's person. */
    usage: CarriedUsage;
    prepareBaseData(): void;
}
interface TreasureSystemData
    extends ItemSystemModel<TreasurePF2e, TreasureSystemSchema>, fields.ModelPropsFromSchema<TreasureSystemSchema> {
    bulk: BulkData;
    description: ItemDescriptionData;
    equipped: TreasureEquippedData;
    hp: PhysicalItemHitPoints;
    identification: IdentificationData;
    material: ItemMaterialData;
    price: Price;
    temporary: boolean;
    apex?: never;
    subitems?: never;
}
interface TreasureSystemSource extends fields.SourceFromSchema<TreasureSystemSchema> {
    equipped: {
        carryType: ItemCarryType;
        invested?: never;
    };
    apex?: never;
    schema?: never;
    subitems?: never;
    usage?: never;
}
type TreasureSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    baseItem: fields.StringField<string, string, true, true>;
    category: fields.StringField<TreasureCategory, TreasureCategory, true, true, true>;
    bulk: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    containerId: fields.StringField<string, string, true, true>;
    hardness: fields.NumberField<number, number, true, false, true>;
    hp: fields.SchemaField<{
        max: fields.NumberField<number, number, true, false, true>;
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    equipped: fields.SchemaField<{
        carryType: fields.StringField<ItemCarryType, ItemCarryType, true, false, true>;
    }>;
    identification: fields.SchemaField<{
        status: fields.StringField<IdentificationStatus, IdentificationStatus, true, false, true>;
        unidentified: fields.SchemaField<
            UnidentifiedSchema,
            fields.SourceFromSchema<UnidentifiedSchema>,
            fields.ModelPropsFromSchema<UnidentifiedSchema>,
            true,
            true,
            true
        >;
    }>;
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    material: fields.SchemaField<{
        type: fields.StringField<PreciousMaterialType, PreciousMaterialType, true, true>;
        grade: fields.StringField<PreciousMaterialGrade, PreciousMaterialGrade, true, true>;
    }>;
    price: PriceField;
    quantity: fields.NumberField<number, number, true, false, true>;
    size: fields.StringField<ItemSize, ItemSize, true, false, true>;
    temporary: fields.BooleanField<boolean, boolean, false, false, false>;
    traits: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<"precious", "precious", true, false, false>>;
        rarity: RarityField;
        otherTags: fields.ArrayField<SlugField<true, false, false>>;
    }>;
};
type UnidentifiedSchema = {
    name: fields.StringField<string, string, true, false, true>;
    img: fields.FilePathField<ImageFilePath, ImageFilePath, true, false, true>;
    data: fields.SchemaField<{
        description: fields.SchemaField<{
            value: fields.StringField<string, string, true, false, true>;
        }>;
    }>;
};
interface TreasureSource extends BasePhysicalItemSource<"treasure", TreasureSystemSource> {}
interface TreasureEquippedData extends EquippedData {
    invested?: never;
}
export { TreasureSystemData };
export type { TreasureSource, TreasureSystemSchema, TreasureSystemSource };
