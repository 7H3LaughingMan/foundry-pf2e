import { ActorPF2e } from "./../../actor/index.ts";
import { ConsumablePF2e } from "./../consumable/document.ts";
import { WeaponPF2e } from "./document.ts";
/** Upgrade a trait with a dice annotation, if possible, or otherwise return the original trait. */
declare function upgradeWeaponTrait<TTrait extends string>(trait: TTrait): TTrait;
/** Apply a two-hand trait to a weapon's damage dice. */
declare function processTwoHandTrait(weapon: WeaponPF2e): void;
/** Returns all ammo currently loaded in this weapon */
declare function getLoadedAmmo<T extends WeaponPF2e<A>, A extends ActorPF2e | null>(
    weapon: T,
): (WeaponPF2e<A> | ConsumablePF2e<A>)[];
export { getLoadedAmmo, processTwoHandTrait, upgradeWeaponTrait };
