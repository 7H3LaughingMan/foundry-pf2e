import { ActorPF2e } from '../../actor/index.ts';
import { FeatGroup } from '../../actor/character/feats.ts';
import { ItemPF2e, HeritagePF2e } from '../index.ts';
import { ActionCost, Frequency, RawItemChatData } from '../base/data/index.ts';
import { Rarity } from '../../data.ts';
import { UserPF2e } from '../../user/index.ts';
import { FeatSource, FeatSystemData } from './data.ts';
import { FeatOrFeatureCategory, FeatTrait } from './types.ts';
declare class FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    group: FeatGroup | null;
    grants: (FeatPF2e<ActorPF2e> | HeritagePF2e<ActorPF2e>)[];
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
    prepareBaseData(): void;
    prepareActorData(): void;
    prepareSiblingData(): void;
    onPrepareSynthetics(this: FeatPF2e<ActorPF2e>): void;
    getChatData(this: FeatPF2e<ActorPF2e>, htmlOptions?: EnrichmentOptions): Promise<RawItemChatData>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string, options?: {
        includeGranter?: boolean;
    }): string[];
    protected _preCreate(data: this["_source"], operation: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<this["_source"]>, operation: DatabaseUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Warn the owning user(s) if this feat was taken despite some restriction */
    protected _onCreate(data: FeatSource, operation: DatabaseCreateOperation<TParent>, userId: string): void;
    protected embedHTMLString(_config: DocumentHTMLEmbedConfig, _options: EnrichmentOptions): string;
}
interface FeatPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: FeatSource;
    system: FeatSystemData;
    /** Interface alignment with other "attack items" */
    readonly range?: never;
}
export { FeatPF2e };
