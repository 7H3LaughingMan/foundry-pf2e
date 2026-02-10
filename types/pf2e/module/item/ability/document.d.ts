import { DatabaseCreateCallbackOptions, DatabaseUpdateCallbackOptions } from "#common/abstract/_types.mjs";
import { CraftingAbility } from "./../../actor/character/crafting/ability.ts";
import { ActorPF2e } from "./../../actor/index.ts";
import { RuleElement, RuleElementOptions } from "./../../rules/index.ts";
import { EnrichmentOptionsPF2e } from "./../../system/text-editor.ts";
import { ActionCost, Frequency, RawItemChatData } from "./../base/data/index.ts";
import { ItemPF2e } from "./../index.ts";
import { RangeData } from "./../types.ts";
import { AbilitySource, AbilitySystemData } from "./data.ts";
import { AbilityTrait } from "./types.ts";
declare class AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    range?: RangeData | null;
    isMelee?: boolean;
    /** If this ability can craft, what is the crafting ability */
    crafting?: CraftingAbility | null;
    /** If suppressed, this ability should not be visible on character sheets nor have rule elements */
    suppressed: boolean;
    static get validTraits(): Record<AbilityTrait, string>;
    get traits(): Set<AbilityTrait>;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    prepareBaseData(): void;
    prepareActorData(): void;
    onPrepareSynthetics(this: AbilityItemPF2e<ActorPF2e>): void;
    getRollOptions(
        prefix?: string,
        options?: {
            includeGranter?: boolean;
        },
    ): string[];
    /** Overriden to not create rule elements when suppressed */
    prepareRuleElements(options?: Omit<RuleElementOptions, "parent">): RuleElement[];
    getChatData(this: AbilityItemPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    protected _preCreate(data: DeepPartial<this["_source"]>, options: DatabaseCreateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
}
interface AbilityItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: AbilitySource;
    system: AbilitySystemData;
}
export { AbilityItemPF2e };
