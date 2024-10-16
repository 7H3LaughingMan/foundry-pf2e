import type { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { ItemPF2e } from "types/pf2e/module/item/index.ts";
import type { ActionCost, Frequency, RawItemChatData } from "types/pf2e/module/item/base/data/index.ts";
import type { RangeData } from "types/pf2e/module/item/types.ts";
import type { UserPF2e } from "types/pf2e/module/user/index.ts";
import type { AbilitySource, AbilitySystemData } from "./data.ts";
import type { ActionTrait } from "./types.ts";
declare class AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    range?: RangeData | null;
    isMelee?: boolean;
    static get validTraits(): Record<ActionTrait, string>;
    get traits(): Set<ActionTrait>;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareBaseData(): void;
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
