import { PrunedSchemaField } from "./../../system/schema-data-fields.ts";
import { Price } from "./index.ts";
import fields = foundry.data.fields;
declare class PriceField extends fields.SchemaField<PriceSchema, fields.SourceFromSchema<PriceSchema>, Price> {
    constructor();
    initialize(source: fields.SourceFromSchema<PriceSchema>): Price;
}
type CoinsSchema = {
    cp: fields.NumberField<number, number, false, false, false>;
    sp: fields.NumberField<number, number, false, false, false>;
    gp: fields.NumberField<number, number, false, false, false>;
    pp: fields.NumberField<number, number, false, false, false>;
};
type PriceSchema = {
    value: PrunedSchemaField<CoinsSchema>;
    per: fields.NumberField<number, number, true, false, true>;
    sizeSensitive: fields.BooleanField<boolean, boolean, false, false, false>;
};
export { PriceField };
