import { ImageFilePath } from "#common/constants.mjs";
import { ActorUUID, ItemUUID, TokenDocumentUUID } from "#common/documents/_module.mjs";
import {
    ActorPF2e,
    ConditionSlug,
    ConditionSource,
    DamageType,
    EffectBadge,
    EffectSource,
    ItemPF2e,
    TokenDocumentPF2e,
} from "foundry-pf2e";
import { isDecimal, isNonNegative } from "./index.ts";
import { GrantItemSource, ItemAlterationSource, RuleElementSource } from "./rule-elements.ts";
import { SYSTEM } from "./system.ts";

const PERSISTENT_DAMAGE_IMAGES: Partial<Record<DamageType, () => ImageFilePath>> = {
    acid: () => "icons/magic/acid/dissolve-arm-flesh.webp",
    bludgeoning: () => SYSTEM.getPath("icons/equipment/weapons/bola.webp"),
    cold: () => "icons/magic/water/ice-snowman.webp",
    electricity: () => SYSTEM.getPath("icons/spells/chain-lightning.webp"),
    fire: () => "icons/magic/fire/flame-burning-creature-skeleton.webp",
    force: () => SYSTEM.getPath("icons/spells/modify-memory.webp"),
    mental: () => SYSTEM.getPath("icons/spells/modify-memory.webp"),
    piercing: () => SYSTEM.getPath("icons/equipment/weapons/throwing-knife.webp"),
    poison: () => SYSTEM.getPath("icons/spells/acidic-burst.webp"),
    slashing: () => SYSTEM.getPath("icons/equipment/weapons/scimitar.webp"),
    sonic: () => SYSTEM.getPath("icons/spells/cry-of-destruction.webp"),
    spirit: () => "icons/magic/unholy/hand-claw-fire-blue.webp",
    vitality: () => SYSTEM.getPath("spells/moment-of-renewal.webp"),
    void: () => SYSTEM.getPath("icons/spells/grim-tendrils.webp"),
};

export function createCustomPersistentDamage(
    options: CustomPersistentDamageOptions,
): PreCreate<EffectSource> | undefined {
    const { formula, damageType, dc = 15, criticalHit = false } = options;

    return createCustomCondition({
        ...options,
        slug: "persistent-damage",
        img: options.img || PERSISTENT_DAMAGE_IMAGES[damageType]?.call(undefined),
        alterations: [
            { mode: "override", property: "persistent-damage", value: { formula, damageType, dc, criticalHit } },
        ],
    });
}

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
    const { alterations = [], counter = 1, img, name, slug } = options;
    const condition = game.pf2e.ConditionManager.getCondition(slug);

    if (slug === "persistent-damage" && !alterations.length) return;

    const rule: GrantItemSource = {
        key: "GrantItem",
        uuid: condition.uuid,
        onDeleteActions: {
            grantee: "restrict",
        },
        alterations,
    };

    if (condition.system.value.isValued && isNonNegative(counter) && isDecimal(counter) && counter !== 0) {
        rule.inMemoryOnly = true;
        rule.alterations?.push({
            mode: "override",
            property: "badge-value",
            value: counter,
        });
    }

    return createCustomEffect({
        ...options,
        name: name || `${game.i18n.localize("TYPES.Item.effect")}: ${condition.name}`,
        img: img || condition.img,
        rules: [rule],
        tokenIcon: false,
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

type CustomPersistentDamageOptions = Omit<CustomEffectOptions, "badge" | "rules" | "tokenIcon"> & {
    formula: string;
    damageType: DamageType;
    dc?: number;
    criticalHit?: boolean;
};

type CustomConditionOptions = Omit<CustomEffectOptions, "badge" | "rules" | "tokenIcon"> & {
    slug: Exclude<ConditionSlug, "dying" | "unconscious">;
    counter?: number;
    alterations?: ItemAlterationSource[];
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
    rules?: RuleElementSource[];
    slug?: string;
    tokenIcon?: boolean;
    unidentified?: boolean;
};
