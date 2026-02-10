import { ItemUUID } from "#client/documents/_module.mjs";
import { ImageFilePath } from "#common/constants.mjs";
import { OneToThree } from "./../../data.ts";
import { SlugField } from "./../../system/schema-data-fields.ts";
import { ItemSystemModel, ItemSystemSchema } from "./../base/data/model.ts";
import { ActionType, BaseItemSourcePF2e, Frequency, FrequencyInterval, FrequencySource, ItemSystemSource } from "./../base/data/system.ts";
import { AbilityItemPF2e } from "./document.ts";
import { AbilityTraitToggles } from "./trait-toggles.ts";
import { AbilityTrait, ActionCategory } from "./types.ts";
import fields = foundry.data.fields;
type AbilitySource = BaseItemSourcePF2e<"action", AbilitySystemSource>;
declare class FrequencyField extends fields.SchemaField<FrequencySchema, FrequencySource, Frequency, false, true, false> {
    constructor();
}
declare class AbilitySystemData extends ItemSystemModel<AbilityItemPF2e, AbilitySystemSchema> {
    static LOCALIZATION_PREFIXES: string[];
    traits: AbilityTraits;
    frequency: Frequency | null;
    selfEffect: SelfEffectReference | null;
    deathNote: boolean;
    static defineSchema(): AbilitySystemSchema;
    prepareBaseData(): void;
    prepareDerivedData(): void;
}
interface AbilitySystemData
    extends ItemSystemModel<AbilityItemPF2e, AbilitySystemSchema>, Omit<fields.ModelPropsFromSchema<AbilitySystemSchema>, "description"> {}
type AbilitySystemSchema = Omit<ItemSystemSchema, "traits"> & {
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>>;
        value: fields.ArrayField<fields.StringField<AbilityTrait, AbilityTrait, true, false, false>>;
        toggles: fields.EmbeddedDataField<AbilityTraitToggles, false, false, false>;
    }>;
    actionType: fields.SchemaField<{
        value: fields.StringField<ActionType, ActionType, true, false, true>;
    }>;
    actions: fields.SchemaField<{
        value: fields.NumberField<OneToThree, OneToThree, true, true, true>;
    }>;
    category: fields.StringField<ActionCategory, ActionCategory, true, true, true>;
    deathNote: fields.BooleanField<boolean, boolean, false, false, false>;
    frequency: fields.SchemaField<
        FrequencySchema,
        {
            value: number | undefined;
            max: number;
            per: FrequencyInterval;
        },
        {
            value: number | undefined;
            max: number;
            per: FrequencyInterval;
        },
        false,
        true,
        false
    >;
    /** A self-applied effect for simple actions */
    selfEffect: fields.SchemaField<
        {
            uuid: fields.DocumentUUIDField<ItemUUID, true, false, false>;
            name: fields.StringField<string, string, true, false, false>;
        },
        {
            uuid: ItemUUID;
            name: string;
        },
        {
            uuid: ItemUUID;
            name: string;
        },
        false,
        true,
        false
    >;
};
type FrequencySchema = {
    value: fields.NumberField<number, number, false, false, false>;
    max: fields.NumberField<number, number, true, false, true>;
    /** Gap between recharges as an ISO8601 duration, or "day" for daily prep. */
    per: fields.StringField<FrequencyInterval, FrequencyInterval, true, false, true>;
};
type AbilitySystemSource = fields.SourceFromSchema<AbilitySystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
};
type AbilityTraitsSource = AbilitySystemSource["traits"];
interface AbilityTraits extends AbilityTraitsSource {
    toggles: AbilityTraitToggles;
}
type SelfEffectReferenceSource = NonNullable<AbilitySystemSource["selfEffect"]>;
interface SelfEffectReference extends SelfEffectReferenceSource {
    img?: Maybe<ImageFilePath>;
}
export { AbilitySystemData, FrequencyField };
export type { AbilitySource, AbilitySystemSchema, AbilitySystemSource, SelfEffectReference, SelfEffectReferenceSource };
