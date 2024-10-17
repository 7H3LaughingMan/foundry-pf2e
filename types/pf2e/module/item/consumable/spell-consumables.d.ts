import { ConsumablePF2e, SpellPF2e } from '../index.ts';
import { ConsumableSource } from '../base/data/index.ts';
import { DCOptions } from '../../dc.ts';
declare const SPELL_CONSUMABLE_ITEM_TYPE: Set<"scroll" | "wand" | "cantripDeck5">;
type SpellConsumableItemType = SetElement<typeof SPELL_CONSUMABLE_ITEM_TYPE>;
declare function isSpellConsumable(itemId: string): boolean;
declare function createConsumableFromSpell(spell: SpellPF2e, { type, heightenedLevel, mystified, }: {
    type: SpellConsumableItemType;
    heightenedLevel?: number;
    mystified?: boolean;
}): Promise<ConsumableSource>;
interface TrickMagicItemDifficultyData {
    arcana?: number;
    religion?: number;
    occultism?: number;
    nature?: number;
}
declare function calculateTrickMagicItemCheckDC(item: ConsumablePF2e, options?: DCOptions): TrickMagicItemDifficultyData;
export { calculateTrickMagicItemCheckDC, createConsumableFromSpell, isSpellConsumable };
export type { SpellConsumableItemType, TrickMagicItemDifficultyData };
