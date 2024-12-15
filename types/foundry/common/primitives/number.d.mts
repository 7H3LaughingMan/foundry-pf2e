export {};

declare global {
    interface Number {
        /**
         * Test for near-equivalence of two numbers within some permitted epsilon
         * @param n Some other number
         * @param e Some permitted epsilon, by default 1e-8
         * @returns Are the numbers almost equal?
         */
        almostEqual(n: number, e?: number): boolean;

        /**
         * Transform a number to an ordinal string representation. i.e.
         * 1 => 1st
         * 2 => 2nd
         * 3 => 3rd
         */
        ordinalString(): string;

        /**
         * Return a string front-padded by zeroes to reach a certain number of numeral characters
         * @param digits The number of characters desired
         * @returns The zero-padded number
         */
        paddedString(digits: number): string;

        /**
         * Return a string prefaced by the sign of the number (+) or (-)
         * @returns The signed number as a string
         */
        signedString(): string;

        /**
         * Round a number to the closest number which substracted from the base is a multiple of the provided interval.
         * This is a convenience function intended to humanize issues of floating point precision.
         * The interval is treated as a standard string representation to determine the amount of decimal truncation applied.
         * @param interval The step interval
         * @param method The rounding method
         * @param base The step base
         * @returns The rounded number
         */
        toNearest(interval?: number, method?: "round" | "floor" | "ceil", base?: number): number;

        /**
         * A faster numeric between check which avoids type coercion to the Number object.
         * Since this avoids coercion, if non-numbers are passed in unpredictable results will occur. Use with caution.
         * @param a The lower-bound
         * @param b The upper-bound
         * @param inclusive Include the bounding values as a true result?
         * @return Is the number between the two bounds?
         */
        between(a: number, b: number, inclusive?: boolean): boolean;
    }

    interface NumberConstructor {
        /**
         * A faster numeric between check which avoids type coercion to the Number object.
         * Since this avoids coercion, if non-numbers are passed in unpredictable results will occur. Use with caution.
         * @param num A value to test
         * @param a The lower-bound
         * @param b The upper-bound
         * @param inclusive Include the bounding values as a true result?
         * @return Is the number between the two bounds?
         */
        between(num: number, a: number, b: number, inclusive?: boolean): boolean;

        /**
         * Test whether a value is numeric.
         * This is the highest performing algorithm currently available, per https://jsperf.com/isnan-vs-typeof/5
         * @param n A value to test
         * @return Is it a number?
         */
        isNumeric(n: unknown): boolean;

        /**
         * Attempt to create a number from a user-provided string.
         * @param n The value to convert; typically a string, but may already be a number.
         * @return The number that the string represents, or NaN if no number could be determined.
         */
        fromString(n: string | number): number;
    }
}
