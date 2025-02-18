import { ItemPF2e } from "../../../item/index.ts";
import { ItemSourcePF2e, ItemType } from "../../../item/base/data/index.ts";
import { ItemTrait } from "../../../item/base/types.ts";
import { DamageType } from "../../../system/damage/types.ts";
import { PredicateField, SlugField, StrictNumberField } from "../../../system/schema-data-fields.ts";
import { ArrayField, BooleanField, DataField, DataFieldOptions, NumberField, SchemaField, StringField } from "../../../../../foundry/common/data/fields.ts";
import { DataModelValidationFailure } from "../../../../../foundry/common/data/validation-failure.ts";
import { AELikeChangeMode } from "../ae-like.ts";

declare const fields: typeof foundry.data.fields;
/** A `SchemaField` reappropriated for validation of specific item alterations */
declare class ItemAlterationValidator<TSchema extends AlterationSchema> extends fields.SchemaField<TSchema> {
    #private;
    operableOnInstances: boolean;
    operableOnSource: boolean;
    constructor(fields: TSchema, options?: AlterationFieldOptions<SourceFromSchema<TSchema>>);
    /**
     * A type-safe affirmation of full validity of an alteration _and_ its applicable to a particular item
     * Errors will bubble all the way up to the originating parent rule element
     */
    isValid(data: {
        item: ItemPF2e | ItemSourcePF2e;
        alteration: MaybeAlterationData;
    }): data is {
        item: ItemOrSource<SourceFromSchema<TSchema>["itemType"]>;
        alteration: SourceFromSchema<TSchema>;
    };
}
type ItemOrSource<TItemType extends ItemType> = InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][TItemType]> | InstanceType<ConfigPF2e["PF2E"]["Item"]["documentClasses"][TItemType]>["_source"];
type MaybeAlterationData = {
    mode: string;
    itemType: string;
    value: unknown;
};
declare const ITEM_ALTERATION_VALIDATORS: {
    "ac-bonus": ItemAlterationValidator<{
        itemType: StringField<"armor" | "shield", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "area-size": ItemAlterationValidator<{
        itemType: StringField<"spell", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "badge-max": ItemAlterationValidator<{
        itemType: StringField<"effect", ItemType, true, false, false>;
        mode: StringField<"override" | "downgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "badge-value": ItemAlterationValidator<{
        itemType: StringField<"condition" | "effect", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    bulk: ItemAlterationValidator<{
        itemType: StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StrictNumberField<number, number, true, false, false>;
    }>;
    category: ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StringField<"medium" | "light" | "heavy", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "check-penalty": ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "damage-dice-faces": ItemAlterationValidator<{
        itemType: StringField<"weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StrictNumberField<6 | 4 | 8 | 10 | 12, 6 | 4 | 8 | 10 | 12, true, true, true>;
    }>;
    "damage-type": ItemAlterationValidator<{
        itemType: StringField<"weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StringField<"acid" | "bleed" | "bludgeoning" | "cold" | "electricity" | "fire" | "force" | "mental" | "piercing" | "poison" | "slashing" | "sonic" | "spirit" | "vitality" | "void" | "untyped", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    /** The passive defense targeted by an attack spell */
    "defense-passive": ItemAlterationValidator<{
        itemType: StringField<"spell", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StringField<"ac" | "fortitude-dc" | "reflex-dc" | "will-dc", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    description: ItemAlterationValidator<{
        itemType: StringField<"background" | "armor" | "shield" | "consumable" | "class" | "ancestry" | "action" | "affliction" | "campaignFeature" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "add", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: ArrayField<DescriptionElementField, SourceFromSchema<{
            title: StringField<string, string, false, true, true>;
            text: StringField<string, string, true, false, false>;
            divider: BooleanField<boolean, boolean, false, false, true>;
            predicate: PredicateField<false>;
        }>[], ModelPropsFromSchema<{
            title: StringField<string, string, false, true, true>;
            text: StringField<string, string, true, false, false>;
            divider: BooleanField<boolean, boolean, false, false, true>;
            predicate: PredicateField<false>;
        }>[], true, false, false>;
    }>;
    "dex-cap": ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "focus-point-cost": ItemAlterationValidator<{
        itemType: StringField<"spell", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    hardness: ItemAlterationValidator<{
        itemType: StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "hp-max": ItemAlterationValidator<{
        itemType: StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "material-type": ItemAlterationValidator<{
        itemType: StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StringField<"abysium" | "adamantine" | "dawnsilver" | "djezet" | "duskwood" | "inubrix" | "noqual" | "orichalcum" | "siccatite" | "silver" | "cold-iron" | "dragonhide" | "dreamweb" | "grisantian-pelt" | "keep-stone" | "peachwood" | "sisterstone" | "sisterstone-dusk" | "sisterstone-scarlet" | "sloughstone" | "sovereign-steel" | "warpglass", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "pd-recovery-dc": ItemAlterationValidator<{
        itemType: StringField<"condition", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "persistent-damage": ItemAlterationValidator<{
        itemType: StringField<"condition", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: SchemaField<PersistentDamageValueSchema, SourceFromSchema<PersistentDamageValueSchema>, ModelPropsFromSchema<PersistentDamageValueSchema>, true, false, true>;
    }>;
    rarity: ItemAlterationValidator<{
        itemType: StringField<"armor" | "shield" | "consumable" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"override", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StringField<"common" | "uncommon" | "rare" | "unique", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "frequency-max": ItemAlterationValidator<{
        itemType: StringField<"action" | "feat", ItemType, true, false, false>;
        mode: StringField<"override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "frequency-per": ItemAlterationValidator<{
        itemType: StringField<"action" | "feat", ItemType, true, false, false>;
        mode: StringField<"override" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StringField<string, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "other-tags": ItemAlterationValidator<{
        itemType: StringField<"background" | "armor" | "shield" | "consumable" | "class" | "ancestry" | "action" | "affliction" | "campaignFeature" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"add" | "subtract" | "remove", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: SlugField<true, false, boolean>;
    }>;
    "speed-penalty": ItemAlterationValidator<{
        itemType: StringField<"armor" | "shield", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    strength: ItemAlterationValidator<{
        itemType: StringField<"armor", ItemType, true, false, false>;
        mode: StringField<"override" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    traits: ItemAlterationValidator<{
        itemType: StringField<"background" | "armor" | "shield" | "consumable" | "class" | "ancestry" | "action" | "affliction" | "campaignFeature" | "condition" | "effect" | "feat" | "heritage" | "kit" | "melee" | "spell" | "backpack" | "book" | "equipment" | "treasure" | "weapon", ItemType, true, false, false>;
        mode: StringField<"add" | "subtract" | "remove", "override" | "multiply" | "add" | "subtract" | "remove" | "downgrade" | "upgrade", true, false, false>;
        value: StringField<ItemTrait, ItemTrait, true, false, false>;
    }>;
};
interface AlterationFieldOptions<TSourceProp extends SourceFromSchema<AlterationSchema>> extends DataFieldOptions<TSourceProp, true, false, false> {
    validateForItem?: (item: ItemPF2e | ItemSourcePF2e, alteration: MaybeAlterationData) => DataModelValidationFailure | void;
    /** Whether this alteration can be used with an `ItemPF2e` instance */
    operableOnInstances?: boolean;
    /** Whether this alteration can be used with item source data */
    operableOnSource?: boolean;
}
type AlterationSchema = {
    itemType: StringField<ItemType, ItemType, true, false, false>;
    mode: StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    value: DataField<Exclude<JSONValue, undefined>, Exclude<JSONValue, undefined>, true, boolean, boolean>;
};
type PersistentDamageValueSchema = {
    formula: StringField<string, string, true, false, false>;
    damageType: StringField<DamageType, DamageType, true, false, false>;
    dc: NumberField<number, number, true, false, true>;
};
type DescriptionElementField = SchemaField<{
    title: StringField<string, string, false, true, true>;
    text: StringField<string, string, true, false, false>;
    divider: BooleanField<boolean, boolean, false, false, true>;
    predicate: PredicateField<false>;
}>;
export { ITEM_ALTERATION_VALIDATORS };
