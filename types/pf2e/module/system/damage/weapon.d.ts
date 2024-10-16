import { ActorPF2e } from "types/pf2e/module/actor/index.ts";
import { DamageDicePF2e, ModifierPF2e } from "types/pf2e/module/actor/modifiers.ts";
import type { MeleePF2e, WeaponPF2e } from "types/pf2e/module/item/index.ts";
import type { NPCAttackDamage } from "types/pf2e/module/item/melee/data.ts";
import type { WeaponDamage } from "types/pf2e/module/item/weapon/data.ts";
import { PotencySynthetic } from "types/pf2e/module/rules/synthetics.ts";
import { DamageCategoryUnique, DamageDamageContext, WeaponDamageTemplate } from "./types.ts";
declare class WeaponDamagePF2e {
    #private;
    static fromNPCAttack({ attack, actor, context, }: NPCStrikeCalculateParams): Promise<WeaponDamageTemplate | null>;
    /** Calculates the damage a weapon will deal when striking. Performs side effects, so make sure to pass a clone */
    static calculate({ weapon, actor, damageDice, modifiers, weaponPotency, context, }: WeaponDamageCalculateParams): Promise<WeaponDamageTemplate | null>;
    /** Parse damage formulas from melee items and construct `WeaponDamage` objects out of them */
    static npcDamageToWeaponDamage(instance: NPCAttackDamage): ConvertedNPCDamage;
}
interface ConvertedNPCDamage extends WeaponDamage {
    category: DamageCategoryUnique | null;
}
interface WeaponDamageCalculateParams {
    weapon: WeaponPF2e<ActorPF2e> | MeleePF2e<ActorPF2e>;
    actor: ActorPF2e;
    weaponPotency?: PotencySynthetic | null;
    damageDice?: DamageDicePF2e[];
    modifiers?: ModifierPF2e[];
    context: DamageDamageContext;
}
interface NPCStrikeCalculateParams {
    attack: MeleePF2e<ActorPF2e>;
    actor: ActorPF2e;
    context: DamageDamageContext;
}
export { WeaponDamagePF2e, type ConvertedNPCDamage };
