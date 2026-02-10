import { DocumentHTMLEmbedConfig } from "#client/applications/ux/text-editor.mjs";
import { DatabaseCreateCallbackOptions, DatabaseUpdateCallbackOptions } from "#common/abstract/_types.mjs";
import { CraftingAbility } from "./../../actor/character/crafting/ability.ts";
import { FeatGroup } from "./../../actor/character/feats/index.ts";
import { ActorPF2e } from "./../../actor/index.ts";
import { Rarity } from "./../../data.ts";
import { RuleElement, RuleElementOptions } from "./../../rules/index.ts";
import { EnrichmentOptionsPF2e } from "./../../system/text-editor.ts";
import { ActionCost, Frequency, RawItemChatData } from "./../base/data/index.ts";
import { HeritagePF2e, ItemPF2e } from "./../index.ts";
import { FeatSource, FeatSystemData } from "./data.ts";
import { FeatOrFeatureCategory, FeatTrait } from "./types.ts";
declare class FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    group: FeatGroup | null;
    grants: (FeatPF2e<ActorPF2e> | HeritagePF2e<ActorPF2e>)[];
    /** If this ability can craft, what is the crafting ability */
    crafting: CraftingAbility | null;
    /** If suppressed, this feature should not be assigned to any feat category nor create rule elements */
    suppressed: boolean;
    static get validTraits(): Record<FeatTrait, string>;
    get category(): FeatOrFeatureCategory;
    get level(): number;
    get traits(): Set<FeatTrait>;
    get rarity(): Rarity;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    get isFeature(): boolean;
    get isFeat(): boolean;
    /** Whether this feat must be taken at character level 1 */
    get onlyLevel1(): boolean;
    /** The maximum number of times this feat can be taken */
    get maxTakable(): number;
    /** Returns the number of times this feat was taken, limited by maxTakable */
    get timesTaken(): number;
    prepareBaseData(): void;
    prepareActorData(): void;
    /** Assigns the grants of this item based on the given item. */
    establishHierarchy(): void;
    prepareSiblingData(): void;
    onPrepareSynthetics(this: FeatPF2e<ActorPF2e>): void;
    /** Overriden to not create rule elements when suppressed */
    prepareRuleElements(options?: Omit<RuleElementOptions, "parent">): RuleElement[];
    getChatData(this: FeatPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptionsPF2e): Promise<RawItemChatData>;
    /** Generate a list of strings for use in predication */
    getRollOptions(
        prefix?: string,
        options?: {
            includeGranter?: boolean;
        },
    ): string[];
    protected embedHTMLString(
        config: DocumentHTMLEmbedConfig & {
            hr?: boolean;
        },
    ): string;
    /** In case this was copied from an actor, clear the location if there's no parent. */
    protected _preCreate(data: DeepPartial<this["_source"]>, options: DatabaseCreateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DatabaseUpdateCallbackOptions, user: fd.BaseUser): Promise<boolean | void>;
    /** Warn the owning user(s) if this feat was taken despite some restriction */
    protected _onCreate(data: FeatSource, options: DatabaseCreateCallbackOptions, userId: string): void;
}
interface FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: FeatSource;
    system: FeatSystemData;
    /** Interface alignment with other "attack items" */
    readonly range?: never;
}
export { FeatPF2e };
