import { ImmunityType, ResistanceType, WeaknessType } from "./types.ts";
declare const ATTRIBUTE_ABBREVIATIONS: Set<"str" | "dex" | "con" | "int" | "wis" | "cha">;
declare const CREATURE_ACTOR_TYPES: readonly ["character", "npc", "familiar"];
declare const ACTOR_TYPES: readonly ["army", "character", "familiar", "hazard", "loot", "npc", "party", "vehicle"];
declare const SAVE_TYPES: readonly ["fortitude", "reflex", "will"];
declare const IMMUNITY_TYPES: Set<ImmunityType>;
declare const WEAKNESS_TYPES: Set<WeaknessType>;
declare const RESISTANCE_TYPES: Set<ResistanceType>;
declare const UNAFFECTED_TYPES: Set<"bleed" | "spirit" | "vitality" | "void" | "chaotic" | "evil" | "good" | "lawful">;
/** All skill slugs that are part of the core system. Used for validation. */
declare const CORE_SKILL_SLUGS: Set<"athletics" | "deception" | "stealth" | "nature" | "acrobatics" | "arcana" | "crafting" | "diplomacy" | "intimidation" | "medicine" | "occultism" | "performance" | "religion" | "society" | "survival" | "thievery">;
declare const MOVEMENT_TYPES: readonly ["land", "burrow", "climb", "fly", "swim"];
/** Actor types that are valid for token size linking */
declare const SIZE_LINKABLE_ACTOR_TYPES: Set<string>;
export { ACTOR_TYPES, ATTRIBUTE_ABBREVIATIONS, CORE_SKILL_SLUGS, CREATURE_ACTOR_TYPES, IMMUNITY_TYPES, MOVEMENT_TYPES, RESISTANCE_TYPES, SAVE_TYPES, SIZE_LINKABLE_ACTOR_TYPES, UNAFFECTED_TYPES, WEAKNESS_TYPES, };
