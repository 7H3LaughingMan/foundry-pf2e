import { Zod } from "#foundry-pf2e/zod";
import * as z from "zod";

export const ItemAlteration = z.strictObject({
    mode: z.literal(["add", "downgrade", "multiply", "override", "remove", "subtract", "upgrade"]).optional(),
    property: z
        .literal([
            "ac-bonus",
            "area-size",
            "badge-max",
            "badge-value",
            "bulk",
            "category",
            "check-penalty",
            "damage-dice-faces",
            "damage-dice-number",
            "damage-type",
            "defense-passive",
            "description",
            "dex-cap",
            "focus-point-cost",
            "grade",
            "group",
            "hardness",
            "hp-max",
            "material-type",
            "pd-recovery-dc",
            "persistent-damage",
            "rarity",
            "range-increment",
            "range-max",
            "frequency-max",
            "frequency-per",
            "other-tags",
            "name",
            "runes-potency",
            "runes-resilient",
            "runes-striking",
            "speed-penalty",
            "strength",
            "traits",
        ])
        .optional(),
    fromEquipment: z.boolean().optional(),
    value: Zod.RuleElements.RuleValue.optional(),
});

export type ItemAlteration = z.infer<typeof ItemAlteration>;

export const ItemAlterationSource = Zod.RuleElements.RuleElementSource.extend({
    key: z.literal("ItemAlteration"),
    itemId: z.string().nonempty().optional(),
    itemType: z.string().optional(),
    battleForm: z.boolean().optional(),
    ...ItemAlteration.shape,
});

export type ItemAlterationSource = z.infer<typeof ItemAlterationSource>;
