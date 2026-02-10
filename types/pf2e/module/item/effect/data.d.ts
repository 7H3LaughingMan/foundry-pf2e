import { ModelPropsFromSchema, SourceFromSchema } from "#common/data/fields.mjs";
import {
    DurationDataSchema,
    EffectAuraData,
    EffectBadgeCounterSchema,
    EffectBadgeFormulaSchema,
    EffectBadgeValueSchema,
    EffectContextField,
} from "./../abstract-effect/data.ts";
import { AbstractEffectSchema, EffectBadge } from "./../abstract-effect/index.ts";
import { ItemSystemModel } from "./../base/data/model.ts";
import { BaseItemSourcePF2e, ItemFlagsPF2e, ItemSourceFlagsPF2e, ItemSystemSource } from "./../base/data/system.ts";
import { EffectPF2e } from "./document.ts";
import fields = foundry.data.fields;
type EffectSource = BaseItemSourcePF2e<"effect", EffectSystemSource> & {
    flags: ItemSourceFlagsPF2e & {
        [SYSTEM_ID]?: {
            aura?: EffectAuraData;
        };
    };
};
declare class EffectSystemData extends ItemSystemModel<EffectPF2e, EffectSystemSchema> {
    static defineSchema(): EffectSystemSchema;
    prepareBaseData(): void;
}
interface EffectSystemData extends ItemSystemModel<EffectPF2e, EffectSystemSchema>, Omit<ModelPropsFromSchema<EffectSystemSchema>, "description" | "badge"> {
    expired: boolean;
    badge: EffectBadge | null;
    _source: EffectSystemSource;
}
declare class EffectBadgeField extends fields.TypedSchemaField<
    {
        counter: fields.SchemaField<EffectBadgeCounterSchema>;
        value: fields.SchemaField<EffectBadgeValueSchema>;
        formula: fields.SchemaField<EffectBadgeFormulaSchema>;
    },
    true,
    true,
    true
> {
    constructor();
}
type EffectSystemSchema = AbstractEffectSchema & {
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    duration: fields.SchemaField<
        DurationDataSchema & {
            sustained: fields.BooleanField<boolean, boolean, true, false, true>;
        }
    >;
    tokenIcon: fields.SchemaField<{
        show: fields.BooleanField<boolean, boolean, true, false, true>;
    }>;
    unidentified: fields.BooleanField<boolean, boolean, true, false, true>;
    /** When this data was applied during initiative */
    start: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        initiative: fields.NumberField<number, number, true, true, true>;
    }>;
    /** A numeric value or dice expression of some rules significance to the effect */
    badge: EffectBadgeField;
    /** Origin, target, and roll context of the action that spawned this effect */
    context: EffectContextField;
};
type EffectFlags = ItemFlagsPF2e & {
    [SYSTEM_ID]: {
        aura?: EffectAuraData;
    };
};
type EffectSystemSource = SourceFromSchema<EffectSystemSchema> & {
    schema?: ItemSystemSource["schema"];
};
export { EffectSystemData };
export type { EffectFlags, EffectSource };
