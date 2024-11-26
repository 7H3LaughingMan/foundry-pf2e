import { ActorPF2e, CreaturePF2e } from "../index.ts";
import { ModifierPF2e } from "../modifiers.ts";
import { AbilityItemPF2e, MeleePF2e, WeaponPF2e } from "../../item/index.ts";
/** A static class of helper functions for applying automation for certain weapon traits on attack rolls */
declare class AttackTraitHelpers {
    protected static getLabel(traitOrTag: string): string;
    protected static getUnannotatedTrait(trait: string): string;
    static createAttackModifiers({ item, domains }: CreateAttackModifiersParams): ModifierPF2e[];
}
interface CreateAttackModifiersParams {
    item: AbilityItemPF2e<ActorPF2e> | WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>;
    domains: string[];
}
/** Set immunities for creatures with traits call for them */
declare function setImmunitiesFromTraits(actor: CreaturePF2e): void;
declare function imposeEncumberedCondition(actor: CreaturePF2e): void;
export { AttackTraitHelpers, imposeEncumberedCondition, setImmunitiesFromTraits };
