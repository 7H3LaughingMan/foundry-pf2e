/** Item types representing the variant components of a PC actor type */
declare const PC_ITEM_TYPES: readonly ["ancestry", "background", "class", "deity", "feat", "heritage"];
declare const ITEM_TYPES: readonly [
    "action",
    "affliction",
    "ammo",
    "ancestry",
    "armor",
    "background",
    "backpack",
    "book",
    "campaignFeature",
    "class",
    "condition",
    "consumable",
    "deity",
    "effect",
    "equipment",
    "feat",
    "heritage",
    "kit",
    "lore",
    "melee",
    "shield",
    "spell",
    "spellcastingEntry",
    "treasure",
    "weapon",
];
declare const EFFECT_AREA_SHAPES: readonly ["burst", "cone", "cube", "cylinder", "emanation", "line", "square"];
export { EFFECT_AREA_SHAPES, ITEM_TYPES, PC_ITEM_TYPES };
