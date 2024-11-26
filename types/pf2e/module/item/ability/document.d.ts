import { ActorPF2e } from "../../actor/index.ts";
import { ItemPF2e } from "../index.ts";
import { ActionCost, Frequency, RawItemChatData } from "../base/data/index.ts";
import { RangeData } from "../types.ts";
import { UserPF2e } from "../../user/index.ts";
import { AbilitySource, AbilitySystemData } from "./data.ts";
import { AbilityTrait } from "./types.ts";
declare class AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    range?: RangeData | null;
    isMelee?: boolean;
    static get validTraits(): Record<AbilityTrait, string>;
    get traits(): Set<AbilityTrait>;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareActorData(): void;
    onPrepareSynthetics(this: AbilityItemPF2e<ActorPF2e>): void;
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    getChatData(this: AbilityItemPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
}
interface AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: AbilitySource;
    system: AbilitySystemData;
}
export { AbilityItemPF2e };
