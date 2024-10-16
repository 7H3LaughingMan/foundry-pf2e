import type { HazardPF2e } from "types/pf2e/module/actor/index.ts";
import { TraitViewData } from "types/pf2e/module/actor/data/base.ts";
import { ActorSheetDataPF2e } from "types/pf2e/module/actor/sheet/data-types.ts";
import { SaveType } from "types/pf2e/module/actor/types.ts";
import type { AbilityItemPF2e } from "types/pf2e/module/item/index.ts";
interface HazardSheetData extends ActorSheetDataPF2e<HazardPF2e> {
    actions: HazardActionSheetData;
    complexityOptions: FormSelectOption[];
    emitsSoundOptions: FormSelectOption[];
    editing: boolean;
    actorTraits: TraitViewData[];
    rarity: Record<string, string>;
    rarityLabel: string;
    brokenThreshold: number;
    saves: HazardSaveSheetData[];
    hasDefenses: boolean;
    hasHPDetails: boolean;
    hasSaves: boolean;
    hasIWR: boolean;
    hasStealth: boolean;
    hasDescription: boolean;
    hasDisable: boolean;
    hasRoutineDetails: boolean;
    hasResetDetails: boolean;
}
interface HazardActionSheetData {
    reaction: AbilityItemPF2e[];
    action: AbilityItemPF2e[];
}
interface HazardSaveSheetData {
    label: string;
    type: SaveType;
    mod?: number;
}
type HazardTrait = keyof ConfigPF2e["PF2E"]["hazardTraits"];
export type { HazardActionSheetData, HazardSaveSheetData, HazardSheetData, HazardTrait };
