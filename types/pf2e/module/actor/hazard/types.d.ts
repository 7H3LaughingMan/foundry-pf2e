import { ActorPF2e, HazardPF2e } from "./../index.ts";
import { TraitViewData } from "./../data/base.ts";
import { ActorSheetDataPF2e } from "./../sheet/data-types.ts";
import { SaveType } from "./../types.ts";
import { FormSelectOption } from "#client/applications/forms/fields.mjs";
import { AbilityItemPF2e, MeleePF2e } from "./../../item/index.ts";
import { NPCAttackTraitOrTag } from "./../../sheet/helpers.ts";
interface HazardSheetData extends ActorSheetDataPF2e<HazardPF2e> {
    attacks: HazardAttackSheedData[];
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
interface HazardAttackSheedData {
    label: string;
    description: string | null;
    damageFormula: string;
    breakdown: string;
    additionalEffects: {
        tag?: string;
        label?: string;
    }[];
    attackRollType: string;
    glyph: string;
    variants: {
        label: string;
    }[];
    item: MeleePF2e<ActorPF2e>;
    /** A list of traits or tags to show next to the strike. */
    traitsAndTags: NPCAttackTraitOrTag[];
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
export type { HazardActionSheetData, HazardAttackSheedData, HazardSaveSheetData, HazardSheetData, HazardTrait };
