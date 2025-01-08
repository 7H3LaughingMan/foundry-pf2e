import { ActorPF2e } from "../index.ts";
import { StrikeData } from "../data/base.ts";
import { ItemPF2e } from "../../item/index.ts";
import { Statistic } from "../../system/statistic/statistic.ts";
import { RollContext } from "./base.ts";
import { DamageContextConstructorParams } from "./types.ts";

declare class DamageContext<TSelf extends ActorPF2e, TStatistic extends Statistic | StrikeData, TItem extends ItemPF2e<ActorPF2e> | null> extends RollContext<TSelf, TStatistic, TItem> {
    #private;
    constructor(params: DamageContextConstructorParams<TSelf, TStatistic, TItem>);
}
export { DamageContext };
