import { ActorPF2e, ActorUpdateOperation } from "../base.ts";
import { CREATURE_ACTOR_TYPES } from "../values.ts";
import { AbilityItemPF2e, MeleePF2e, WeaponPF2e } from "../../item/index.ts";
import { LabeledValueAndMax } from "../../data.ts";
import { TokenDocumentPF2e } from "../../scene/index.ts";
import { LANGUAGES_BY_RARITY, SENSE_TYPES } from "./values.ts";

/** A `CreaturePF2e` subtype string */
type CreatureActorType = (typeof CREATURE_ACTOR_TYPES)[number];
type CreatureTrait = keyof typeof CONFIG.PF2E.creatureTraits;
/** One of the major creature types given in the Pathfinder bestiaries */
type CreatureType = keyof typeof CONFIG.PF2E.creatureTypes;
type Language = "common" | (typeof LANGUAGES_BY_RARITY.common)[number] | (typeof LANGUAGES_BY_RARITY.uncommon)[number] | (typeof LANGUAGES_BY_RARITY.rare)[number] | (typeof LANGUAGES_BY_RARITY.secret)[number];
type Attitude = keyof typeof CONFIG.PF2E.attitude;
type ModeOfBeing = "living" | "undead" | "construct" | "object";
type SenseAcuity = "precise" | "imprecise" | "vague";
type SenseType = SetElement<typeof SENSE_TYPES>;
type SpecialVisionType = Extract<SenseType, "low-light-vision" | "darkvision" | "greater-darkvision" | "see-invisibility">;
interface GetReachParameters {
    action?: "interact" | "attack";
    weapon?: Maybe<AbilityItemPF2e<ActorPF2e> | WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>>;
}
interface CreatureUpdateOperation<TParent extends TokenDocumentPF2e | null> extends ActorUpdateOperation<TParent> {
    allowHPOverage?: boolean;
}
interface ResourceData extends LabeledValueAndMax {
    slug: string;
}
export type { Attitude, CreatureActorType, CreatureTrait, CreatureType, CreatureUpdateOperation, GetReachParameters, Language, ModeOfBeing, ResourceData, SenseAcuity, SenseType, SpecialVisionType, };
