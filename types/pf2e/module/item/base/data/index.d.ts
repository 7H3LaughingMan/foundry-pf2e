import { AbilitySource } from '../../ability/data.ts';
import { AfflictionSource } from '../../affliction/data.ts';
import { AncestrySource } from '../../ancestry/data.ts';
import { ArmorSource } from '../../armor/data.ts';
import { BackgroundSource } from '../../background/data.ts';
import { BookSource } from '../../book/data.ts';
import { CampaignFeatureSource } from '../../campaign-feature/data.ts';
import { ClassSource } from '../../class/data.ts';
import { ConditionSource } from '../../condition/data.ts';
import { ConsumableSource } from '../../consumable/data.ts';
import { ContainerSource } from '../../container/data.ts';
import { DeitySource } from '../../deity/data.ts';
import { EffectSource } from '../../effect/data.ts';
import { EquipmentSource } from '../../equipment/data.ts';
import { FeatSource } from '../../feat/data.ts';
import { HeritageSource } from '../../heritage/data.ts';
import { KitSource } from '../../kit/data.ts';
import { LoreSource } from '../../lore.ts';
import { MeleeSource } from '../../melee/data.ts';
import { PhysicalItemType } from '../../physical/types.ts';
import { ShieldSource } from '../../shield/data.ts';
import { SpellSource } from '../../spell/data.ts';
import { SpellcastingEntrySource } from '../../spellcasting-entry/data.ts';
import { TreasureSource } from '../../treasure/data.ts';
import { WeaponSource } from '../../weapon/data.ts';
import { PROFICIENCY_RANKS } from '../../../data.ts';
import { ItemDescriptionData } from './system.ts';
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
export type { ActionCost, ActionType, Frequency, FrequencyInterval, FrequencySource, ItemFlagsPF2e, ItemSystemData, } from './system.ts';
export type { AbilitySource, AncestrySource, ArmorSource, BackgroundSource, BookSource, ClassSource, ConditionSource, ConsumableSource, ContainerSource, DeitySource, EffectSource, EquipmentSource, FeatSource, ItemSourcePF2e, ItemType, KitSource, LoreSource, MagicItemSource, MeleeSource, NonPhysicalItemType, PhysicalItemSource, ProficiencyRank, RawItemChatData, ShieldSource, SpellSource, SpellcastingEntrySource, TraitChatData, TreasureSource, WeaponSource, };
