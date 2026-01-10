import { ActorPF2e, CreaturePF2e } from "./../index.ts";
import { ActorUpdateCallbackOptions } from "./../base.ts";
import {
    DatabaseCreateCallbackOptions,
    DatabaseDeleteCallbackOptions,
    DataModelValidationOptions,
} from "#common/abstract/_module.mjs";
import { UserAction } from "#common/constants.mjs";
import { ActorUUID } from "#common/documents/_module.mjs";
import { ItemType } from "./../../item/types.ts";
import { RuleElement } from "./../../rules/index.ts";
import { RuleElementSchema } from "./../../rules/rule-element/data.ts";
import { TokenDocumentPF2e } from "./../../scene/index.ts";
import { Statistic } from "./../../system/statistic/index.ts";
import { PartySource, PartySystemData } from "./data.ts";
import { PartyCampaign } from "./types.ts";
declare class PartyPF2e<
    TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null,
> extends ActorPF2e<TParent> {
    armorClass: null;
    members: CreaturePF2e[];
    campaign: PartyCampaign | null;
    get active(): boolean;
    get baseAllowedItemTypes(): (ItemType | "physical")[];
    get allowedItemTypes(): (ItemType | "physical")[];
    /** Friendship lives in our hearts */
    get canAct(): false;
    /** Part members can add and remove items (though system socket shenanigans)  */
    canUserModify(user: fd.BaseUser, action: UserAction): boolean;
    /** Our bond is unbreakable. */
    isAffectedBy(): false;
    /** Override validation to defer certain properties to the campaign model */
    validate(options?: DataModelValidationOptions): boolean;
    updateSource(data?: Record<string, unknown>, options?: DocumentSourceUpdateContext): DeepPartial<this["_source"]>;
    /** Only prepare rule elements for non-physical items (in case campaign items exist) */
    protected prepareRuleElements(): RuleElement<RuleElementSchema>[];
    prepareBaseData(): void;
    prepareDerivedData(): void;
    addMembers(...membersToAdd: CreaturePF2e[]): Promise<void>;
    removeMembers(...remove: (ActorUUID | CreaturePF2e)[]): Promise<void>;
    getRollOptions(domains?: string[]): string[];
    getRollData(): Record<string, unknown>;
    /** Re-render the sheet if data preparation is called from the familiar's master */
    reset({ actor }?: { actor?: boolean | undefined }): void;
    /** Include campaign statistics in party statistics */
    getStatistic(slug: string): Statistic<this> | null;
    private _resetAndRerenderDebounced;
    protected _preCreate(
        data: DeepPartial<this["_source"]>,
        options: DatabaseCreateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    protected _preUpdate(
        changed: DeepPartial<this["_source"]>,
        options: PartyUpdateCallbackOptions,
        user: fd.BaseUser,
    ): Promise<boolean | void>;
    /** Override to inform creatures when they were booted from a party */
    protected _onUpdate(
        changed: DeepPartial<this["_source"]>,
        options: PartyUpdateCallbackOptions,
        userId: string,
    ): void;
    /** Overriden to inform creatures the party is defunct */
    protected _onDelete(options: DatabaseDeleteCallbackOptions, userId: string): void;
}
interface PartyPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: PartySource;
    system: PartySystemData;
}
interface PartyUpdateCallbackOptions extends ActorUpdateCallbackOptions {
    removedMembers?: string[];
}
export { PartyPF2e };
