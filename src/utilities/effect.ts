import { ImageFilePath } from "#common/constants.mjs";
import { ActorUUID, ItemUUID, TokenDocumentUUID } from "#common/documents/_module.mjs";
import { ActorPF2e } from "#pf2e-module/actor/base.js";
import { EffectBadge } from "#pf2e-module/item/abstract-effect/data.js";
import { ItemPF2e } from "#pf2e-module/item/base/document.js";
import { ConditionSource } from "#pf2e-module/item/condition/data.js";
import { ConditionSlug } from "#pf2e-module/item/condition/types.js";
import { EffectSource } from "#pf2e-module/item/effect/data.js";
import { TokenDocumentPF2e } from "#pf2e-module/scene/token-document/document.js";
import { DamageType } from "#pf2e-module/system/damage/types.js";
import { isDecimal, isNonNegative } from "#utilities/number.ts";
import { zRuleElementSource } from "#zod/rules/base.ts";
import { zGrantItemSource } from "#zod/rules/grant-item.ts";
import { zItemAlteration } from "#zod/rules/item-alteration.ts";

export function createPersistentDamageSource(
    formula: string,
    damageType: DamageType,
    dc: number = 15,
    criticalHit: boolean = false,
): ConditionSource {
    const conditionSource = game.pf2e.ConditionManager.getCondition("persistent-damage").toObject();
    return foundry.utils.mergeObject(conditionSource, {
        system: { persistent: { formula, damageType, dc, criticalHit } },
    });
}

export function createConditionSource(slug: Exclude<ConditionSlug, "persistent-damage">, counter = 1): ConditionSource {
    const conditionSource = game.pf2e.ConditionManager.getCondition(slug).toObject();

    if (conditionSource.system.value.isValued && isNonNegative(counter) && isDecimal(counter)) {
        conditionSource.system.value.value = counter;
    }

    return conditionSource;
}

export function createCustomCondition(options: CustomConditionOptions): PreCreate<EffectSource> | undefined {
    const { alterations = [], conditionSlug, counter = 1 } = options;
    const { name, img, tokenIcon = false } = options;

    const condition = game.pf2e.ConditionManager.getCondition(conditionSlug);

    return createCustomEffect({
        ...options,
        name: name || `${game.i18n.localize("TYPES.Item.effect")}: ${condition.name}`,
        img: img || condition.img,
        rules: [createGrantConditionSource({ conditionSlug, counter, alterations })],
        tokenIcon,
    });
}

export function createCustomConditions({ conditions }: CustomConditionsOptions): PreCreate<EffectSource> | undefined {
    return createCustomEffect({
        rules: conditions.map((value) => createGrantConditionSource(value)),
    });
}

export function createCustomEffect(options: CustomEffectOptions): WithRequired<PreCreate<EffectSource>, "system"> {
    const {
        name = "Effect",
        img,
        badge,
        context,
        description,
        duration,
        level,
        publication,
        rules,
        slug,
        tokenIcon = true,
        unidentified = false,
    } = options;

    const system: DeepPartial<EffectSource["system"]> = {
        unidentified,
        tokenIcon: { show: tokenIcon },
    };

    if (badge) system.badge = badge;
    if (description) system.description = { value: description };
    if (duration) system.duration = duration;
    if (level) system.level = { value: level };
    if (publication) system.publication = publication;
    if (rules) system.rules = rules;
    if (slug) system.slug = slug;

    if (context) {
        system.context = {};

        if (context.origin) {
            const origin: {
                actor: ActorUUID;
                token?: TokenDocumentUUID;
                item?: ItemUUID;
                spellcasting?: {
                    attribute: {
                        type: "str" | "dex" | "con" | "int" | "wis" | "cha";
                        mod: number;
                    };
                    tradition: "arcane" | "divine" | "occult" | "primal" | null;
                };
                rollOptions?: string[];
            } = {
                actor: context.origin.actor.uuid,
            };

            if (context.origin.token) origin.token = context.origin.token.uuid;
            if (context.origin.item) origin.item = context.origin.item.uuid;
            if (context.origin.item?.isOfType("spell") && context.origin.item.spellcasting) {
                origin.spellcasting = {
                    attribute: {
                        type: context.origin.item.attribute,
                        mod: context.origin.item.spellcasting.statistic?.attributeModifier?.value ?? 0,
                    },
                    tradition: context.origin.item.spellcasting.tradition,
                };
                system.level = { value: context.origin.item.rank };
            }
            origin.rollOptions = [
                ...context.origin.actor.getSelfRollOptions("origin"),
                ...(context.origin.item?.getRollOptions("origin:item") ?? []),
            ];

            system.context.origin = origin;
        }

        if (context.target) {
            const target: {
                actor: ActorUUID;
                token?: TokenDocumentUUID;
            } = { actor: context.target.actor.uuid };

            if (context.target.token) target.token = context.target.token.uuid;

            system.context.origin = target;
        }

        if (context.roll) {
            const roll: {
                total: number;
                degreeOfSuccess?: 0 | 1 | 2 | 3;
            } = { total: context.roll.total };

            if (context.roll.degreeOfSuccess) roll.degreeOfSuccess = context.roll.degreeOfSuccess;

            system.context.roll = roll;
        }
    }

    return {
        type: "effect",
        name,
        img,
        system,
    };
}

export function createGrantConditionSource(options: ConditionOptions): zGrantItemSource {
    const { alterations = [], conditionSlug, counter = 1 } = options;
    const condition = game.pf2e.ConditionManager.getCondition(conditionSlug);

    const grantItemRule: zGrantItemSource = {
        key: "GrantItem",
        uuid: condition.uuid,
        onDeleteActions: {
            grantee: "restrict",
        },
        alterations,
    };

    if (condition.system.value.isValued && isNonNegative(counter) && isDecimal(counter) && counter !== 0) {
        grantItemRule.inMemoryOnly = true;
        grantItemRule.alterations?.push({
            mode: "override",
            property: "badge-value",
            value: counter,
        });
    }

    return grantItemRule;
}

type ConditionOptions = {
    conditionSlug: Exclude<ConditionSlug, "dying" | "persistent-damage" | "unconscious">;
    counter?: number;
    alterations?: zItemAlteration[];
};

type CustomConditionOptions = Omit<CustomEffectOptions, "badge" | "rules"> & ConditionOptions;

type CustomConditionsOptions = Omit<CustomEffectOptions, "badge" | "rules"> & {
    conditions: ConditionOptions[];
};

type CustomEffectOptions = {
    name?: string;
    img?: ImageFilePath;
    badge?: EffectBadge;
    context?: {
        origin?: {
            actor: ActorPF2e;
            token?: TokenDocumentPF2e;
            item?: ItemPF2e;
        };
        target?: {
            actor: ActorPF2e;
            token?: TokenDocumentPF2e;
        };
        roll?: {
            total: number;
            degreeOfSuccess?: 0 | 1 | 2 | 3;
        };
    };
    description?: string;
    duration?: {
        value?: number;
        unit: "rounds" | "minutes" | "hours" | "days" | "unlimited" | "encounter";
        expiry?: "turn-start" | "turn-end" | "round-end";
        sustained?: boolean;
    };
    level?: number;
    publication?: {
        title?: string;
        authors?: string;
        license?: "OGL" | "ORC";
        remaster?: boolean;
    };
    rules?: zRuleElementSource[];
    slug?: string;
    tokenIcon?: boolean;
    unidentified?: boolean;
};
