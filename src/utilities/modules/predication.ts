import * as R from "remeda";

export class StatementValidator {
    static isStatement(statement: unknown): statement is PredicateStatement {
        return R.isPlainObject(statement)
            ? this.isCompound(statement) || this.isBinaryOp(statement)
            : typeof statement === "string"
              ? this.isAtomic(statement)
              : false;
    }

    static isAtomic(statement: unknown): statement is Atom {
        return (typeof statement === "string" && statement.length > 0) || this.isBinaryOp(statement);
    }

    static #binaryOperators = new Set(["eq", "gt", "gte", "lt", "lte"]);

    static isBinaryOp(statement: unknown): statement is BinaryOperation {
        if (!R.isPlainObject(statement)) return false;
        const entries = Object.entries(statement);
        if (entries.length > 1) return false;
        const [operator, operands]: [string, unknown] = entries[0];
        return (
            this.#binaryOperators.has(operator) &&
            Array.isArray(operands) &&
            operands.length === 2 &&
            typeof operands[0] === "string" &&
            ["string", "number"].includes(typeof operands[1])
        );
    }

    static isCompound(statement: unknown): statement is CompoundStatement {
        return (
            R.isPlainObject(statement) &&
            (this.#isAnd(statement) ||
                this.#isOr(statement) ||
                this.#isNand(statement) ||
                this.#isXor(statement) ||
                this.#isNor(statement) ||
                this.#isNot(statement) ||
                this.#isIf(statement) ||
                this.#isIff(statement))
        );
    }

    static #isAnd(statement: { and?: unknown }): statement is Conjunction {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.and) &&
            statement.and.every((subProp) => this.isStatement(subProp))
        );
    }

    static #isNand(statement: { nand?: unknown }): statement is AlternativeDenial {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.nand) &&
            statement.nand.every((subProp) => this.isStatement(subProp))
        );
    }

    static #isOr(statement: { or?: unknown }): statement is Disjunction {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.or) &&
            statement.or.every((subProp) => this.isStatement(subProp))
        );
    }

    static #isXor(statement: { xor?: unknown }): statement is ExclusiveDisjunction {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.xor) &&
            statement.xor.every((subProp) => this.isStatement(subProp))
        );
    }

    static #isNor(statement: { nor?: unknown }): statement is JointDenial {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.nor) &&
            statement.nor.every((subProp) => this.isStatement(subProp))
        );
    }

    static #isNot(statement: { not?: unknown }): statement is Negation {
        return Object.keys(statement).length === 1 && !!statement.not && this.isStatement(statement.not);
    }

    static #isIf(statement: { if?: unknown; then?: unknown }): statement is Conditional {
        return (
            Object.keys(statement).length === 2 && this.isStatement(statement.if) && this.isStatement(statement.then)
        );
    }

    static #isIff(statement: { iff?: unknown }): statement is Biconditional {
        return (
            Object.keys(statement).length === 1 &&
            Array.isArray(statement.iff) &&
            statement.iff.every((s) => this.isStatement(s))
        );
    }
}

export type EqualTo = { eq: [string, string | number] };
export type GreaterThan = { gt: [string, string | number] };
export type GreaterThanEqualTo = { gte: [string, string | number] };
export type LessThan = { lt: [string, string | number] };
export type LessThanEqualTo = { lte: [string, string | number] };
export type BinaryOperation = EqualTo | GreaterThan | GreaterThanEqualTo | LessThan | LessThanEqualTo;
export type Atom = string | BinaryOperation;

export type Conjunction = { and: PredicateStatement[] };
export type Disjunction = { or: PredicateStatement[] };
export type ExclusiveDisjunction = { xor: PredicateStatement[] };
export type Negation = { not: PredicateStatement };
export type AlternativeDenial = { nand: PredicateStatement[] };
export type JointDenial = { nor: PredicateStatement[] };
export type Conditional = { if: PredicateStatement; then: PredicateStatement };
export type Biconditional = { iff: PredicateStatement[] };
export type CompoundStatement =
    | Conjunction
    | Disjunction
    | ExclusiveDisjunction
    | AlternativeDenial
    | JointDenial
    | Negation
    | Conditional
    | Biconditional;

export type PredicateStatement = Atom | CompoundStatement;

export type RawPredicate = PredicateStatement[];
