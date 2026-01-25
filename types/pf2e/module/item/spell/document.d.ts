import { Rolled } from "#client/dice/roll.mjs";
import { DocumentConstructionContext } from "#common/_types.mjs";
import {
    DatabaseCreateCallbackOptions,
    DatabaseUpdateCallbackOptions,
    DatabaseUpdateOperation,
} from "#common/abstract/_types.mjs";
import { RollMode } from "#common/constants.mjs";
import { ItemUUID } from "#common/documents/_module.mjs";
import { ActorPF2e } from "./../../actor/index.ts";
import { AttributeString } from "./../../actor/types.ts";
import { MeasuredTemplatePF2e } from "./../../canvas/index.ts";
import { ChatMessagePF2e, ItemOriginFlag } from "./../../chat-message/index.ts";
import { OneToTen, Rarity, ZeroToTwo } from "./../../data.ts";
import { TokenDocumentPF2e } from "./../../scene/index.ts";
import { CheckRoll } from "./../../system/check/index.ts";
import { DamageRoll } from "./../../system/damage/roll.ts";
import { DamageDamageContext, DamageKind, SpellDamageTemplate } from "./../../system/damage/types.ts";
import { StatisticRollParameters } from "./../../system/statistic/index.ts";
import { EnrichmentOptionsPF2e, RollDataPF2e } from "./../../system/text-editor.ts";
import { ItemSourcePF2e, RawItemChatData } from "./../base/data/index.ts";
import { ItemDescriptionData } from "./../base/data/system.ts";
import { ConsumablePF2e, ItemPF2e } from "./../index.ts";
import { SpellSlotGroupId } from "./../spellcasting-entry/collection.ts";
import { BaseSpellcastingEntry } from "./../spellcasting-entry/types.ts";
import { RangeData } from "./../types.ts";
import { SpellArea, SpellHeightenLayer, SpellOverlayType, SpellSource, SpellSystemData } from "./data.ts";
import { SpellOverlayCollection } from "./overlay.ts";
import { MagicTradition, SpellTrait } from "./types.ts";
declare class SpellPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly parentItem: ConsumablePF2e<TParent> | null;
    /** The original spell. Only exists if this is a variant */
    original?: SpellPF2e<TParent>;
    /** The overlays that were applied to create this variant */
    appliedOverlays?: Map<SpellOverlayType, string>;
    overlays: SpellOverlayCollection;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: SpellConstructionContext<TParent>);
    static get validTraits(): Record<SpellTrait, string>;
    /** The id of the override overlay that constitutes this variant */
    get variantId(): string | null;
    /** The spell's "base" rank; that is, before heightening */
    get baseRank(): OneToTen;
    /** Legacy getter, though not yet deprecated */
    get baseLevel(): OneToTen;
    /**
     * Heightened rank of the spell if heightened, otherwise base.
     * This applies for spontaneous or innate spells usually, but not prepared ones.
     */
    get rank(): OneToTen;
    /**
     * Legacy getter: only deprecated internally
     * @deprecated
     */
    get level(): number;
    get traits(): Set<SpellTrait>;
    get rarity(): Rarity;
    get traditions(): Set<MagicTradition>;
    get actionGlyph(): string | null;
    get defense(): {
        slug: string;
        label: string;
    } | null;
    get spellcasting(): BaseSpellcastingEntry<NonNullable<TParent>> | null;
    get isAttack(): boolean;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    get attribute(): AttributeString;
    /** Whether this spell has unlimited uses */
    get atWill(): boolean;
    get isVariant(): boolean;
    get hasVariants(): boolean;
    /**
     * Attempt to parse out range data.
     * @todo Migrate me.
     */
    get range(): RangeData | null;
    get isMelee(): boolean;
    get isRanged(): boolean;
    get area():
        | (SpellArea & {
              label: string;
          })
        | null;
    /** Whether the "damage" roll of this spell deals damage or heals (or both, depending on the target) */
    get damageKinds(): Set<DamageKind>;
    get uuid(): ItemUUID;
    /** Given a slot level, compute the actual level the spell will be cast at */
    computeCastRank(slotNumber?: number): OneToTen;
    getRollData(rollOptions?: { castRank?: number | string }): RollDataPF2e;
    getDamage(params?: SpellDamageOptions): Promise<SpellDamage | null>;
    /**
     * Returns the base un-variant form of this spell with specific preservations, otherwise returns this.
     * The linked spellcasting feature as well as the castRank are preserved when retrieving this variant.
     */
    loadBaseVariant(): SpellPF2e;
    /**
     * Loads an alternative version of this spell, called a variant.
     * The variant is created via the application of one or more overlays based on parameters.
     * This handles heightening as well as alternative cast modes of spells.
     * If there's nothing to apply, returns null.
     */
    loadVariant(options?: SpellVariantOptions): this | null;
    getHeightenLayers(rank?: number): SpellHeightenLayer[];
    placeTemplate(message?: ChatMessagePF2e): Promise<MeasuredTemplatePF2e>;
    prepareBaseData(): void;
    prepareSiblingData(this: SpellPF2e<ActorPF2e>): void;
    prepareActorData(): void;
    onPrepareSynthetics(this: SpellPF2e<ActorPF2e>): void;
    getRollOptions(
        prefix?: string,
        options?: {
            includeGranter?: boolean;
            includeVariants?: boolean;
        },
    ): string[];
    toMessage(
        event?: Maybe<PointerEvent>,
        { create, data, rollMode }?: SpellToMessageOptions,
    ): Promise<ChatMessagePF2e | undefined>;
    getDescriptionData(): Promise<ItemDescriptionData>;
    getChatData(
        this: SpellPF2e<ActorPF2e>,
        htmlOptions?: EnrichmentOptionsPF2e,
        rollOptions?: {
            castRank?: number | string;
            groupId?: SpellSlotGroupId;
        },
    ): Promise<RawItemChatData>;
    rollAttack(
        this: SpellPF2e<ActorPF2e>,
        event: PointerEvent,
        attackNumber?: number,
        context?: StatisticRollParameters,
    ): Promise<Rolled<CheckRoll> | null>;
    rollDamage(
        this: SpellPF2e<ActorPF2e>,
        event: PointerEvent,
        mapIncreases?: ZeroToTwo,
    ): Promise<Rolled<DamageRoll> | null>;
    /** Roll counteract check */
    rollCounteract(event?: PointerEvent): Promise<Rolled<CheckRoll> | null>;
    getOriginData(): ItemOriginFlag;
    update(
        data: Record<string, unknown>,
        operation?: Partial<Omit<DatabaseUpdateOperation<null>, "parent" | "pack">>,
    ): Promise<this | undefined>;
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
}
interface SpellPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: SpellSource;
    system: SpellSystemData;
}
interface SpellConstructionContext<TParent extends ActorPF2e | null> extends DocumentConstructionContext<TParent> {
    parentItem?: Maybe<ConsumablePF2e<TParent>>;
}
interface SpellDamage {
    template: SpellDamageTemplate;
    context: DamageDamageContext;
}
interface SpellToMessageOptions {
    create?: boolean;
    rollMode?: RollMode;
    data?: {
        castRank?: number;
    };
}
interface SpellDamageOptions {
    rollMode?: RollMode | "roll";
    skipDialog?: boolean;
    target?: Maybe<TokenDocumentPF2e>;
}
interface SpellVariantOptions {
    castRank?: number;
    overlayIds?: string[];
    entryId?: string | null;
}
export { SpellPF2e, type SpellToMessageOptions };
