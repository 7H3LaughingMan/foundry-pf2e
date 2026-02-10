import RollResolver from "#client/applications/dice/roll-resolver.mjs";
import { RollOptions, RollParseNode } from "../_types.mjs";
import Roll from "../roll.mjs";
import { RollTermData } from "./_types.mjs";

/**
 * An abstract class which represents a single token that can be used as part of a Roll formula.
 * Every portion of a Roll formula is parsed into a subclass of RollTerm in order for the Roll to be fully evaluated.
 */
export default abstract class RollTerm<TTermData extends RollTermData = RollTermData> {
    constructor(termData?: TTermData);

    /** An object of additional options which describes and modifies the term. */
    options: RollOptions;

    /** An internal flag for whether the term has been evaluated */
    _evaluated: boolean;

    /** A reference to the Roll at the root of the evaluation tree. */
    _root: Roll;

    /** Is this term intermediate, and should be evaluated first as part of the simplification process? */
    isIntermediate?: boolean;

    /** A regular expression pattern which identifies optional term-level flavor text */
    static FLAVOR_REGEXP_STRING?: string;

    /** A regular expression which identifies term-level flavor text */
    static FLAVOR_REGEXP: RegExp;

    /** A regular expression used to match a term of this type */
    static REGEXP: RegExp;

    /** An array of additional attributes which should be retained when the term is serialized */
    static SERIALIZE_ATTRIBUTES: string[];

    /* -------------------------------------------- */
    /*  RollTerm Attributes                         */
    /* -------------------------------------------- */

    /** A string representation of the formula expression for this RollTerm, prior to evaluation. */
    abstract get expression(): string;

    /** A string representation of the formula, including optional flavor text. */
    get formula(): string;

    /** A string or numeric representation of the final output for this term, after evaluation. */
    get total(): number | string | undefined;

    /** Optional flavor text which modifies and describes this term. */
    get flavor(): string;

    /** Whether this term is entirely deterministic or contains some randomness. */
    get isDeterministic(): boolean;

    /** A reference to the RollResolver app being used to externally resolve this term. */
    get resolver(): RollResolver;

    /* -------------------------------------------- */
    /*  RollTerm Methods                            */
    /* -------------------------------------------- */

    /**
     * Evaluate the term, processing its inputs and finalizing its total.
     * @param options Options which modify how the RollTerm is evaluated
     * @param options.minimize Minimize the result, obtaining the smallest possible value.
     * @param options.maximize Maximize the result, obtaining the largest possible value.
     * @param options.allowStrings If true, string terms will not throw an error when evaluated.
     * @returns Returns a Promise if the term is non-deterministic.
     */
    evaluate(options?: { minimize?: boolean; maximize?: boolean; allowStrings?: boolean }): Promise<Evaluated<this>>;

    /**
     * Evaluate the term.
     * @param options Options which modify how the RollTerm is evaluated
     * @param options.minimize Minimize the result, obtaining the smallest possible value.
     * @param options.maximize Maximize the result, obtaining the largest possible value.
     * @param options.allowStrings If true, string terms will not throw an error when evaluated.
     * @returns Returns a Promise if the term is non-deterministic.
     */
    protected _evaluate(options?: { minimize?: boolean; maximize?: boolean; allowStrings?: boolean }): Promise<Evaluated<this>> | Evaluated<this>;

    /**
     * Determine if evaluating a given RollTerm with certain evaluation options can be done so deterministically.
     * @param term The term.
     * @param options Options for evaluating the term.
     * @param options.maximize Force the result to be maximized.
     * @param options.minimize Force the result to be minimized.
     */
    static isDeterministic(term: RollTerm, { maximize, minimize }?: { maximize?: boolean; minimize?: boolean }): boolean;

    /* -------------------------------------------- */
    /*  Serialization and Loading                   */
    /* -------------------------------------------- */

    /**
     * Construct a RollTerm from a provided data object
     * @param data Provided data from an un-serialized term
     * @return The constructed RollTerm
     */
    static fromData<TTerm extends RollTerm>(this: AbstractConstructorOf<TTerm>, data: TermDataOf<TTerm>): TTerm;

    /**
     * Construct a RollTerm from parser information.
     * @param node The node.
     */
    static fromParseNode(node: RollParseNode): RollTerm;

    /**
     * Define term-specific logic for how a de-serialized data object is restored as a functional RollTerm
     * @param data The de-serialized term data
     * @returns The re-constructed RollTerm object
     */
    protected static _fromData<D extends RollTermData, T extends RollTerm<D>>(this: ConstructorOf<T>, data: D): T;

    /**
     * Reconstruct a RollTerm instance from a provided JSON string
     * @param json A serialized JSON representation of a DiceTerm
     * @return A reconstructed RollTerm from the provided JSON
     */
    static fromJSON<D extends RollTermData, T extends RollTerm<D>>(this: ConstructorOf<T>, json: string): T;

    /**
     * Serialize the RollTerm to a JSON string which allows it to be saved in the database or embedded in text.
     * This method should return an object suitable for passing to the JSON.stringify function.
     */
    toJSON(): TTermData;
}

export type Evaluated<T extends RollTerm> = T & {
    _evaluated: true;
    total: NonNullable<T["total"]>;
};

export type TermDataOf<TTerm extends RollTerm> = TTerm extends RollTerm<infer TData> ? TData : never;
