import { Rolled } from "#client/dice/_module.mjs";
import { CheckRoll, DamageInstance, DamageRoll } from "#foundry-pf2e";
import * as R from "remeda";

const CACHE: {
    checkRoll?: typeof CheckRoll;
    damageInstance?: typeof DamageInstance;
    damageRoll?: typeof DamageRoll;
} = {};

export function getCheckRollClass(): typeof CheckRoll {
    return (CACHE.checkRoll ??= CONFIG.Dice.rolls.find((roll) => roll.name === "CheckRoll") as typeof CheckRoll);
}

export function getDamangeInstanceClass(): typeof CheckRoll {
    return (CACHE.checkRoll ??= CONFIG.Dice.rolls.find((roll) => roll.name === "DamageInstance") as typeof CheckRoll);
}

export function getDamageRollClass(): typeof CheckRoll {
    return (CACHE.checkRoll ??= CONFIG.Dice.rolls.find((roll) => roll.name === "DamageRoll") as typeof CheckRoll);
}

export function isRolledRoll(roll: Maybe<Roll>): roll is Rolled<Roll> {
    return R.isNonNullish(roll) && roll._evaluated === true;
}

export function isCheckRoll(roll: Maybe<Roll>): roll is CheckRoll {
    return R.isNonNullish(roll) && roll.constructor.name === "CheckRoll";
}

export function isRolledCheckRoll(roll: Maybe<Roll>): roll is Rolled<CheckRoll> {
    return isCheckRoll(roll) && isRolledRoll(roll);
}

export function isDamageInstance(roll: Maybe<Roll>): roll is DamageInstance {
    return R.isNonNullish(roll) && roll.constructor.name === "DamageInstance";
}

export function isRolledDamageInstance(roll: Maybe<Roll>): roll is Rolled<DamageInstance> {
    return isDamageInstance(roll) && isRolledRoll(roll);
}

export function isDamageRoll(roll: Maybe<Roll>): roll is DamageRoll {
    return R.isNonNullish(roll) && roll.constructor.name === "DamageRoll";
}

export function isRolledDamageRoll(roll: Maybe<Roll>): roll is Rolled<DamageRoll> {
    return isDamageRoll(roll) && isRolledRoll(roll);
}
