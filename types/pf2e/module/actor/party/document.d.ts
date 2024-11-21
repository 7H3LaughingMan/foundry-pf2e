import { ActorPF2e, CreaturePF2e } from '../index.ts';
import { ItemType } from '../../item/base/data/index.ts';
import { RuleElementPF2e } from '../../rules/index.ts';
import { RuleElementSchema } from '../../rules/rule-element/data.ts';
import { UserPF2e } from '../../user/document.ts';
import { TokenDocumentPF2e } from '../../scene/index.ts';
import { Statistic } from '../../system/statistic/index.ts';
import { PartySource, PartySystemData } from './data.ts';
import { PartyCampaign, PartyUpdateOperation } from './types.ts';
declare class PartyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    armorClass: null;
    members: CreaturePF2e[];
    get campaign(): PartyCampaign | null;
    get active(): boolean;
    get baseAllowedItemTypes(): (ItemType | "physical")[];
    get allowedItemTypes(): (ItemType | "physical")[];
    /** Friendship lives in our hearts */
    get canAct(): false;
    /** Part members can add and remove items (though system socket shenanigans)  */
    canUserModify(user: UserPF2e, action: UserAction): boolean;
    /** Our bond is unbreakable. */
    isAffectedBy(): false;
    /** Only prepare rule elements for non-physical items (in case campaign items exist) */
    protected prepareRuleElements(): RuleElementPF2e<RuleElementSchema>[];
    /** Make `system.campaign` non-enumerable to prevent `TokenDocument.getTrackedAttributes` from recursing into it. */
    protected _initialize(options?: Record<string, unknown> | undefined): void;
    prepareBaseData(): void;
    prepareDerivedData(): void;
    addMembers(...membersToAdd: CreaturePF2e[]): Promise<void>;
    removeMembers(...remove: (ActorUUID | CreaturePF2e)[]): Promise<void>;
    getRollOptions(domains?: string[]): string[];
    getRollData(): Record<string, unknown>;
    /** Re-render the sheet if data preparation is called from the familiar's master */
    reset({ actor }?: {
        actor?: boolean | undefined;
    }): void;
    /** Include campaign statistics in party statistics */
    getStatistic(slug: string): Statistic<this> | null;
    private _resetAndRerenderDebounced;
    protected _preCreate(data: this["_source"], options: DatabaseCreateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    protected _preUpdate(changed: DeepPartial<PartySource>, options: PartyUpdateOperation<TParent>, user: UserPF2e): Promise<boolean | void>;
    /** Override to inform creatures when they were booted from a party */
    protected _onUpdate(changed: DeepPartial<PartySource>, operation: PartyUpdateOperation<TParent>, userId: string): void;
    /** Overriden to inform creatures the party is defunct */
    protected _onDelete(operation: DatabaseDeleteOperation<TParent>, userId: string): void;
}
interface PartyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: PartySource;
    system: PartySystemData;
}
export { PartyPF2e };
