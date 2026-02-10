import { DiceTermResult } from "../_types.mjs";
import DiceTerm, { DiceTermData } from "./dice.mjs";

/**
 * Define a three-sided Fate/Fudge dice term that can be used as part of a Roll formula
 * Mathematically behaves like 1d3-2
 */
export default class FateDie extends DiceTerm<FateData> {
    constructor(termData: DiceTermData);

    static override DENOMINATION: "f";

    override roll(options?: { minimize?: boolean; maximize?: boolean }): Promise<DiceTermResult>;

    override getResultLabel<T extends DiceTermResult>(
        result: DiceTermResult,
    ): T["result"] extends -1 ? "-" : T extends 0 ? "&nbsp;" : T extends 1 ? "+" : never;
}

export interface FateData extends DiceTermData {
    faces: 3;
}
