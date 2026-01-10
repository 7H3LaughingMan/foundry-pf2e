import { ActorPF2e } from "./../../actor/index.ts";
import { DocumentConstructionContext } from "#common/_types.mjs";
import { DatabaseCreateCallbackOptions, DatabaseUpdateCallbackOptions } from "#common/abstract/_types.mjs";
import { ItemPF2e } from "./../index.ts";
import { AbstractEffectPF2e, EffectBadgeCounter } from "./../abstract-effect/index.ts";
import { AfflictionDamageTemplate, DamageDamageContext } from "./../../system/damage/index.ts";
import { AfflictionFlags, AfflictionSource, AfflictionSystemData } from "./data.ts";
declare class AfflictionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    constructor(source: object, context?: DocumentConstructionContext<TParent>);
    get badge(): EffectBadgeCounter;
    /** Returns the current stage. This stage is 1 indexed */
    get stage(): number;
    get maxStage(): number;
    increase(): Promise<void>;
    /** Decreases the affliction stage, deleting if reduced to 0 even if an onset exists */
    decrease(): Promise<void>;
    get onsetDuration(): number;
    get remainingStageDuration(): {
        expired: boolean;
        remaining: number;
    };
    /** Retrieves the damage for a specific stage */
    getStageDamage(stage: number): AfflictionDamage | null;
    /** Run all updates that need to occur whenever the stage changes */
    protected handleStageChange(): Promise<void>;
    getLinkedItems(): ItemPF2e<ActorPF2e>[];
    createStageMessage(): Promise<void>;
    /** Set the start time and initiative roll of a newly created effect */
    protected _preCreate(
        data: DeepPartial<this["_source"]>,
        options: DatabaseCreateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        options: DatabaseUpdateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    protected _onCreate(data: AfflictionSource, options: DatabaseCreateCallbackOptions, userId: string): void;
    _onUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, userId: string): void;
    rollRecovery(): Promise<void>;
    prepareActorData(): void;
}
interface AfflictionPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends AbstractEffectPF2e<TParent> {
    flags: AfflictionFlags;
    readonly _source: AfflictionSource;
    system: AfflictionSystemData;
}
interface AfflictionDamage {
    template: AfflictionDamageTemplate;
    context: DamageDamageContext;
}
export { AfflictionPF2e };
