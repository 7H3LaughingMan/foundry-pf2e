import {
    AELikeRuleElement,
    AELikeSchema,
    ActorTraitsRuleElement,
    AdjustDegreeOfSuccessRuleElement,
    AdjustModifierRuleElement,
    AdjustStrikeRuleElement,
    AuraRuleElement,
    BaseSpeedRuleElement,
    BattleFormRuleElement,
    ChoiceSetRuleElement,
    CraftingAbilityRuleElement,
    CreatureSizeRuleElement,
    CritSpecRuleElement,
    DamageAlterationRuleElement,
    DamageDiceRuleElement,
    DexterityModifierCapRuleElement,
    EphemeralEffectRuleElement,
    FastHealingRuleElement,
    FlatModifierRuleElement,
    ImmunityRuleElement,
    ItemAlterationRuleElement,
    LoseHitPointsRuleElement,
    MartialProficiencyRuleElement,
    MultipleAttackPenaltyRuleElement,
    ResistanceRuleElement,
    RollNoteRuleElement,
    RollOptionRuleElement,
    RollTwiceRuleElement,
    SenseRuleElement,
    SpecialResourceRuleElement,
    SpecialStatisticRuleElement,
    StrikeRuleElement,
    SubstituteRollRuleElement,
    TempHPRuleElement,
    TokenEffectIconRuleElement,
    TokenImageRuleElement,
    TokenLightRuleElement,
    TokenMarkRuleElement,
    TokenNameRuleElement,
    WeaknessRuleElement,
    RawPredicate,
    AELikeChangeMode,
    ItemAlterationProperty,
} from "#foundry-pf2e";
import * as R from "remeda";

export type RuleElementSource = {
    key: string;
    slug?: string | null;
    label?: string;
    priority?: number;
    ignore?: boolean;
    predicate?: RawPredicate;
    requiresEquipped?: boolean | null;
    requiresInvestment?: boolean | null;
    spinoff?: string;
};

export type ItemAlterationSource = {
    mode: AELikeChangeMode;
    property: ItemAlterationProperty;
    value?: string | number | boolean | object;
    fromEquipment?: boolean;
};

export type GrantItemSource = RuleElementSource & {
    key: "GrantItem";
    uuid: string;
    flag?: string | null;
    reevaluateOnUpdate?: boolean;
    inMemoryOnly?: boolean;
    allowDuplicate?: boolean;
    nestUnderGranter?: boolean;
    alterations?: ItemAlterationSource[];
    track?: boolean;
    preselectChoices?: Record<string, string | number>;
    onDeleteActions?: {
        granter?: "cascade" | "detach" | "restrict";
        grantee?: "cascade" | "detach" | "restrict";
    };
};

export function isAELike(source: Maybe<RuleElementSource>): source is AELikeRuleElement<AELikeSchema>["_source"] {
    return R.isNonNullish(source) && source.key === "ActiveEffectLike";
}

export function isActorTraits(source: Maybe<RuleElementSource>): source is ActorTraitsRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "ActorTraits";
}

export function isAdjustDegreeOfSuccess(
    source: Maybe<RuleElementSource>,
): source is AdjustDegreeOfSuccessRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "AdjustDegreeOfSuccess";
}

export function isAdjustModifier(source: Maybe<RuleElementSource>): source is AdjustModifierRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "AdjustModifier";
}

export function isAdjustStrike(source: Maybe<RuleElementSource>): source is AdjustStrikeRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "AdjustStrike";
}

export function isAura(source: Maybe<RuleElementSource>): source is AuraRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "Aura";
}

export function isBaseSpeed(source: Maybe<RuleElementSource>): source is BaseSpeedRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "BaseSpeed";
}

export function isBattleForm(source: Maybe<RuleElementSource>): source is BattleFormRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "BattleForm";
}

export function isChoiceSet(source: Maybe<RuleElementSource>): source is ChoiceSetRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "ChoiceSet";
}

