import { ActorPF2e } from "../index.ts";
import { StrikeData } from "../data/base.ts";
import { ItemPF2e } from "../../item/index.ts";
import { AbilityTrait } from "../../item/ability/types.ts";
import { Statistic } from "../../system/statistic/statistic.ts";
import { RollContextConstructorParams, UnresolvedOpposingActors, RollContextData } from "./types.ts";
/** Resolve a roll context by cloning a pair of actors and feeding them with mutual roll options. */
declare abstract class RollContext<TSelf extends ActorPF2e, TStatistic extends Statistic | StrikeData, TItem extends ItemPF2e<ActorPF2e> | null> {
    #private;
    /** Origin and target data provided directly by the caller */
    protected unresolved: Readonly<UnresolvedOpposingActors<TStatistic, TItem>>;
    domains: string[];
    /** Initial roll options for the context */
    rollOptions: Set<string>;
    traits: AbilityTrait[];
    /** Whether this is a one-sided roll context for generating sheet-display data */
    viewOnly: boolean;
    /** Whether this roll is associated with an attack action */
    isAttack: boolean;
    /** Whether this roll is associated with a melee attack */
    isMeleeAttack: boolean;
    constructor(params: RollContextConstructorParams<TSelf, TStatistic, TItem>);
    /** The item in use for this roll */
    get item(): TItem | null;
    get rollerRole(): "origin" | "target";
    get isFlankingAttack(): boolean;
    resolve(): Promise<RollContextData<TSelf, TStatistic, TItem>>;
}
export { RollContext };
