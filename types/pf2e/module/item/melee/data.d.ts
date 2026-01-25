import { ModelPropsFromSchema, SourceFromSchema } from "#common/data/fields.mjs";
import { DamageCategoryUnique, DamageType } from "./../../system/damage/types.ts";
import { RecordField, SlugField } from "./../../system/schema-data-fields.ts";
import { ItemSystemModel, ItemSystemSchema } from "./../base/data/model.ts";
import { BaseItemSourcePF2e, ItemFlagsPF2e, ItemSystemSource, ItemTraitsNoRarity } from "./../base/data/system.ts";
import { MeleePF2e } from "./../index.ts";
import { EffectAreaShape } from "./../types.ts";
import { WeaponMaterialData } from "./../weapon/data.ts";
import { WeaponPropertyRuneType } from "./../weapon/types.ts";
import { NPCAttackActionType, NPCAttackTrait } from "./types.ts";
import fields = foundry.data.fields;
type MeleeSource = BaseItemSourcePF2e<"melee", MeleeSystemSource> & {
    flags: DeepPartial<MeleeFlags>;
};
type MeleeFlags = ItemFlagsPF2e & {
    [SYSTEM_ID]: {
        linkedWeapon?: string;
    };
};
declare class MeleeSystemData extends ItemSystemModel<MeleePF2e, NPCAttackSystemSchema> {
    static LOCALIZATION_PREFIXES: string[];
    material: WeaponMaterialData;
    /** Weapon property runes (or rather the effects thereof) added via rule element */
    runes: {
        property: WeaponPropertyRuneType[];
    };
    static defineSchema(): NPCAttackSystemSchema;
    prepareBaseData(): void;
    static migrateData(source: Record<string, unknown>): Record<string, unknown>;
}
interface MeleeSystemData
    extends
        ItemSystemModel<MeleePF2e, NPCAttackSystemSchema>,
        Omit<fields.ModelPropsFromSchema<NPCAttackSystemSchema>, "description"> {
    traits: NPCAttackTraits;
}
type NPCAttackSystemSchema = Omit<ItemSystemSchema, "traits"> & {
    traits: fields.SchemaField<{
        otherTags: fields.ArrayField<SlugField<true, false, false>, string[], string[], true, false, true>;
        value: fields.ArrayField<
            fields.StringField<NPCAttackTrait, NPCAttackTrait, true, false, false>,
            NPCAttackTrait[],
            NPCAttackTrait[],
            true,
            false,
            true
        >;
    }>;
    action: fields.StringField<NPCAttackActionType, NPCAttackActionType, true, false, true>;
    area: fields.SchemaField<
        EffectAreaSchema,
        SourceFromSchema<EffectAreaSchema>,
        ModelPropsFromSchema<EffectAreaSchema>,
        true,
        true,
        true
    >;
    damageRolls: RecordField<
        fields.StringField<string, string, true, false, false>,
        fields.SchemaField<{
            damage: fields.StringField<string, string, true, false, false>;
            damageType: fields.StringField<DamageType, DamageType, true, false, true>;
            category: fields.StringField<DamageCategoryUnique, DamageCategoryUnique, true, true, true>;
        }>,
        true,
        false,
        true,
        true
    >;
    /** The base attack modifier for this attack  */
    bonus: fields.SchemaField<{
        value: fields.NumberField<number, number, true, false, true>;
    }>;
    attackEffects: fields.SchemaField<{
        value: fields.ArrayField<fields.StringField<string, string, true, false, false>>;
    }>;
    range: fields.SchemaField<
        {
            increment: fields.NumberField<number, number, true, true, true>;
            max: fields.NumberField<number, number, true, true, true>;
        },
        {
            increment: number | null;
            max: number | null;
        },
        {
            increment: number | null;
            max: number | null;
        },
        true,
        true,
        true
    >;
};
type EffectAreaSchema = {
    type: fields.StringField<EffectAreaShape, EffectAreaShape, true, false, true>;
    value: fields.NumberField<number, number, true, false, true>;
};
type MeleeSystemSource = fields.SourceFromSchema<NPCAttackSystemSchema> & {
    level?: never;
    schema?: ItemSystemSource["schema"];
};
type NPCAttackDamage = fields.SourceFromSchema<NPCAttackSystemSchema>["damageRolls"]["string"];
type NPCAttackTraits = ItemTraitsNoRarity<NPCAttackTrait>;
export { MeleeSystemData };
export type { MeleeFlags, MeleeSource, MeleeSystemSource, NPCAttackDamage, NPCAttackTraits };
