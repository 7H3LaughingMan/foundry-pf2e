import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import type { StrikeData } from "types/pf2e/module/actor/data/base.ts";
import type { ItemPF2e } from "types/pf2e/module/item/index.ts";
import type { Statistic } from "types/pf2e/module/system/statistic/statistic.ts";
import { RollContext } from "./base.ts";
import type { DamageContextConstructorParams } from "./types.ts";
declare class DamageContext<TSelf extends ActorPF2e, TStatistic extends Statistic | StrikeData, TItem extends ItemPF2e<ActorPF2e> | null> extends RollContext<TSelf, TStatistic, TItem> {
    #private;
    constructor(params: DamageContextConstructorParams<TSelf, TStatistic, TItem>);
}
export { DamageContext };
