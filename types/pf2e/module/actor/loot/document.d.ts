import { ActorPF2e } from "./../index.ts";
import { ActorUpdateCallbackOptions } from "./../base.ts";
import {
    DatabaseCreateCallbackOptions,
    DatabaseCreateOperation,
    DatabaseDeleteOperation,
} from "#common/abstract/_types.mjs";
import { default as Document } from "#common/abstract/document.mjs";
import { UserAction } from "#common/constants.mjs";
import { ItemType } from "./../../item/types.ts";
import { TokenDocumentPF2e } from "./../../scene/index.ts";
import { LootSource, LootSystemData } from "./data.ts";
declare class LootPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    armorClass: null;
    get allowedItemTypes(): (ItemType | "physical")[];
    get isLoot(): boolean;
    get isMerchant(): boolean;
    /** Should this actor's token(s) be hidden when there are no items in its inventory? */
    get hiddenWhenEmpty(): boolean;
    /** Loot actors can never benefit from rule elements */
    get canHostRuleElements(): boolean;
    /** It's a box. */
    get canAct(): false;
    /** It's a sturdy box. */
    isAffectedBy(): false;
    /** A user can see a loot actor in the actor directory only if they have at least Observer permission */
    get visible(): boolean;
    /** Anyone with Limited ownership can update a loot actor. */
    canUserModify(user: fd.BaseUser, action: UserAction): boolean;
    /** Hide this actor's token(s) when in loot (rather than merchant) mode, empty, and configured thus */
    toggleTokenHiding(): Promise<void>;
    /** Set base emphemeral data for later updating by derived-data preparation. */
    prepareBaseData(): void;
    /** Never process rules elements on loot actors */
    prepareDerivedData(): void;
    protected _onCreate(data: LootSource, options: DatabaseCreateCallbackOptions, userId: string): void;
    protected _onUpdate(
        changed: DeepPartial<this["_source"]>,
        options: ActorUpdateCallbackOptions,
        userId: string,
    ): void;
    protected _onCreateDescendantDocuments<P extends Document>(
        parent: P,
        collection: string,
        documents: Document<P>[],
        data: object[],
        options: DatabaseCreateOperation<P>,
        userId: string,
    ): void;
    protected _onDeleteDescendantDocuments<P extends Document>(
        parent: P,
        collection: string,
        documents: Document<P>[],
        ids: string[],
        options: DatabaseDeleteOperation<P>,
        userId: string,
    ): void;
}
interface LootPF2e<TParent extends TokenDocumentPF2e | null = TokenDocumentPF2e | null> extends ActorPF2e<TParent> {
    readonly _source: LootSource;
    system: LootSystemData;
    readonly saves?: never;
    get hitPoints(): null;
}
export { LootPF2e };
