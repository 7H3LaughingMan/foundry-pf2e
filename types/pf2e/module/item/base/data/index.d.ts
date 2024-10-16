import type { AbilitySource } from "types/pf2e/module/item/ability/data.ts";
import type { AfflictionSource } from "types/pf2e/module/item/affliction/data.ts";
import type { AncestrySource } from "types/pf2e/module/item/ancestry/data.ts";
import type { ArmorSource } from "types/pf2e/module/item/armor/data.ts";
import type { BackgroundSource } from "types/pf2e/module/item/background/data.ts";
import type { BookSource } from "types/pf2e/module/item/book/data.ts";
import type { CampaignFeatureSource } from "types/pf2e/module/item/campaign-feature/data.ts";
import type { ClassSource } from "types/pf2e/module/item/class/data.ts";
import type { ConditionSource } from "types/pf2e/module/item/condition/data.ts";
import type { ConsumableSource } from "types/pf2e/module/item/consumable/data.ts";
import type { ContainerSource } from "types/pf2e/module/item/container/data.ts";
import type { DeitySource } from "types/pf2e/module/item/deity/data.ts";
import type { EffectSource } from "types/pf2e/module/item/effect/data.ts";
import type { EquipmentSource } from "types/pf2e/module/item/equipment/data.ts";
import type { FeatSource } from "types/pf2e/module/item/feat/data.ts";
import type { HeritageSource } from "types/pf2e/module/item/heritage/data.ts";
import type { KitSource } from "types/pf2e/module/item/kit/data.ts";
import type { LoreSource } from "types/pf2e/module/item/lore.ts";
import type { MeleeSource } from "types/pf2e/module/item/melee/data.ts";
import type { PhysicalItemType } from "types/pf2e/module/item/physical/types.ts";
import type { ShieldSource } from "types/pf2e/module/item/shield/data.ts";
import type { SpellSource } from "types/pf2e/module/item/spell/data.ts";
import type { SpellcastingEntrySource } from "types/pf2e/module/item/spellcasting-entry/data.ts";
import type { TreasureSource } from "types/pf2e/module/item/treasure/data.ts";
import type { WeaponSource } from "types/pf2e/module/item/weapon/data.ts";
import type { PROFICIENCY_RANKS } from "types/pf2e/module/data.ts";
import { ItemDescriptionData } from "./system.ts";
type ProficiencyRank = (typeof PROFICIENCY_RANKS)[number];
type NonPhysicalItemType = "action" | "affliction" | "ancestry" | "background" | "campaignFeature" | "class" | "condition" | "deity" | "effect" | "feat" | "heritage" | "kit" | "lore" | "melee" | "spell" | "spellcastingEntry";
type ItemType = NonPhysicalItemType | PhysicalItemType;
type PhysicalItemSource = ArmorSource | BookSource | ConsumableSource | ContainerSource | EquipmentSource | ShieldSource | TreasureSource | WeaponSource;
type ItemSourcePF2e = PhysicalItemSource | AbilitySource | AfflictionSource | AncestrySource | BackgroundSource | CampaignFeatureSource | ClassSource | ConditionSource | DeitySource | EffectSource | FeatSource | HeritageSource | KitSource | LoreSource | MeleeSource | SpellSource | SpellcastingEntrySource;
type MagicItemSource = Exclude<PhysicalItemSource, ConsumableSource | TreasureSource>;
interface RawItemChatData {
    [key: string]: unknown;
    description: ItemDescriptionData;
    traits?: TraitChatData[];
    properties?: string[];
}
interface TraitChatData {
    value: string;
    label: string;
    description?: string;
    mystified?: boolean;
    excluded?: boolean;
}
export type { ActionCost, ActionType, Frequency, FrequencyInterval, FrequencySource, ItemFlagsPF2e, ItemSystemData, } from "./system.ts";
export type { AbilitySource, AncestrySource, ArmorSource, BackgroundSource, BookSource, ClassSource, ConditionSource, ConsumableSource, ContainerSource, DeitySource, EffectSource, EquipmentSource, FeatSource, ItemSourcePF2e, ItemType, KitSource, LoreSource, MagicItemSource, MeleeSource, NonPhysicalItemType, PhysicalItemSource, ProficiencyRank, RawItemChatData, ShieldSource, SpellSource, SpellcastingEntrySource, TraitChatData, TreasureSource, WeaponSource, };
