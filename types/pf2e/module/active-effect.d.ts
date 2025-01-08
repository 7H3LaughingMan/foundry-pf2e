import { ActorPF2e } from "./actor/index.ts";
import { AbstractEffectPF2e, ItemPF2e } from "./item/index.ts";

export declare class ActiveEffectPF2e<TParent extends ActorPF2e | ItemPF2e | null> extends ActiveEffect<TParent> {
    /** Create an active effect from an (abstract) effect for use in token effect icons */
    static fromEffect<TActor extends ActorPF2e>(effect: AbstractEffectPF2e<TActor>): ActiveEffectPF2e<TActor>;
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: User): Promise<boolean | void>;
}
