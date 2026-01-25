import { DataFieldOptions } from "#common/data/_types.mjs";
import { AELikeChangeMode } from "../ae-like.ts";
import { ResolvableValueField, RuleElement } from "../index.ts";
import { ItemSourcePF2e } from "./../../../item/base/data/index.ts";
import { PersistentDamageValueSchema } from "./../../../item/condition/data.ts";
import { ItemPF2e } from "./../../../item/index.ts";
import { ItemType } from "./../../../item/types.ts";
import {
    DataUnionField,
    PredicateField,
    SlugField,
    StrictNumberField,
    StrictStringField,
} from "./../../../system/schema-data-fields.ts";
import fields = foundry.data.fields;
import validation = foundry.data.validation;
/** A `SchemaField` reappropriated for validation of specific item alterations */
declare class ItemAlterationHandler<TSchema extends AlterationSchema> extends fields.SchemaField<TSchema> {
    #private;
    operableOnInstances: boolean;
    operableOnSource: boolean;
    /** A registered handler function for the item alteration. The validation should be performed inside */
    handle: (data: AlterationApplicationData) => void;
    constructor(
        options: AlterationFieldOptions<TSchema> & {
            fields: TSchema;
        },
    );
    /**
     * A type-safe affirmation of full validity of an alteration _and_ its applicable to a particular item
     * Errors will bubble all the way up to the originating parent rule element
     */
    isValid(data: {
        item: ItemPF2e | ItemSourcePF2e;
        rule: RuleElement;
        fromEquipment: boolean;
        alteration: MaybeAlterationData;
    }): data is {
        item: ItemOrSource<fields.SourceFromSchema<TSchema>["itemType"]>;
        rule: RuleElement;
        fromEquipment: boolean;
        alteration: fields.SourceFromSchema<TSchema>;
    };
}
type ItemOrSource<TItemType extends ItemType> =
    | InstanceType<(typeof CONFIG.PF2E.Item.documentClasses)[TItemType]>
    | InstanceType<(typeof CONFIG.PF2E.Item.documentClasses)[TItemType]>["_source"];
