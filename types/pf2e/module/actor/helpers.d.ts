import { ActorPF2e } from "./index.ts";
import { HexColorString } from "#common/constants.mjs";
import { ItemPF2e, MeleePF2e, PhysicalItemPF2e, WeaponPF2e } from "./../item/index.ts";
import { AbilityTrait } from "./../item/ability/types.ts";
import { ActionCost } from "./../item/base/data/system.ts";
import { EffectAreaShape } from "./../item/types.ts";
import { ZeroToFour } from "./../data.ts";
import { Statistic } from "./../system/statistic/statistic.ts";
import { DamageRollFunction } from "./data/base.ts";
import { ActorSourcePF2e } from "./data/index.ts";
import { Modifier } from "./modifiers.ts";
import { NPCAttackAction, NPCStrike } from "./npc/data.ts";
import { ActorGroupUpdate, AuraEffectData } from "./types.ts";
/**
 * Reset and rerender a provided list of actors. Omit argument to reset all world and synthetic actors
 * @param actors A list of actors to refresh: if none are provided, all world and synthetic actors are retrieved
 * @param options Render options for actor sheets and tokens
 * @param options.sheets Render actor sheets
 * @param options.tokens Redraw tokens
 */
declare function resetActors(actors?: Iterable<ActorPF2e>, options?: ResetActorsRenderOptions): Promise<void>;
interface ResetActorsRenderOptions {
    sheets?: boolean;
    tokens?: boolean;
}
/** Get the user color most appropriate for a provided actor */
declare function userColorForActor(actor: ActorPF2e): HexColorString;
declare function migrateActorSource(source: PreCreate<ActorSourcePF2e>): Promise<ActorSourcePF2e>;
/** Review `removeOnExit` aura effects and remove any that no longer apply */
declare function checkAreaEffects(this: ActorPF2e): Promise<void>;
declare function auraAffectsActor(data: AuraEffectData, origin: ActorPF2e, actor: ActorPF2e): boolean;
/**  Set a roll option for HP remaining and percentage remaining */
declare function setHitPointsRollOptions(actor: ActorPF2e): void;
/** Find the lowest multiple attack penalty for an attack with a given item */
declare function calculateMAPs(
    item: ItemPF2e,
    {
        domains,
        options,
    }: {
        domains: string[];
        options: Set<string> | string[];
    },
): MultipleAttackPenaltyData;
interface MultipleAttackPenaltyData {
    slug: "multiple-attack-penalty";
    label: string;
    map1: number;
    map2: number;
}
/** Create roll options pertaining to the active encounter and the actor's participant */
declare function createEncounterRollOptions(actor: ActorPF2e): Record<string, boolean>;
/** Create roll options pertaining to the terrain the actor is currently in */
declare function createEnvironmentRollOptions(actor: ActorPF2e): Record<string, boolean>;
/** Whether flanking puts this actor off-guard */
declare function isOffGuardFromFlanking(target: ActorPF2e, origin: ActorPF2e): boolean;
declare function getStrikeAttackDomains(
    weapon: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>,
    proficiencyRank: ZeroToFour | null,
    baseRollOptions: string[] | Set<string>,
): string[];
declare function getAttackDamageDomains(
    weapon: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>,
    proficiencyRank: ZeroToFour | null,
    action?: "strike" | "auto-fire" | "area-fire",
): string[];
/** Create a strike or area/auto fire statistic from a melee item: for use by NPCs and Hazards */
declare function attackFromMeleeItem(item: MeleePF2e<ActorPF2e>): NPCAttackAction;
/**
 * Helper function that creates damage roll functions for character and npc attacks.
 * While it used for character area/auto fire, its not used for character strikes yet.
 *
 */
declare function createDamageRollFunctions(
    item: MeleePF2e<ActorPF2e> | WeaponPF2e<ActorPF2e>,
    {
        action,
        statistic,
        actionTraits,
        baseOptions,
        proficiencyRank,
    }: {
        action: "strike" | "area-fire" | "auto-fire";
        statistic: NPCStrike | Statistic;
        actionTraits: AbilityTrait[];
        baseOptions: Iterable<string>;
        proficiencyRank: ZeroToFour;
    },
): {
    damage: DamageRollFunction;
    critical: DamageRollFunction;
};
interface AreaAttackOptions {
    action: "area-fire" | "auto-fire";
    actor: ActorPF2e;
    item: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>;
    statistic: Statistic;
    identifier: string;
    actionCost: ActionCost;
    options: string[];
    area: {
        type: EffectAreaShape;
        value: number;
    };
}
/** Creates an area fire message with buttons to roll saves and damage */
declare function createAreaAttackMessage({
    action,
    actor,
    item,
    statistic,
    identifier,
    actionCost,
    options,
    area,
}: AreaAttackOptions): Promise<void>;
/** Get the range increment of a target for a given weapon */
declare function getRangeIncrement(attackItem: ItemPF2e<ActorPF2e>, distance: number | null): number | null;
/** Determine range penalty for a ranged attack roll */
declare function calculateRangePenalty(
    actor: ActorPF2e,
    increment: number | null,
    selectors: string[],
    rollOptions: Set<string>,
): Modifier | null;
/** Whether this actor is of a the "character" type, excluding those from the PF2E Companion Compendia module */
declare function isReallyPC(actor: ActorPF2e): boolean;
/** Recursive generator function to iterate over all items and their sub items */
declare function iterateAllItems<T extends ActorPF2e>(document: T | PhysicalItemPF2e<T>): Generator<ItemPF2e<T>>;
/**
 * Transfer a list of items between actors, stacking equivalent helpers. Temporary until a proper inventory method exists
 * @param source the source actor
 * @param dest the destination actor
 * @param [itemFilterFn] an optional filter function called for each inventory item
 */
declare function transferItemsBetweenActors(
    source: ActorPF2e,
    dest: ActorPF2e,
    itemFilterFn?: (item: PhysicalItemPF2e) => boolean,
): Promise<void>;
/** Creates an empty actor group update with optional additional data */
declare function createActorGroupUpdate(data?: Partial<ActorGroupUpdate>): ActorGroupUpdate;
/** Applies multiple batched updates to the actor, delaying rendering till the end */
declare function applyActorGroupUpdate(
    actor: ActorPF2e,
    data: Partial<ActorGroupUpdate>,
    {
        render,
        keepId,
    }?: {
        render?: boolean;
        keepId?: boolean;
    },
): Promise<void>;
export {
    applyActorGroupUpdate,
    attackFromMeleeItem,
    auraAffectsActor,
    calculateMAPs,
    calculateRangePenalty,
    checkAreaEffects,
    createActorGroupUpdate,
    createAreaAttackMessage,
    createDamageRollFunctions,
    createEncounterRollOptions,
    createEnvironmentRollOptions,
    getAttackDamageDomains,
    getRangeIncrement,
    getStrikeAttackDomains,
    isOffGuardFromFlanking,
    isReallyPC,
    iterateAllItems,
    migrateActorSource,
    resetActors,
    setHitPointsRollOptions,
    transferItemsBetweenActors,
    userColorForActor,
};
export type { MultipleAttackPenaltyData };