export function isCraftingAbility(source: Maybe<RuleElementSource>): source is CraftingAbilityRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "CraftingAbility";
}

export function isCreatureSize(source: Maybe<RuleElementSource>): source is CreatureSizeRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "CreatureSize";
}

export function isCriticalSpecialization(source: Maybe<RuleElementSource>): source is CritSpecRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "CriticalSpecialization";
}

export function isDamageAlteration(source: Maybe<RuleElementSource>): source is DamageAlterationRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "DamageAlteration";
}

export function isDamageDice(source: Maybe<RuleElementSource>): source is DamageDiceRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "DamageDice";
}

export function isDexterityModifierCap(
    source: Maybe<RuleElementSource>,
): source is DexterityModifierCapRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "DexterityModifierCap";
}

export function isEphemeralEffect(source: Maybe<RuleElementSource>): source is EphemeralEffectRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "EphemeralEffect";
}

export function isFastHealing(source: Maybe<RuleElementSource>): source is FastHealingRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "FastHealing";
}

export function isFlatModifier(source: Maybe<RuleElementSource>): source is FlatModifierRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "FlatModifier";
}

export function isGrantItem(source: Maybe<RuleElementSource>): source is GrantItemSource {
    return R.isNonNullish(source) && source.key === "GrantItem";
}

export function isImmunity(source: Maybe<RuleElementSource>): source is ImmunityRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "Immunity";
}

export function isItemAlteration(source: Maybe<RuleElementSource>): source is ItemAlterationRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "ItemAlteration";
}

export function isLoseHitPoints(source: Maybe<RuleElementSource>): source is LoseHitPointsRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "LoseHitPoints";
}

export function isMartialProficiency(
    source: Maybe<RuleElementSource>,
): source is MartialProficiencyRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "MartialProficiency";
}

export function isMultipleAttackPenalty(
    source: Maybe<RuleElementSource>,
): source is MultipleAttackPenaltyRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "MultipleAttackPenalty";
}

export function isNote(source: Maybe<RuleElementSource>): source is RollNoteRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "Note";
}

export function isResistance(source: Maybe<RuleElementSource>): source is ResistanceRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "Resistance";
}

export function isRollOption(source: Maybe<RuleElementSource>): source is RollOptionRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "RollOption";
}

export function isRollTwice(source: Maybe<RuleElementSource>): source is RollTwiceRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "RollTwice";
}

export function isSense(source: Maybe<RuleElementSource>): source is SenseRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "Sense";
}

export function isSpecialResource(source: Maybe<RuleElementSource>): source is SpecialResourceRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "SpecialResource";
}

export function isSpecialStatistic(source: Maybe<RuleElementSource>): source is SpecialStatisticRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "SpecialStatistic";
}

export function isStrike(source: Maybe<RuleElementSource>): source is StrikeRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "Strike";
}

export function isSubstituteRoll(source: Maybe<RuleElementSource>): source is SubstituteRollRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "SubstituteRoll";
}

export function isTempHP(source: Maybe<RuleElementSource>): source is TempHPRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "TempHP";
}

export function isTokenEffectIcon(source: Maybe<RuleElementSource>): source is TokenEffectIconRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "TokenEffectIcon";
}

export function isTokenImage(source: Maybe<RuleElementSource>): source is TokenImageRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "TokenImage";
}

export function isTokenLight(source: Maybe<RuleElementSource>): source is TokenLightRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "TokenLight";
}

export function isTokenMark(source: Maybe<RuleElementSource>): source is TokenMarkRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "TokenMark";
}

export function isTokenName(source: Maybe<RuleElementSource>): source is TokenNameRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "TokenName";
}

export function isWeakness(source: Maybe<RuleElementSource>): source is WeaknessRuleElement["_source"] {
    return R.isNonNullish(source) && source.key === "Weakness";
}