type MaybeAlterationData = {
    mode: string;
    itemType: string;
    value: unknown;
};
interface AlterationApplicationData {
    item: ItemPF2e | ItemSourcePF2e;
    rule: RuleElement;
    fromEquipment: boolean;
    alteration: MaybeAlterationData;
}
declare const ITEM_ALTERATION_HANDLERS: {
    "ac-bonus": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "area-size": ItemAlterationHandler<{
        itemType: fields.StringField<
            "spell",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "badge-max": ItemAlterationHandler<{
        itemType: fields.StringField<
            "effect",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "badge-value": ItemAlterationHandler<{
        itemType: fields.StringField<
            "condition" | "effect",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    bulk: ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield" | "consumable" | "ammo" | "backpack" | "book" | "equipment" | "treasure" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: StrictNumberField<number, number, true, false, false>;
    }>;
    category: ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<"light" | "medium" | "heavy", NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "check-penalty": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "damage-dice-faces": ItemAlterationHandler<{
        itemType: fields.StringField<
            "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: StrictNumberField<4 | 6 | 8 | 10 | 12, 4 | 6 | 8 | 10 | 12, true, true, true>;
    }>;
    "damage-dice-number": ItemAlterationHandler<{
        itemType: fields.StringField<
            "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "damage-type": ItemAlterationHandler<{
        itemType: fields.StringField<
            "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<
            | "force"
            | "acid"
            | "bleed"
            | "bludgeoning"
            | "cold"
            | "electricity"
            | "fire"
            | "mental"
            | "piercing"
            | "poison"
            | "slashing"
            | "sonic"
            | "spirit"
            | "vitality"
            | "void"
            | "untyped",
            NonNullable<JSONValue>,
            true,
            false,
            boolean
        >;
    }>;
    /** The passive defense targeted by an attack spell */
    "defense-passive": ItemAlterationHandler<{
        itemType: fields.StringField<
            "spell",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<
            "ac" | "fortitude-dc" | "reflex-dc" | "will-dc",
            NonNullable<JSONValue>,
            true,
            false,
            boolean
        >;
    }>;
    description: ItemAlterationHandler<{
        itemType: fields.StringField<
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override" | "add",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.ArrayField<
            DescriptionElementField,
            fields.SourceFromSchema<{
                title: fields.StringField<string, string, false, true, true>;
                text: fields.StringField<string, string, true, false, false>;
                divider: fields.BooleanField<boolean, boolean, false, false, true>;
                predicate: PredicateField<false>;
            }>[],
            fields.ModelPropsFromSchema<{
                title: fields.StringField<string, string, false, true, true>;
                text: fields.StringField<string, string, true, false, false>;
                divider: fields.BooleanField<boolean, boolean, false, false, true>;
                predicate: PredicateField<false>;
            }>[],
            true,
            false,
            false
        >;
    }>;
    "dex-cap": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "focus-point-cost": ItemAlterationHandler<{
        itemType: fields.StringField<
            "spell",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override" | "add",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    grade: ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<
            "advanced" | "commercial" | "tactical" | "superior" | "elite" | "ultimate" | "paragon",
            "advanced" | "commercial" | "tactical" | "superior" | "elite" | "ultimate" | "paragon",
            true,
            false,
            boolean
        >;
    }>;
    group: ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<string, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    hardness: ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield" | "consumable" | "ammo" | "backpack" | "book" | "equipment" | "treasure" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "hp-max": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield" | "consumable" | "ammo" | "backpack" | "book" | "equipment" | "treasure" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "material-type": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield" | "consumable" | "ammo" | "backpack" | "book" | "equipment" | "treasure" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<
            | "abysium"
            | "adamantine"
            | "dawnsilver"
            | "djezet"
            | "duskwood"
            | "inubrix"
            | "noqual"
            | "orichalcum"
            | "peachwood"
            | "siccatite"
            | "silver"
            | "cold-iron"
            | "dragonhide"
            | "dreamweb"
            | "grisantian-pelt"
            | "keep-stone"
            | "sisterstone"
            | "sisterstone-dusk"
            | "sisterstone-scarlet"
            | "sloughstone"
            | "sovereign-steel"
            | "warpglass",
            NonNullable<JSONValue>,
            true,
            false,
            boolean
        >;
    }>;
    "pd-recovery-dc": ItemAlterationHandler<{
        itemType: fields.StringField<
            "condition",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "persistent-damage": ItemAlterationHandler<{
        itemType: fields.StringField<
            "condition",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.SchemaField<
            PersistentDamageValueSchema,
            fields.SourceFromSchema<PersistentDamageValueSchema>,
            fields.ModelPropsFromSchema<PersistentDamageValueSchema>,
            true,
            false,
            true
        >;
    }>;
    rarity: ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield" | "consumable" | "ammo" | "backpack" | "book" | "equipment" | "treasure" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<
            "common" | "uncommon" | "rare" | "unique",
            NonNullable<JSONValue>,
            true,
            false,
            boolean
        >;
    }>;
    "range-increment": ItemAlterationHandler<{
        itemType: fields.StringField<
            "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "override" | "multiply" | "add" | "subtract",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "range-max": ItemAlterationHandler<{
        itemType: fields.StringField<
            "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "override" | "multiply" | "add" | "subtract",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "frequency-max": ItemAlterationHandler<{
        itemType: fields.StringField<
            "action" | "feat",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "frequency-per": ItemAlterationHandler<{
        itemType: fields.StringField<
            "action" | "feat",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<string, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "other-tags": ItemAlterationHandler<{
        itemType: fields.StringField<
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "add" | "subtract",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: SlugField<true, false, boolean>;
    }>;
    name: ItemAlterationHandler<{
        itemType: fields.StringField<
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.StringField<string, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "runes-potency": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "runes-resilient": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "runes-striking": ItemAlterationHandler<{
        itemType: fields.StringField<
            "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "upgrade" | "override",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: fields.NumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    "speed-penalty": ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor" | "shield",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    strength: ItemAlterationHandler<{
        itemType: fields.StringField<
            "armor",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "upgrade" | "override" | "add" | "subtract" | "downgrade",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: StrictNumberField<number, NonNullable<JSONValue>, true, false, boolean>;
    }>;
    traits: ItemAlterationHandler<{
        itemType: fields.StringField<
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "melee"
            | "spell"
            | "treasure"
            | "weapon",
            | "action"
            | "background"
            | "armor"
            | "shield"
            | "consumable"
            | "class"
            | "ancestry"
            | "deity"
            | "feat"
            | "heritage"
            | "affliction"
            | "ammo"
            | "backpack"
            | "book"
            | "campaignFeature"
            | "condition"
            | "effect"
            | "equipment"
            | "kit"
            | "lore"
            | "melee"
            | "spell"
            | "spellcastingEntry"
            | "treasure"
            | "weapon",
            true,
            false,
            false
        >;
        mode: fields.StringField<
            "remove" | "add" | "subtract",
            "remove" | "upgrade" | "override" | "multiply" | "add" | "subtract" | "downgrade",
            true,
            false,
            false
        >;
        value: DataUnionField<TraitsValueField, true, false, boolean>;
    }>;
};
interface AlterationFieldOptions<
    TSchema extends AlterationSchema,
    TSourceProp extends fields.SourceFromSchema<TSchema> = fields.SourceFromSchema<TSchema>,
> extends DataFieldOptions<TSourceProp, true, false, false> {
    validateForItem?: (
        item: ItemPF2e | ItemSourcePF2e,
        alteration: MaybeAlterationData,
    ) => validation.DataModelValidationFailure | void;
    /** Whether this alteration can be used with an `ItemPF2e` instance */
    operableOnInstances?: boolean;
    /** Whether this alteration can be used with item source data */
    operableOnSource?: boolean;
    handle: (this: ItemAlterationHandler<TSchema>, data: AlterationApplicationData) => void;
}
type AlterationSchema = {
    itemType: fields.StringField<ItemType, ItemType, true, false, false>;
    mode: fields.StringField<AELikeChangeMode, AELikeChangeMode, true, false, false>;
    value: fields.DataField<Exclude<JSONValue, undefined>, Exclude<JSONValue, undefined>, true, boolean, boolean>;
};
type DescriptionElementField = fields.SchemaField<{
    title: fields.StringField<string, string, false, true, true>;
    text: fields.StringField<string, string, true, false, false>;
    divider: fields.BooleanField<boolean, boolean, false, false, true>;
    predicate: PredicateField<false>;
}>;
type TraitsValueField = TraitsValueConfigField | StrictStringField<string, string, true, false>;
type TraitsValueConfigField = fields.SchemaField<{
    trait: fields.StringField<string, string, true, false>;
    annotation: ResolvableValueField<true, false>;
}>;
export { ITEM_ALTERATION_HANDLERS, ItemAlterationHandler };
export type { AlterationApplicationData, AlterationFieldOptions, AlterationSchema };
