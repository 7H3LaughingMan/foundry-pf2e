import { Evaluated } from "#client/dice/terms/term.mjs";
import { DamageInstance } from "./roll.ts";
import terms = foundry.dice.terms;
declare class ArithmeticExpression extends terms.RollTerm<ArithmeticExpressionData> {
    operator: ArithmeticOperator;
    operands: [terms.RollTerm, terms.RollTerm];
    constructor(termData: ArithmeticExpressionData);
    static SERIALIZE_ATTRIBUTES: string[];
    static fromData<TTerm extends terms.RollTerm>(this: ConstructorOf<TTerm>, data: terms.TermDataOf<TTerm>): TTerm;
    static totalOf(operator: ArithmeticOperator, left: number, right: number): number;
    static totalOf(operator: ArithmeticOperator, left: number | undefined, right: number | undefined): number | undefined;
    get dice(): terms.DiceTerm[];
    /**
     * Simplify the expression if this term is deterministic and not multiplication.
     * Multiplication is almost always going to be critical-hit doubling, which must be preserved for IWR analysis.
     */
    get expression(): string;
    /** Preserve flavor of inner terms */
    get formula(): string;
    get total(): number | undefined;
    get critImmuneTotal(): this["total"];
    get isDeterministic(): boolean;
    get minimumValue(): number;
    get expectedValue(): number;
    get maximumValue(): number;
    /** Construct a string for an HTML rendering of this term */
    render(): DocumentFragment;
    protected _evaluate(options?: { minimize?: boolean; maximize?: boolean }): Promise<Evaluated<this>>;
    toJSON(): ArithmeticExpressionData;
}
interface ArithmeticExpression extends terms.RollTerm<ArithmeticExpressionData> {
    constructor: typeof ArithmeticExpression;
}
interface ArithmeticExpressionData extends terms.RollTermData {
    class?: "ArithmeticExpression";
    operator: ArithmeticOperator;
    operands: [terms.RollTermData, terms.RollTermData];
}
type ArithmeticOperator = "+" | "-" | "*" | "/" | "%";
/** A parenthetically-exclosed expression as a single arithmetic term or number */
declare class Grouping extends terms.RollTerm<GroupingData> {
    #private;
    term: terms.RollTerm;
    constructor(termData: GroupingData);
    static SERIALIZE_ATTRIBUTES: string[];
    static fromData<TTerm extends terms.RollTerm>(this: ConstructorOf<TTerm>, data: terms.TermDataOf<TTerm>): TTerm;
    get dice(): terms.DiceTerm[];
    /** Show a simplified expression if it is known that order of operations won't be lost */
    get expression(): string;
    /** Preserve flavor of inner terms */
    get formula(): string;
    get total(): number | undefined;
    get critImmuneTotal(): number | undefined;
    get isDeterministic(): boolean;
    get minimumValue(): number;
    get expectedValue(): number;
    get maximumValue(): number;
    protected _evaluate(options?: { minimize?: boolean; maximize?: boolean }): Promise<Evaluated<this>>;
    toJSON(): GroupingData;
    /** Construct a string for an HTML rendering of this term */
    render(): DocumentFragment;
}
interface GroupingData extends terms.RollTermData {
    class?: "Grouping";
    term: terms.RollTermData;
}
/**
 * A `Die` surrogate where the `number` or `faces` were not resolvable to numbers at parse time: serializes itself as a
 * `Die` as soon it is able (guaranteed after evaluation)
 */
declare class IntermediateDie extends terms.RollTerm<IntermediateDieData> {
    number: number | terms.FunctionTerm | Grouping;
    faces: number | terms.FunctionTerm | Grouping;
    die: terms.Die | null;
    constructor(data: IntermediateDieData);
    static SERIALIZE_ATTRIBUTES: string[];
    get expression(): string;
    get total(): number | undefined;
    get dice(): terms.Die[];
    get isDeterministic(): boolean;
    get minimumValue(): number;
    /** Not able to get an expected value from a Math term */
    get expectedValue(): number;
    get maximumValue(): number;
    protected _evaluate(): Promise<Evaluated<this>>;
    toJSON(): DieData | IntermediateDieData;
}
interface IntermediateDieData extends terms.RollTermData {
    class?: string;
    number: number | terms.NumericTermData | terms.FunctionTermData | GroupingData;
    faces: number | terms.NumericTermData | terms.FunctionTermData | GroupingData;
    die?: DieData | null;
}
declare class InstancePool extends terms.PoolTerm {
    /** Work around upstream bug in which method attempts to construct `Roll`s from display formulas */
    static fromRolls<TTerm extends terms.PoolTerm>(this: ConstructorOf<TTerm>, rolls?: Roll[]): TTerm;
}
interface InstancePool extends terms.PoolTerm {
    rolls: DamageInstance[];
}
export { ArithmeticExpression, Grouping, InstancePool, IntermediateDie };
export type { GroupingData };
