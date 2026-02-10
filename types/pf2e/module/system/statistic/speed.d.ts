import { ActorPF2e } from "./../../actor/index.ts";
import { MovementType } from "./../../actor/types.ts";
import { BaseStatistic } from "./base.ts";
import { BaseStatisticData, BaseStatisticTraceData } from "./data.ts";
declare class SpeedStatistic<TActor extends ActorPF2e, TType extends MovementType | "travel"> extends BaseStatistic<TActor> {
    #private;
    constructor(actor: TActor, options: SpeedStatisticData<TType>);
    /** The movement type for this statistic */
    type: TType;
    /** The actor's base speed for this movement type */
    base: number;
    source: string | null;
    rollOptions: Set<string>;
    /** The "total modifier" of this speed, even though it isn't a check or DC statistic */
    get value(): number;
    get breakdown(): string;
    /** Derive a travel speed from this statistic. */
    extend<TType extends MovementType | "travel">(options: ExtendParams<TType>): SpeedStatistic<TActor, TType>;
    getTraceData(): TType extends "land" ? LandSpeedStatisticTraceData : TType extends MovementType | "travel" ? SpeedStatisticTraceData<TType> : never;
}
interface SpeedStatisticData<TType extends MovementType | "travel"> extends Omit<Partial<BaseStatisticData>, "slug"> {
    type: TType;
    base?: number;
    /** A feature, ancestry, effect, etc. from which this speed originated */
    source?: string | null;
}
interface SpeedStatisticTraceData<TType extends MovementType | "travel" = MovementType | "travel"> extends BaseStatisticTraceData {
    type: TType;
    value: number;
    base: number;
    source: string | null;
}
interface LandSpeedStatisticTraceData extends SpeedStatisticTraceData<"land"> {
    crawl: number;
    step: number;
}
interface ExtendParams<TType extends MovementType | "travel"> extends Pick<SpeedStatisticData<TType>, "type" | "base" | "modifiers" | "source"> {}
export { SpeedStatistic };
export type { LandSpeedStatisticTraceData, SpeedStatisticTraceData };
