import { BaseActorSourcePF2e, FlankingData } from "./../data/base.ts";
import { ActorSystemModel, ActorSystemSchema } from "./../data/model.ts";
import { LootPF2e } from "./document.ts";
import fields = foundry.data.fields;
/** The stored source data of a loot actor */
type LootSource = BaseActorSourcePF2e<"loot", LootSystemSource>;
declare class LootSystemData extends ActorSystemModel<LootPF2e, LootSystemSchema> {
    static defineSchema(): LootSystemSchema;
}
interface LootSystemData extends ActorSystemModel<LootPF2e, LootSystemSchema>, fields.ModelPropsFromSchema<LootSystemSchema> {
    details: LootDetails;
    traits?: never;
    attributes: LootAttributes;
}
type LootSystemSchema = ActorSystemSchema & {
    details: fields.SchemaField<{
        description: fields.HTMLField;
        level: fields.SchemaField<{
            value: fields.NumberField<number, number, true, false, true>;
        }>;
    }>;
    lootSheetType: fields.StringField<"Merchant" | "Loot", "Merchant" | "Loot", true, false, true>;
    hiddenWhenEmpty: fields.BooleanField;
};
/** The system-level data of loot actors. */
interface LootSystemSource extends fields.SourceFromSchema<LootSystemSchema> {
    attributes?: never;
    traits?: never;
    schema?: never;
}
interface LootDetails extends fields.ModelPropFromDataField<LootSystemSchema["details"]> {
    alliance: null;
}
interface LootAttributes {
    immunities: never[];
    weaknesses: never[];
    resistances: never[];
    flanking: FlankingData;
}
export { LootSystemData };
export type { LootSource, LootSystemSchema, LootSystemSource };
