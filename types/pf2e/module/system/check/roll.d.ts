import { ZeroToThree } from "./../../data.ts";
import { UserPF2e } from "./../../user/index.ts";
import { DegreeOfSuccessIndex } from "./../degree-of-success.ts";
import { DiceRollOptionsPF2e } from "./../rolls.ts";
import { CheckType } from "./types.ts";
import dice = foundry.dice;
/** A foundry `Roll` subclass representing a Pathfinder 2e check */
declare class CheckRoll extends Roll {
    static CHAT_TEMPLATE: string;
    constructor(formula: string, data?: Record<string, unknown>, options?: CheckRollDataPF2e);
    get roller(): UserPF2e | null;
    get type(): CheckType;
    get degreeOfSuccess(): DegreeOfSuccessIndex | null;
    get isReroll(): boolean;
    get isRerollable(): boolean;
    render(this: dice.Rolled<CheckRoll>, options?: dice.RollRenderOptions): Promise<string>;
    getTooltip(): Promise<string>;
}
interface CheckRoll extends Roll {
    options: CheckRollDataPF2e & {
        showBreakdown: boolean;
    };
}
/** A legacy class kept to allow chat messages to reconstruct rolls */
declare class StrikeAttackRoll extends CheckRoll {}
interface CheckRollDataPF2e extends DiceRollOptionsPF2e {
    type?: CheckType;
    /** A string of some kind to help system API identify the roll */
    identifier?: Maybe<string>;
    /** The slug of an action associated with this roll */
    action?: Maybe<string>;
    isReroll?: boolean;
    degreeOfSuccess?: ZeroToThree;
    /** Whether the check is part of a damaging action */
    damaging?: boolean;
    domains?: string[];
    /** The d20 roll expression including fortune/misfortune effects */
    dice?: string;
    /** The total modifier for the roll, after applying stacking rules. */
    totalModifier?: number;
}
export { CheckRoll, StrikeAttackRoll, type CheckRollDataPF2e };
