import { DocumentHTMLEmbedConfig } from "#client/applications/ux/text-editor.mjs";
import { DatabaseCreateCallbackOptions, DatabaseUpdateCallbackOptions } from "#common/abstract/_types.mjs";
import { FeatGroup } from "./../../actor/character/feats/index.ts";
import { ActorPF2e } from "./../../actor/index.ts";
import { ActionCost, Frequency } from "./../base/data/index.ts";
import { ItemPF2e } from "./../index.ts";
import { CampaignFeatureSource, CampaignFeatureSystemData } from "./data.ts";
import { BehaviorType, KingmakerCategory, KingmakerTrait } from "./types.ts";
declare class CampaignFeaturePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    group: FeatGroup<ActorPF2e, CampaignFeaturePF2e> | null;
    grants: CampaignFeaturePF2e[];
    behavior: BehaviorType;
    levelLabel: string;
    /** The item that granted this feature */
    granter: CampaignFeaturePF2e | null;
    static get validTraits(): Record<KingmakerTrait, string>;
    get category(): KingmakerCategory;
    /** Returns the level if the feature type supports it */
    get level(): number | null;
    get traits(): Set<KingmakerTrait>;
    get actionCost(): ActionCost | null;
    get frequency(): Frequency | null;
    get isAction(): boolean;
    get isFeature(): boolean;
    get isFeat(): boolean;
    prepareBaseData(): void;
    /** Set a self roll option for this feat(ure). Skip for actions */
    prepareActorData(this: CampaignFeaturePF2e<ActorPF2e>): void;
    prepareSiblingData(): void;
    /** Generate a list of strings for use in predication */
    getRollOptions(
        prefix?: string,
        options?: {
            includeGranter?: boolean;
        },
    ): string[];
    /** In case this was copied from an actor, clear the location if there's no parent. */
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
    protected embedHTMLString(
        config: DocumentHTMLEmbedConfig & {
            hr?: boolean;
        },
    ): string;
}
interface CampaignFeaturePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: CampaignFeatureSource;
    system: CampaignFeatureSystemData;
}
export { CampaignFeaturePF2e };
