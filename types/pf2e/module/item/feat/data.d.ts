import { ItemUUID } from "#client/documents/_module.mjs";
import { SourceFromDataField } from "#common/data/fields.mjs";
import { Language, SenseAcuity, SenseType } from "./../../actor/creature/types.ts";
import { AttributeString, SaveType } from "./../../actor/types.ts";
import { OneToFour, OneToThree } from "./../../data.ts";
import { RarityField } from "./../../model.ts";
import { RecordField, SlugField } from "./../../system/schema-data-fields.ts";
import { FrequencyField, SelfEffectReference } from "./../ability/index.ts";
import { AbilityTraitToggles } from "./../ability/trait-toggles.ts";
import { ArmorCategory } from "./../armor/types.ts";
import { ItemSystemModel, ItemSystemSchema } from "./../base/data/model.ts";
import { ActionType, BaseItemSourcePF2e, Frequency, ItemSystemSource, ItemTraits } from "./../base/data/system.ts";
import { ClassTrait } from "./../class/types.ts";
import { WeaponCategory } from "./../weapon/types.ts";
import { FeatPF2e } from "./document.ts";
import { FeatOrFeatureCategory, FeatTrait } from "./types.ts";
import fields = foundry.data.fields;
type FeatSource = BaseItemSourcePF2e<"feat", FeatSystemSource>;
declare class FeatSystemData extends ItemSystemModel<FeatPF2e, FeatSystemSchema> {
    traits: FeatTraits;
    maxTakable: number;
    frequency: Frequency | null;
    selfEffect: SelfEffectReference | null;
    subfeatures: FeatSubfeatures;
    static defineSchema(): FeatSystemSchema;
    prepareBaseData(): void;
    prepareDerivedData(): void;
}
interface FeatSystemData
    extends
        ItemSystemModel<FeatPF2e, FeatSystemSchema>,
        Omit<fields.ModelPropsFromSchema<FeatSystemSchema>, "description"> {}
type FeatSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    level: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
        taken: fields.NumberField<number, number, false, true, false>;
    }>;
    traits: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<FeatTrait, FeatTrait, true, false, false>>;
        rarity: RarityField;
        otherTags: fields.ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
        toggles: fields.EmbeddedDataField<AbilityTraitToggles, false, false, false>;
    }>;
    category: fields.StringField<FeatOrFeatureCategory, FeatOrFeatureCategory, true, false, true>;
    /** Whether this feat must be taken at character level 1 */
    onlyLevel1: fields.BooleanField<boolean, boolean, true, false, true>;
    /** The maximum number of times this feat can be taken by a character. A value of `null` indicates no limit */
    maxTakable: fields.NumberField<number, number, true, true, true>;
    actionType: fields.SchemaField<{
        value: fields.StringField<ActionType, ActionType, true, false, true>;
    }>;
    actions: fields.SchemaField<{
        value: fields.NumberField<OneToThree, OneToThree, true, true, true>;
    }>;
    prerequisites: fields.SchemaField<{
        value: fields.ArrayField<
            fields.SchemaField<{
                value: fields.StringField<string, string, true, false, false>;
            }>
        >;
    }>;
    location: fields.StringField<string, string, true, true, true>;
    frequency: FrequencyField;
    subfeatures: fields.SchemaField<{
        keyOptions: fields.ArrayField<
            fields.StringField<AttributeString, AttributeString, true, false, false>,
            AttributeString[],
            AttributeString[],
            false,
            false,
            false
        >;
        languages: fields.SchemaField<
            {
                slots: fields.NumberField<number, number, true, false, true>;
                /** Additional specific languages the character knows */
                granted: fields.ArrayField<fields.StringField<Language, Language, true, false, false>>;
            },
            {
                slots: number;
                granted: Language[];
            },
            {
                slots: number;
                granted: Language[];
            },
            false,
            false,
            false
        >;
        proficiencies: RecordField<
            fields.StringField<IncreasableProficiency, IncreasableProficiency, true, false, false>,
            fields.SchemaField<{
                rank: fields.NumberField<OneToFour, OneToFour, true, false, false>;
                attribute: fields.StringField<AttributeString, AttributeString, true, true, true>;
            }>
        >;
        senses: SensesField;
        suppressedFeatures: fields.ArrayField<fields.DocumentUUIDField<ItemUUID, true, false, false>>;
    }>;
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
type SensesField = RecordField<
    fields.StringField<SenseType, SenseType, true, false, false>,
    fields.SchemaField<{
        acuity: fields.StringField<SenseAcuity, SenseAcuity, false, false, false>;
        /** The radius of the sense in feet: `null` indicates no limit. */
        range: fields.NumberField<number, number, true, true, true>;
        /** "Special" clauses for darkvision */
        special: fields.SchemaField<
            {
                /** Only grant darkvision if the PC's ancestry grants low-light vision. */
                ancestry: fields.BooleanField;
                /**
                 * Grant darkvision if the PC has low-light vision from any prior source (ancestry, earlier feats, etc.). This
                 * option is mutually exclusive with `ancestry`.
                 */
                llv: fields.BooleanField;
                /** Grant darkvision if this feat is taken a second time. */
                second: fields.BooleanField;
            },
            {
                ancestry: boolean;
                llv: boolean;
                second: boolean;
            },
            {
                ancestry: boolean;
                llv: boolean;
                second: boolean;
            },
            false,
            false,
            false
        >;
    }>
>;
type SenseSubfeature = SourceFromDataField<FeatSystemSchema["subfeatures"]>["senses"];
type FeatSystemSource = fields.SourceFromSchema<FeatSystemSchema> & {
    schema?: ItemSystemSource["schema"];
};
interface FeatTraitsSource extends ItemTraits<FeatTrait> {
    toggles?: {
        mindshift?: {
            selected?: boolean;
        } | null;
    };
}
interface FeatTraits extends FeatTraitsSource {
    toggles: AbilityTraitToggles;
}
interface FeatSubfeatures {
    keyOptions: AttributeString[];
    languages: LanguagesSubfeature;
    proficiencies: {
        [K in IncreasableProficiency]?: {
            rank: OneToFour;
            attribute: AttributeString | null;
        };
    };
    senses: SenseSubfeature;
    suppressedFeatures: ItemUUID[];
}
interface LanguagesSubfeature {
    /** A number of open slots fillable with any language */
    slots: number;
    /** Additional specific languages the character knows */
    granted: Language[];
}
type IncreasableProficiency = ArmorCategory | ClassTrait | SaveType | WeaponCategory | "perception" | "spellcasting";
export { FeatSystemData };
export type { FeatSource, FeatSubfeatures, FeatSystemSource, FeatTraits };
